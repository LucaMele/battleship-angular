# battleship-angular
Group 9 CAS_FEE final project with angular.js


## Get Started

First install all npm dependencies:

If you want to use your own local db, download and install mongoDb on your system  https://www.mongodb.org/downloads and instructions are at https://docs.mongodb.org/manual/

Then setup all the dependencies:

`npm install -g gulp        // install gulp globally. It is not mandatory because it is also declared as a npm dependency`

`npm install -g bower       // install bower globally. It is not mandatory because it is also declared as a npm dependency`

`npm install                // for all npm dependencies`

`npm install` will also execute `bower install`, in order to load all the GUI frameworks. The application will then be ready with the default task of `gulp`.
   
You can also trigger the task runner in the following ways:

`gulp               // default task builds the app ready to run`
`gulp dev           // builds the app ready and add watchers for .ts, .scss and .html files`
`gulp test          // builds the app and execute the Unit Test`

So now you can start the server by executing the `index.js` as npm server (in WebStorm, just press play, otherwise just press `node index.js` in your command line).

Now you should see the app under http://localhost:1337. You can specify the port by using the following command: `PORT=3000 node index.js`

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