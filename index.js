/* eslint-disable no-undef */
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config() //enviornment variales
const cors = require('cors')
const Res = require('./models/res')
const app = express()
const path = require('path')
const fs = require('fs')
const multer = require('multer')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/res', (request, response) => {
  Res.find({})
    .then(result => {
      response.json(result)
    })
   
})

app.get('/api/res/:id', (request, response) => {
  let id = request.params.id
  Res.findById(id)
    .then(result => {
      if(result){
        // Convert the image to a base64-encoded string
        const imageData = result.image.data.toString('base64')
        

        // Modify the object to include the base64-encoded string
        const modifiedDoc = { ...result, imageData}
        console.log(modifiedDoc)
        // Return the modified object as a response
        response.json(modifiedDoc)
      }
      else{
        response.status(404).end()
      }
    })
})

app.delete('/api/res/:id', (request, response) => {
  Res.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end() //204 means no value sent back
    })
})
const Storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: Storage})

app.post('/api/res', upload.single('image'), (req, res) => { //first uploaded to folder in server, then adds the image to mongo
  
  const body = req.body //this gets the object
  const newRes = new Res({
    name: body.name,
    rating: body.rating,
    timesVisited: body.timesVisited,
    comments: body.comments,
    image:{
      data: fs.readFileSync('./public/images/' + req.file.filename),
      contentType:'image/png'
    }
  })
  newRes.save().then(result => {
    res.json(result)
  })
    
  
  
  
  
})

