from flask import Flask, send_file, jsonify, redirect, render_template, session, url_for, request

from pymongo import MongoClient
from bson import json_util, ObjectId
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from dotenv import find_dotenv, load_dotenv
from authlib.integrations.flask_client import OAuth


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

# Current user (fetched from the db)
current_user = None

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
    print(request.args)
    return render_template('itemEditPage.html', item_id=item_id)


# Account api
@app.route('/updateProfile', methods=['POST'])
def updateProfile():
    current_user =get_user_by_email(session.get('user')["userinfo"]["email"])
    collection = mongo_db.get_collection("profiles")
    data = request.json
    username = data.get('username') or ""
    phone_number = data.get('phone_number') or ""
    collection.update_one({"email": current_user["email"]}, {"$set": {"username": username, "phone_number": phone_number}})
    return "Profile updated successfully"

@app.route('/getItems', methods=['GET'])
def getItems():
    current_user =get_user_by_email(session.get('user')["userinfo"]["email"])
    collection = mongo_db.get_collection("items")
    lst = collection.find({"ownerEmail": current_user["email"]},)
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
    update_data = {key: value for key, value in data.items() if key != '_id'}
    result = collection.update_one({'_id': obj_id}, {'$set': update_data})
    if result.modified_count > 0:
        return "Item is updated"
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



#@app.route('/get_data')
#def get_data():
#    collection = db.get_collection("profiles")
#    data = collection.find()
#    data_list = list(data)
#    print(data_list)
#    return json.loads(json_util.dumps(data_list))


if __name__ == '__main__':
    app.run(debug=True)
