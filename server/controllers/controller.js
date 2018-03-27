const axios = require('axios')

const search = (req, res) => {
console.log(req.params)
axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.params.id}&interval=1min&apikey=M3TH4M9YI8YQLZZ5`)
.then(response => res.status(200).json(response.data))
.catch((err) => console.log(err))

}

module.exports = {
    search
}