# hawk-eye-backend
This Project seems to find a solution to the problem of insecurity in the north by providing a quick response and alert system in cases of rape, health emergency and unrest/banditry.

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node, Npm , MongoDB
- #### Installing

  You can install nodejs and npm if you do not have it installed use apt to install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm
      $ npm install npm -g

  You can follow this guide to set up Mongo DB [Locally](https://docs.mongodb.com/guides/server/install/) or with in the cloud [using](https://account.mongodb.com/account/login)

###

 - ## Running Locally 

    $ git clone git@github.com:bemijonathan/hawk-eye-backend.git
    $ cd hawk-eye-backend
    $ npm install
    $ touch .env

  - ### Environment variables

    ```
        # .env

        JWT_TOKEN=template#$#
        JWT_TIME=200000h
        DB_URL= #set the db url base on your configuration

    ```
  Then Start the server

    $ npm run dev

 - ### Api Documentation can be Found here
    
    [link](https://documenter.getpostman.com/view/6973972/TzJx9Gsu)


 - ### Tests

  To test the Code 
    $ npm run test