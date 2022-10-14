//// Dependencies/////
const fs = require( "fs" );
const express = require( "express" );
const path = require( "path" );
const { json } = require("express");
const notes= JSON.parse(fs.readFileSync("db/db.json", "utf8"));


///// Init Server & middle Ware ////
const app = express();
const PORT = process.envPORT || 3001;
app.use( express.urlencoded({ extended: true }));
app.use( express.json());
app.use( express.static( "public" ));


app.post("/api/notes", (req, res)=>{
    let newNote = req.body;
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
})




//// links to DB /////
app.get("/api/notes", (req, res)=>{
    return res.json(notes)
});


//// Url for notes html///
app.get("/notes", (req, res)=> res.sendFile(path.join(__dirname, "./public/notes.html")));

/// Url for index htlm ////
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, "./public/index.html")));
app.get('*', (req, res)=> res.sendFile(path.join(__dirname, "./public/index.html")));

//// Magic ///////
app.listen(3001, ()=>{
    console.log(`App listening at http://localhost:${PORT}`)
})