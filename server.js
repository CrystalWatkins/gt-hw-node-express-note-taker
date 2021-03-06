// Require express
const express = require("express");
const path = require("path");
const fs = require("fs");
// Create an instance of Express- app
const app = express();
// create a PORT
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})


//Displays all the notes on the page
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occurred reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
        res.json(arrayOfNotes);
    });
});

// Add a new note via a  POST request
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occurred reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
            arrayOfNotes.push(req.body);
            arrayOfNotes.map((obj, i) => (obj.id = ++i));
        //write the data back to the file
        fs.writeFile("./db/db.json", JSON.stringify(arrayOfNotes), "utf8", (err, data) => {
            if (err) {
                return res.send("An error occurred writing your data");
            }
            res.json(arrayOfNotes);
        });
    });
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occurred reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
        const newNotes = arrayOfNotes.filter((user) => user.id != req.params.id);

        fs.writeFile("./db/db.json", JSON.stringify(newNotes), "utf8", (err, data) => {
            if (err) {
                return res.send("An error occurred writing your data");
            }
            res.json(arrayOfNotes);
        });
    });
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
// listen to that port
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});


// * The application should have a `db.json` file on the backend that will be 
// used to store and retrieve notes using the `fs` module.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved
//    notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request 
//   body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing 
//   the id of a note to delete. This means you'll need to find a way to give 
//   each note a unique `id` when it's saved. 
//   In order to delete a note, you'll need to read all notes from the `db.json` 
//   file, remove the note with the given `id` property, and then rewrite the notes 
//   to the `db.json` file