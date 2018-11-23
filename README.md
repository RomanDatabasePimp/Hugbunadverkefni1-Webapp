# Hugbunadverkefni 1 Web app

## About Web app
This is the front end of our app. The front end is written in React and 
it uses a Spring boot server which can be found here : https://github.com/RomanDatabasePimp/HugBunadVerkefni1 <br>

## Usage of the web app
Since the front end only talks to the back end no tools other than node.js is required.<br>
follow these steps below to deploy a local version of the web app. <br>
1. Install the latest version of node.js : https://nodejs.org/en/
2. Clone this project on to your machine
3. Default settings of web app
   - 3.1 Runs on Port : 3000
   - 3.2 Communicates to back end server on : http://localhost:9090/
4. If you would like to change the default settings then you have to create a .env file and declare the following
   - 4.1 PORT  : change the port of the web app
   - 4.2 APP_SERVICE_URL : changes the communication to the backend, MAKE SURE IT ENDS WITH / 
5. Open the Root of the project in comand promp or terminal and type "npm install"
   - 5.1 in the Root of the package.json is visable
6. After the install has been complete run the project with "npm start"
7. Enjoy
