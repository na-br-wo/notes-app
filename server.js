// setting up express package and initializing app variable
const express = require('express')
const app = express();
const fs = require('fs')
const PORT = 3001


// adding GET method which will read the contents of db.json
app.get('/', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Error reading database')
    }

    //if not an error, parse the JSON data
    const jsonData = JSON.parse(data)
    console.log(jsonData)
  
    // send data back to client
    res.json(jsonData)
  })
})

// HTML routes
// const indexRouter = require('./public/index.html')
// const notesRouter = require('./public/notes.html')



app.listen(PORT, () =>
  console.log(`Notes app listening at http://localhost:${PORT}`)
);