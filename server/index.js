const express = require('express')
const cors = require('cors')
const {json} = require('body-parser')
const controller = require('./controllers/controller.js')

// I didn't gitignore the .env so you can try it out for yourself :)

const port = 3001

const app = express()
app.use(json())
app.use(cors())

app.get('/api/search/:id', controller.search)


app.listen(port, () => console.log(`Listening on port ${port}`))