const mongoose = require('mongoose')
require('dotenv').config()
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI


mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('connected')
  })
  .catch((error) => {
    console.log('error connecting:', error.message)
  })

const resSchema = new mongoose.Schema({ //mongoose schema
  name: { 
    type: String,
    required: true
  },
  rating:{
    type:Number,
    required: true
  },
  timesVisited:{
    type:Number,
    required: true
  },
  comments:{
    type:String,
    required: true
  },
  image:{
    // eslint-disable-next-line no-undef
    data: Buffer,
    contentType: String
  }
})



resSchema.set('toJSON', { 
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Res', resSchema)