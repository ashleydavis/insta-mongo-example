# insta-mongo-example

Just a simple example of a Node.js/Express app using [insta-mongo](https://www.npmjs.com/package/insta-mongo) for an instant MongoDB dev database.

## Support the developer 

<a target="_blank" href="http://www.codecapers.com.au/about#support-my-work">Click here to **support the developer.**</a>

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

This starts the Node.js app with live reload using Nodemon, sets NODE_ENV to "development" and starts the MongoDB dev database.

The REST API is available at http://localhost:5050.

As an example you can get a list of people by opening [http://localhost:5050/api/people](http://localhost:5050/api/people) in your browser.

Also take a look in `test.http`. This is a script for [VS Code REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) that is setup to exercise the various routes of the REST API.

## How it works

When you invoke `npm run start:dev` it runs the following script (defined in `package.json`):

```bash
concurrently "npm run start-db" "npm run start-with-dev-db" --kill-others
```

This invokes the two quoted commands in parallel. The flag `--kill-others` makes the `concurrently` command automatically kill the dev database server when the Node.js app terminates.

The script `start-db` (also from `package.json`) uses `insta-mongo` to create an instant dev database:

```bash
insta-mongo --db=backend --load=three --db-port=7001 --rest-port=7000
```

The script `start-with-dev-db` (again from `package.json`) starts the Node.js app configured to connect to the dev database:

```bash
cross-env NODE_ENV=development DB_CONNECTION_STRING=mongodb://localhost:7001 nodemon index.js
```

Hopefully that's clear, but if not please log an issue and ask a question or reach out to me on ashley@codecapers.com.au.

## Run the code for production

Run the app for production in the standard way:

```bash
npm start
```

There's no dev database in production mode, you have to supply your own MongoDB database and set environment variable DB_CONNECTION_STRING to the connection string your database.

To run this in production you should also set the environment varible NODE_ENV to "production".

