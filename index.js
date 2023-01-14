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

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)
//const User = require('./models/user')

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/res', async (request, response) => {
  const res = await Res.find({})//.populate('user', { username: 1, name: 1 })
  
  response.json(res)
  
   
})

app.get('/api/maps-key', (req, res) => {
  const apiKey = process.env.MAPS_KEY
  res.send({apiKey})
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
        // Return the modified object as a response
        response.json(modifiedDoc)
      }
      else{
        response.status(404).end()
      }
    })
})

app.put('/api/res/:id', (request, response, next) => {
  const body = request.body
  const res = {
    visited: body.visited,
    favourite: body.favourite
  }

  Res.findByIdAndUpdate(request.params.id, res, { new: true })
    .then(updated => {
      response.json(updated.toJSON())
    })
    .catch(error => next(error))
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

app.post('/api/res', upload.single('image'), async (req, res) => { //first uploaded to folder in server, then adds the image to mongo
  
  const body = req.body //this gets the object
  //const user = await User.findById(body.userId)

  let img = {}
  if(req.file){
    img = {
      data: fs.readFileSync('./public/images/' + req.file.filename),
      contentType:'image/png'
    }
  }
  else{
    img = {
      data: fs.readFileSync('./public/images/1672024401088.png'),
      contentType:'image/png'
    }
  }
  const newRes = new Res({
    mapsRating: body.mapsRating,
    mapsRatingsCount: body.mapsRatingsCount,
    coordinates: body.coordinates,
    openHours: body.openHours,
    website: body.website,
    name: body.name,
    rating: body.rating,
    timesVisited: body.timesVisited,
    comments: body.comments,
    visited: body.visited,
    favourite: body.favourite,
    image: img,
  })
  const saved = await newRes.save()
  //user.restaurants = user.restaurants.concat(saved._id)
  //await user.save()
  
  res.json(saved)

    
  
  
  
  
})

