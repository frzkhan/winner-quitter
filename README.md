# Requirements
* NodeJs >= v9
* mongoDB

# Check requirements command
Run the following to check everything is in place

* `npm -v` should return a version
* `node -v` should return a version
* `mongod` to run the mongodb server

# Installation instructions

* cd into the project directory using a terminal
* create a file `.env` with the following content:

    `MONGO_URL=mongodb://localhost:27017/freelancing-team`

* In the terminal run the following commands
 `npm i` and then `npm start`
* cd into the client directory
 `cd client` and run `npm i` and then `npm run dev`

* to view the project open `http://localhost:3001` in your browser