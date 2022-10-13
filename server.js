//// Dependencies/////
const fs = require( 'fs' );
const express = require( 'express' );
const path = require( 'path' );
const dataBaseJson= 'db/db.json';


///// Init Server ////
const app = express();
const PORT = 3001;


//`GET /api/notes` should read the `db.json` file and return all saved notes as JSON.////
app.get('/api/notes', (res, req)=>{
    fs.readFileSync(dataBaseJson, 'utf8'); ///https://stackoverflow.com/questions/48818415/json-parsefs-readfilesync-returning-a-buffer-string-of-numbers ///
    res.json(JSON.parse(notes));  //may need to change once we get into the index.js///
})

//`POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file////
/// Review activities 06 ///// need some research//
app.post('/api/notes', (res, req)=>{

})

/// `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file,///
app.delete('/api/notes/:id', (res, req)=>{
    //// research /////
})



//`GET /notes` should return the `notes.html` file.//
app.get('/notes', (res, req)=>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// `GET *` should return the `index.html` file.////////
app.get('*', (res, req)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//// Activates Server ///////////

app.listen(PORT, ()=>{
    console.log(`App listening at http://localhost:${PORT}`)
})