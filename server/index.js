const express = require('express')
const cors = require('cors')
const {json} = require('body-parser')


const port = 3001



app.list(port, () => console.log(`Listening on port ${port}`))