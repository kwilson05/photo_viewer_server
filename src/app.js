const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const config = require('./config/config')



const app = express()
app.use(morgan('combined')) // prints logs; user agent; verbose logs

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

//setup cors
/*const corsMod = cors({
  origin: config.clientDomain,
  credentials: true,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin']
})

app.use(corsMod)*/




//require('./routes/index')(app)


app.listen(config.port)
console.log(`Server started on port ${config.port}`)
