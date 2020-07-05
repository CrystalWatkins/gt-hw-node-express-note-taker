// Require express
const express = require("express");
const path = require("path");
const fs = ("fs");
// Create an instance of Express- app
const app = express();
// create a PORT
const PORT = process.env.PORT || 3000;

// CONFIRM WITH LINE 12-14 goes here for data-parse POST

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//Displays all the notes on the page
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occurred reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
        res.JSON(arrayOfNotes);
    });
});

// app.post("/api/notes", (req, res) => {
//     fs.readFile("./db/quotes.json", "utf8", (err, data) => {
//         if (err) {
//             return res.send("An error occurred reading your data");
//         }
//         const arrayOfNotes = JSON.parse(data);
//         arrayOfNotes.push(req.body);
//         fs.writeFile("./db/db.json",
//         JSON.stringify(arrayOfNotes), "utf8", 
//         (err) => {
//             if (err) {
//                 return res.send("An error occurred writing your data");
//             }
//             res.json(arrayOfNotes);
//         }
//         );
//     });
// });

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
//   to the `db.json` file.