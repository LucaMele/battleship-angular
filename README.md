# battleship-angular
Group 9 CAS_FEE final project with angular.js


## Get Started

First install all npm dependencies:

download and install mongoDb on your system  https://www.mongodb.org/downloads and instructions are at https://docs.mongodb.org/manual/

`npm install`  

`npm install -g gulp`

`npm install -g bower`

`bower install`

and then start the application with:

`gulp`

So now you can start the server by executing the `index.js` as npm server (in webstorm just press play).

Now you sould see the app under http://localhost:3000

Keep aware that python (https://www.python.org) is required on your system before running npm install!


## First access, temp admin

If there are no user yet in the db, first user is allowed to access with the user `admin` and password `admin`. 

As soon as a new created users exists, admin:admin will never be allowed again in the system. So please be
careful when creating the first user. Give him admin rights, otherwise the administration section is not accessible!

Database configuartion is found under server/config.js

default database setting is: 

```javascript
db: {
    name: 'gZ3-m__battleship',    
    host: 'localhost',    
    port: 27017
}
```

##Live demo
For a live demo, please go on: http://battleship-angular.azurewebsites.net/ 


##Unit tests

In order to execute unit tests, please make sure you can run karma on your machine (http://karma-runner.github.io/0.13/index.html)

Run unit tests:

`gulp test`