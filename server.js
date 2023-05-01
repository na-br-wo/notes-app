// setting up express package and initializing app variable
const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path')
const PORT = 3001

//serving the static files from ./public directory
app.use(express.static(path.join(__dirname, 'public')))

// HTML routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
)
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
)

// adding api GET method which will read the contents of db.json
app.get('/api/notes', (req, res) => {
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

// adding api POST method for adding new note
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Error reading database')
    }

    //if not an error, parse the JSON data
    const jsonData = JSON.parse(data)
    const newNote = req.body
    // generating newNote ID using date.now() method
    

    jsonData.push(newNote)

    //now writing the note data to file
    fs.writeFile('./db/db.json', JSON.stringify(jsonData), err => {
      if (err) {
        console.error(err)
        return res.status(500).send('Error adding note to database')
      }
      res.json(newNote)
    })
  })
})

app.listen(PORT, () =>
  console.log(`Notes app listening at http://localhost:${PORT}`)
);