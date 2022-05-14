# insta-mongo-example

Just a simple example of a Node.js/Express app using insta-mongo for an instant MongoDB dev database.

## Setup

Download the code repo or clone it using Git.

Open a terminal, then change directory into the repo.

Now install dependencies:

```bash
npm install
```

## Run in dev mode

Run it like this:

```bash
npm run start:dev
```

This enables live reload using Nodemon, sets NODE_ENV to "development" and starts the MongoDB dev database.

The REST API is available at http://localhost:5050.

As an example you can get a list of people by opening [http://localhost:5050/api/people](http://localhost:5050/api/people) in your browser.

Also take a look in `test.http`. This is a script for [VS Code REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) that is setup to exercise the various routes of the REST API.

## Run the code for production

Now you can run the example code:

```bash
npm start
```

There's no dev database in production mode, you have to supply your own MongoDB database and set environment variable DB_CONNECTION_STRING to the connection string your database.

To run this in production you should also set the environment varible NODE_ENV to "production".
