const express = require('express')
const cors = require('cors')
const {json} = require('body-parser')


// I didn't gitignore the .env so you can try it out for yourself :)

const port = 3001

const app = express()
app.use(json())
app.use(cors())



app.list(port, () => console.log(`Listening on port ${port}`))