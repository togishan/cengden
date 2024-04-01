# Cengden Web Application

## Render deployment URL: https://cengden-wyp6.onrender.com

## There are 2 authorized users in the system. Login credentials
- User1 email: e2448876.ceng@metu.edu.tr, password: ceng495.
- User2 email: oguzhan.taskin@metu.edu.tr, password: ceng495.  (it is added from the auth0 dashboard)

## The choice of frameworks:
- Flask Framework is used in the backend of the project.
- HTML/CSS/JS are used in the frontend of the project.
- MongoDB Atlas is used as a database service.
- Auth0 is used to handle the authentication of the users.
- SendGrid is used as a Email as a Service. (My account which is created with my ceng mail credentials is not accepted by the SendGrid, so instead I used oguzhan.taskin@metu.edu.tr to create a SendGrid account. On the other hand, mails are sent behalf of e2448876@ceng.metu.edu.tr which I've set as a single sender identity.

## The database design:
The database consists of two collections: The items and the profiles. The items contains item related information and also the profile_ids who added the item to their favourites. The profiles contains user related information like user contact email/phone and also the list of favourite items that user added to their favourites.

## User Guide:
The application contains:
- Homepage that the users can view items.
- Item filtration based on categories and the price.
- Signup, login and email verification (users who signed up are logged out automatically as they try to login unless they verify their account via email)
- Authenticated users can update their username and the contact phone.
- Authenticated users can add,update and delete items.
- Authenticated users can hide/unhide their items.
- Authenticated users may hide/unhide their contact information in the item details from regular users.
- Authenticated users can add items to their favourites. When thier favourite items are updated, the notification email is sent to them.
  
