const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let restaurants = [
    {
        name: 'Gyubee',
        rating: 10,
        timesVisited: 25,
        comments: 'the best',
        id: '1',
    },
    {
        name: 'Alo',
        rating: 8,
        timesVisited: 1,
        comments: 'okay',
        id: '2',
    }
]
app.get('/api/res', (request, response) => {
    response.json(restaurants)
})

app.get('/api/res/:id', (request, response) => {
    let id = request.params.id
    const res = restaurants.find(r => r.id === id)
    
    if (res) {
      response.json(res) 
    } else {
      response.status(404).end()
    }
})

app.delete('/api/res/:id', (request, response) => {
    let id = request.params.id
    restaurants = restaurants.filter(r => r.id !== id)
  
    response.status(204).end() //204 means no value sent back
})

app.post('/api/res', (request, response) => {
    const body = request.body //this gets the object 
  
    if(restaurants.find(r => r.name===body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
  
    const res = {
      name: body.name,
      rating: body.rating,
      timesVisited: body.timesVisited,
      comments: body.comments,
      id: String(Math.round(Math.random()*1000)),
    }
  
    restaurants = restaurants.concat(res)
  
    response.json(res)
  })