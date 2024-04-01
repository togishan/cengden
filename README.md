# Cengden Web Application

## Render deployment URL: https://cengden-wyp6.onrender.com

## There are 2 authorized users in the system. Login credentials

- User1 email: e2448876.ceng@metu.edu.tr, password: ceng495.
- User2 email: oguzhan.taskin@metu.edu.tr, password: ceng495. (it is added from the auth0 dashboard)

## The choice of frameworks:

- Flask Framework is used in the backend of the project.
- HTML/CSS/JS are used in the frontend of the project.
- MongoDB Atlas is used as a database service.
- Auth0 is used to handle the authentication of the users.
- SendGrid is used as a Email as a Service. (My account which is created with my ceng mail credentials is not accepted by the SendGrid, so instead I used oguzhan.taskin@metu.edu.tr to create a SendGrid account. On the other hand, mails are sent behalf of e2448876@ceng.metu.edu.tr which I've set as a single sender identity.

## The database design:

The database consists of two collections: The items and the profiles. The items contains item related information and also the profile_ids who added the item to their favourites. The profiles contains user related information like user contact email/phone and also the list of favourite items that user added to their favourites.

## Program capability:

The application contains:

- Homepage that the users can view items.
- Item filtration based on categories and the price.
- Signup, login and email verification (users who signed up are logged out automatically as they try to login unless they verify their account via email)
- Authenticated users can update their username and the contact phone.
- Authenticated users can add,update and delete items.
- Authenticated users can hide/unhide their items.
- Authenticated users may hide/unhide their contact information in the item details from regular users.
- Authenticated users can add items to their favourites. When thier favourite items are updated, the notification email is sent to them.

## User Guide:

### Signup and login

Users can access login and signup interface on topmost right of the page. Only the users with ceng.metu.edu.tr emails can signed up to the website. After signup users must verify their email address by clicking on a link in the email that is sent to them. Otherwise, the system automatically logs out the user.

After login, users can access their account from the same place as they logged in by clicking their email address. Also they can logged out by clicking the logout link.

### Account Page:

In this page, users can update their account information (username and contact phone number). Also there are two panels: One of them for displaying items that belongs to the user and other for items that user added to his/her favourite items. Items that belonged to the user can be deleted and updated by the same user by clicking corresponding buttons. Users can also add items from this page.

### Item Addition Page:

This page conditionally renders input fields depending on the chosen category. Optional fields may added to the description input field. The price field accepts only integers. Actually it accepts all type of text but when sending mails I convert them to the int to compare whether the price has been dropped or not. Thus, in conversion other types of values gives an error. Just provide a number there, not the number with sign, not a decimal. Users can also select to hide and unhide to item with the checkbox. Hided items will not be displayed to any user. Moreover, they can prevent their contact information (email and phone number) to be displayed to the regular (unauthorized) users with the other checkbox.

### Item Edit Page:

More or less same with the item addition page. When items are updated, if the price is dropped the notification email will be sent to users who added that item to their favourites.

### Home Page:

All items which are not hidden or deleted are displayed here. There are two types of filters. Users can use one of them or two of them together at once. To use the category filter user may choose one of the toggles, to use the price filter user may choose minimium and maximum price interval with dropdowns. To apply selected filter, user have to click the apply button.
Users can also view the details of the item by clicking the details button. If the contact info is not hidden all users can see the owner of the item's email and the phone number. If the contact info is hidden only authorized users can view it. To add item to their favourites, users have to click on the add to favourites button.
