//// Dependencies/////
const fs = require( "fs" );
const express = require( "express" );
const path = require( "path" );
const { json } = require("express");
const notes= JSON.parse(fs.readFileSync("db/db.json", "utf8"));


///// Init Server & middle Ware ////
const app = express();
const PORT = 3001;
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
    console.log(notes);
    return res.json(notes)
});


//// Url for notes html///
app.get("/notes", (res, req)=>{
    res.sendFile(path.join(__dirname, "notes.html"));
});

/// Url for index htlm ////
app.get('/', (res, req)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//// Magic ///////
app.listen(PORT, ()=>{
    console.log(`App listening at http://localhost:${PORT}`)
})