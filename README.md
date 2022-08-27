# Welcome to Google OAuth2 Demo!

This project is a simple demo of google oauth2 using passport js. User logs in with Gmail, can logout and also go to the protected route which shows user information

## Steps to install locally

Before installing npm modules and run the project, create '.env' file to the project with following entries: 

	-MONGO_DB_URI="add value"
	-GOOGLE_OAUTH_CLIENT_ID="add value"
	-GOOGLE_OAUTH_CLIENT_SECRET="add value"
	-GOOGLE_OAUTH_CALLBACK_URL="add value"
 	-SESSION_SECRET="add value"
	-PORT="add value" (optional, default is 5000)


Now, add following commands to the project:
>npm install &&
>npm install nodemon -D &&
>npm start

App runs on the port 5000 or else provide port value in .env file
