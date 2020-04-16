# Restaurant-Manager

How to get this project working on your machine?

1) clone or download the project
2) Open terminal in root directory and give following commands
    - `cd backend`
    - `npm install`
    - `cd..`
    - `cd client`
    - `npm install`
3) create a .env file in backend directory with two varibles
    - `PORT = ANY_PORT_NUMBER`
    - `MONGO_URI = MONGODB_URI` 
    (I used MongoDB Atlas)
4) Again open terminal in root directory
    - `cd backend`
    - `nodemon server` (you need nodemon installed on your machine, if you don't, then run "npm install nodemon -g" without quotes)
5) Leave the terminal running and open another terminal window
    - `cd client`
    - `npm start`