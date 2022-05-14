const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { MongoClient, ObjectId } = require('mongodb');

async function main() {

    const dbName = "backend";

    let DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
    if (DB_CONNECTION_STRING === undefined) {
        // Make the user tell us which database to connect to.
        throw new Error(`Please specify the database connection string in the environment variable DB_CONNECTION_STRING.`);
    }

    const client = new MongoClient(DB_CONNECTION_STRING);

    await client.connect();

    const db = client.db(dbName);
    const personCollection = db.collection('person');

    const app = express();

    //
    // Parse the body of each request as JSON.
    //
    app.use(bodyParser.json());

    //
    // HTTP GET route to check that the server is alive.
    //
    app.get("/api/is-alive", (req, res) => {
        res.json({
            ok: true,
        });
    });

    //
    // Adds a new person.
    //
    app.post("/api/person", async (req, res) => {
    
        const result = await personCollection.insertOne({
            // Probably don't do this in production. 
            // Make it more specific to the fields you want to set.
            ...req.body, 
        });

        res.json({
            insertedId: result.insertedId,
        });
    });

    //
    // Gets a person by id.
    //
    app.get("/api/person", async (req, res) => {
    
        const id = req.query.id;

        const person = await personCollection.findOne({ _id: new ObjectId(id) });
        if (!person) {
            res.sendStatus(404);
            return;
        }

        res.json(person);
    });

    //
    // Gets a list of all people.
    //
    app.get("/api/people", async (req, res) => {

        // In production you'd probably want to add support for pagination here.

        res.json(await personCollection.find().toArray());
    });
    
    await startServer(app);

    console.log(`Browse to http://localhost:5050`);    
}    

main()    
    .catch(err => {
        console.error(`Failed to start server.`);
        console.error(err);
    });

//
// Starts the HTTP server.
//
function startServer(app) {
    return new Promise(resolve => {
        app.listen(5050, () => {
            resolve();
        });
    });
}

