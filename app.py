from flask import Flask, send_file, jsonify, redirect, render_template, session, url_for, request

from pymongo import MongoClient
from bson import json_util, ObjectId
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from dotenv import find_dotenv, load_dotenv
from authlib.integrations.flask_client import OAuth
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To

# Mongo settings
mongo_uri = "mongodb+srv://oguzhantaskin:dhqJYdxkvA7KODUk@cluster0.mx50u9u.mongodb.net/?retryWrites=true&w=majority"
mongo_client = MongoClient(mongo_uri)
mongo_db = mongo_client.get_database("cengden")

# Auth0 settings
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)
app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")
oauth = OAuth(app)
oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)

current_user = None

# SendGrid settings
SENDGRID_API_KEY = "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"
send_grid = SendGridAPIClient(SENDGRID_API_KEY)



# Auth api
@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

@app.route("/callback", methods=["GET", "POST"])
def callback():
    global current_user
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    if session.get('user')["userinfo"]["email_verified"]==False:
        return redirect("/logout")
    current_user = get_user_by_email(session.get('user')["userinfo"]["email"])
    if current_user == None:
        add_account_after_signUp()
    return redirect("/")

@app.route("/logout")
def logout():
    global current_user
    current_user = None
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )

# Navigation api
@app.route('/')
def home():

    return render_template("index.html", session=session.get('user'), pretty=json.dumps(session.get('user'),indent=4))

@app.route('/accountPage')
def accountPage():
    current_user =get_user_by_email(session.get('user')["userinfo"]["email"])
    return render_template('accountPage.html', current_user=current_user)

@app.route('/itemEditPage', methods=['POST','GET'])
def itemEditPage():
    item_id = request.args.get('id')
    return render_template('itemEditPage.html', item_id=item_id)
@app.route('/itemAddPage', methods=['POST','GET'])
def itemAddPage():
    return render_template('itemAddPage.html')

# Home Page api
@app.route('/getAllItems', methods = ["GET"])
def getAllItems():
    collection = mongo_db.get_collection("items")
    lst = collection.find({"hide": False},)
    json_lst = json_util.dumps(lst)
    items = json.loads(json_lst)

    for i in range(len(items)):
        if not session and items[i].get("viewable_contact") == False:
            items[i].pop("contact_email", None)
            items[i].pop("phone_number", None)
    return items

@app.route('/getItemDetails', methods=['POST'])
def getItemDetails():
    collection = mongo_db.get_collection("items")
    data = request.json
    objID = ObjectId(data.get('id'))
    lst = collection.find_one({'_id': objID})
    json_lst = json_util.dumps(lst)
    item = json.loads(json_lst)
    if not session and item.get("viewable_contact") == False:
        item.pop("contact_email", None)
        item.pop("phone_number", None)
    return item

@app.route('/addItemToFavorites', methods=['POST'])
def addItemToFavorites():
    collection = mongo_db.get_collection("profiles")
    current_user = get_user_by_email(session.get('user')["userinfo"]["email"])
    data = request.json
    objID = ObjectId(data.get('id'))
    user_id = current_user.get('_id',{})
    # Add to the profiles collection
    result = collection.update_one(
        {"_id": user_id},
        {"$addToSet": {"favourite_item_ids": objID}},
        upsert=True
    )
    collection = mongo_db.get_collection("items")
    # Add to the items collection
    collection.update_one(
        {"_id": objID},
        {"$addToSet": {"user_emails": current_user.get('email',{})}},
        upsert=True
    )
    return "Item added to your favourites successfully"


# Account api
@app.route('/updateProfile', methods=['POST'])
def updateProfile():
    current_user =get_user_by_email(session.get('user')["userinfo"]["email"])
    collection = mongo_db.get_collection("profiles")
    data = request.json
    username = data.get('username') or ""
    phone_number = data.get('phone_number') or ""
    collection.update_one({"email": current_user["email"]}, {"$set": {"username": username, "phone_number": phone_number}})
    collection = mongo_db.get_collection("items")
    collection.update_many({"contact_email": current_user["email"]}, {"$set" : {"phone_number":phone_number}})
    return "Profile updated successfully"

@app.route('/getItemsOfCurrentUser', methods=['GET'])
def getItemsOfCurrentUser():
    current_user = get_user_by_email(session.get('user')["userinfo"]["email"])
    collection = mongo_db.get_collection("items")
    lst = collection.find({"owner_id":  current_user.get('_id', {})},)
    json_lst = json_util.dumps(lst)
    return json_lst

@app.route('/deleteItem', methods=['POST'])
def deleteItem():
    data = request.json
    objID = ObjectId(data)
    collection = mongo_db.get_collection("items")
    result = collection.delete_one({"_id": objID})
    if result.deleted_count > 0:
        return "Item deleted successfully"
    else:
        return "Some error occured"

@app.route('/getFavouriteItemsOfCurrentUser', methods=['GET'])
def getFavouriteItemsOfCurrentUser():
    current_user = get_user_by_email(session.get('user')["userinfo"]["email"])
    collection = mongo_db.get_collection("profiles")    
    result = collection.find({"_id": current_user.get('_id', {})})
    if result:
        item_ids = result.get('favourite_item_ids', [])
        print("Item_ids:")
        print(item_ids)
        items_collection = mongo_db.get_collection("items")
        items = items_collection.find({"_id": {"$in": item_ids}, "hide": False}, {"_id": 0})
        print("Items:")
        print(items)
        json_lst = json_util.dumps(items)
        return json_lst
    else:
        return "No favourite items found for the current user"
    
@app.route('/getAllItemsWithFilter', methods=['POST'])
def getAllItemsWithFilter():
    filters = {}
    data = request.json
    collection = mongo_db.get_collection("items")    
    for key, value in data.items():
        if key == "category" and value != "All":
            filters[key] = value
        elif key == "price_min":
            filters["price"] = {**filters.get("price", {}), **{'$gt': int(value)}}
        elif key == "price_max":
            filters["price"] = {**filters.get("price", {}), **{'$lt': int(value)}}
    print(filters)
    items = collection.find(filters)
    json_lst = json_util.dumps(items)
    items = json.loads(json_lst)
    print(json_lst)
    result = []
    for item in items:
        result.append(item)
    return jsonify(result)

# Item Edit Api
@app.route('/getItem', methods=['POST'])
def getItem():
    collection = mongo_db.get_collection("items")
    data = request.json
    objID = ObjectId(data.get('id'))
    lst = collection.find_one({'_id': objID})
    json_lst = json_util.dumps(lst)
    return json_lst

@app.route('/updateItem', methods=['POST'])
def updateItem():
    collection = mongo_db.get_collection("items")
    data = request.json
    obj_id = ObjectId(data.get('_id', {}).get('$oid'))
    update_data = {key: value for key, value in data.items() if key != '_id' and key != 'owner_id'}
    update_data["price"] = int(update_data["price"])
    current_item = collection.find_one({'_id': obj_id})
    
    # Check if the price is dropped. If it is dropped, send an email to the related users.
    send_email = False
    current_price = int(current_item.get('price', 0))
    if current_price > update_data["price"]:
        send_email = True
        
    # Update the item
    result = collection.update_one({'_id': obj_id}, {'$set': update_data})

    if send_email:
        # Get users who added item to their favourites
        collection = mongo_db.get_collection("items")
        result = collection.find_one({"_id":  obj_id})  
        if result:
            user_emails = result.get('user_emails', [])
            json_lst = json_util.dumps(user_emails)
            user_emails = json.loads(json_lst)
            to_emails = []
            for i in user_emails:
                to_emails.append(To(i))
            print(to_emails)
        if to_emails:
            message = Mail(
                from_email='e2448876@ceng.metu.edu.tr',
                to_emails=to_emails,
                subject='The item in your favourites updated',
                html_content='<strong>One of the items in your favourites is changed. Check it now!</strong>')
        response = send_grid.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    return "Item is updated"

# Add Item Api
@app.route('/addItem', methods=['POST'])
def addItem():
    current_user = get_user_by_email(session.get('user')["userinfo"]["email"])
    collection = mongo_db.get_collection("items")
    data = request.json
    data["price"] = int(data["price"])
    data["owner_id"] = current_user.get('_id', {})
    data["contact_email"] = current_user.get('email')
    data["phone_number"] = current_user.get('phone_number')
    result = collection.insert_one(data)
    if result.inserted_id:
        return "Item is added successfully"
    else:
        return "Some error occured"
# Helper functions
def add_account_after_signUp():
    collection = mongo_db.get_collection("profiles")
    collection.insert_one({"email": session.get('user')["userinfo"]["email"], "role": "Authenticated"})

def get_user_by_email(email):
    collection = mongo_db.get_collection("profiles")
    profile = collection.find_one(filter={"email": email})
    return profile


if __name__ == '__main__':
    app.run(debug=True)
