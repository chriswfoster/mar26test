const express = require('express')
const cors = require('cors')
const {json} = require('body-parser')
const controller = require('./controllers/controller.js')




const port = 3001

const app = express()

app.use(express.static(`${__dirname}/../build`))

app.use(json())
app.use(cors())

app.get('/api/search/:id', controller.search)
app.get('/api/trends/:id', controller.trends)

const path = require("path")
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"))
})

app.listen(port, () => console.log(`Listening on port ${port}`))