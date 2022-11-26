const express = require('express')
require('dotenv').config() //enviornment variales
const cors = require('cors')
const Res = require('./models/res')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


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
            response.json(result)
        }
        else{
            response.status(404).end()
        }
    })
})

app.delete('/api/res/:id', (request, response) => {
    Res.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end() //204 means no value sent back
    })
})

app.post('/api/res', (request, response) => {
    const body = request.body //this gets the object 
  
  
    const newRes = new Res({
      name: body.name,
      rating: body.rating,
      timesVisited: body.timesVisited,
      comments: body.comments,
    })
    newRes.save().then(result => {
        response.json(result)
    })
  
  })