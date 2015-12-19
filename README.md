# Battleship-Angular
Group 9 CAS_FEE final project with angular.js. Single Page Application with:

- TypeScript http://www.typescriptlang.org/
- AngularJS 1.4.* https://angularjs.org/
- gulp http://gulpjs.com/
- Zurb Foundation http://foundation.zurb.com/
- Karma http://karma-runner.github.io/0.13/index.html
- Jasmine http://jasmine.github.io/
- mongoDb https://www.mongodb.org/
- Node Server with Express http://expressjs.com/en/index.html


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


## First access, temp admin on local db

If you want to run your db locally and there are no user yet in the collections, a first user is allowed to access with the user `admin` and password `admin`. 

As soon as a new created users exists, admin:admin will never be allowed again to access in the system. So please be
careful when creating the first user. Give him admin rights, otherwise the administration section is not accessible!

Database configuration is found under server/config.js

default database setting is: 

```javascript
db: {
    name: 'name_of_db',             // name of the db. 
    host: 'localhost',              // your host
    user: 'test',                   // OPTIONAL username
    password: 'test',               // OPTIONAL password
    port: 54288                     // port to your db
}
```

##Live demo
For a live demo, please go on: http://battleship-angular.azurewebsites.net/ 


##Unit tests

In order to execute unit tests, please make sure you can run karma on your machine (http://karma-runner.github.io/0.13/index.html)

Run tests with the command:

`gulp test`