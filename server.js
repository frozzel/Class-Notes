//// Dependencies/////
const fs = require( "fs" );
const express = require( "express" );
const path = require( "path" );
const notes= JSON.parse(fs.readFileSync("db/db.json", "utf8"));
const uuid= require("./help/uuid")

///// Init Server & middle Ware ////
const app = express();
var PORT = process.env.PORT || 8080;
app.use( express.urlencoded({ extended: true }));
app.use( express.json());
app.use( express.static( "public" ));

//////////Delete Stuff////////////
app.delete("/api/notes/:id", (req, res)=>{
    let deleteNote= req.params.id;
    for ( let i = 0; i< notes.length; i++){
        if (deleteNote === notes[i].id){
            notes.splice(i,1);
            fs.writeFileSync("./db/db.json", JSON.stringify(notes));
            return res.json(notes);
        }
    }
    return res.json(false);
})

///////// Write Notes /////////////
app.post("/api/notes", (req, res)=>{
    const {title, text}= req.body;
    if (title && text){
        const newNote={
            title,
            text,
            id: uuid()
        }
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
    }
    
    
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
app.listen(PORT, ()=> console.log(`App listening at http://localhost:${PORT}`))