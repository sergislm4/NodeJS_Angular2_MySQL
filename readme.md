# DerButtonTask

A NodeJS_Angular2_MySQL testing purposes project

## Getting Started

This is an that has been built based on a few requirements:

LOGIN;
REGISTER;
PROFILE;
PROFILE SETTINGS;

### Prerequisites

MySQL ubuntu:

`sudo apt-get install -y mysql-server`

NodeJS ubuntu:

`sudo apt-get install nodejs`

NPM ubuntu:

`sudo apt-get install npm`

### Installing

To run this project:

`cd client/`
`npm install`

`ng serve`  ---  Start angular

`cd ../backend/` 
`npm install`

`npm start`  ---  Start nodeJS

## Authors

* **Sergi Chafer** 

## Future Improvements

* **Social Login**
* First step:
Design a small interface at the login page ofering different buttons for each social strategy used.
* Second step:
Once done, I'd would define a route at the backend with an assigned controller.
That controller would serve as an error control function, where we can perform operations based on the responses.
* Third step:
Those responses come from a passport strategy that would be defined on the passport file.
It's reason to exist is to validate data, perform the login process and send data to de database.
What about the credentials, you could ask, we have to create a file called credentials.json at the credentials folder where we can store the credentials used by every third party login strategy.

Credential File Example:
{
    "GITLAB_CLIENT_ID":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "GITLAB_CLIENT_SECRET":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "GITLAB_CALLBACK":"http://localhost:8081/api/social/gitlab/callback"
}

As you may see, this file has also a callback, that is used for the strategy to return to our server with the needed data.
* Fourth step:
We have to take care of a few things before getting into database writing:

////////////////////////Check if the user exists//////////////////////////

In this case, the server returns the data from the existing user in case data matches.

//////////////////////Register the new user as usual///////////////////////

This is a simpler escenario, data is checked and sended to the user model where we will reuse the register function and the new user will be created.

*Final step:

Now, whatever the result is, data or errors will be resend to the frontend.

////////////

Before this proccess can be set up as stable, our client side needs a service post that sends the data, we could recreate the one used by the login so that way once the user is logged, his JWT is stored in localstorage.

And finally, the error control function that will face errors coming from the server side.

////////////

Once reached this stage of the developing process, the new functionality should work smoothly.

Example done with mongo insteado of mySQL:

* [NodeJS_Backend](https://gitlab.com/sergislm4/plusone_nodejs_expressjs_angularjs1.5_es6/tree/master/backend) - The frontend framework used
