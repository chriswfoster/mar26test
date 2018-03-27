const axios = require("axios")

const trends = (req, res) => {
  console.log(req.params)
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
        req.params.id
      }&interval=1min&apikey=M3TH4M9YI8YQLZZ5`
    )
    .then(response => res.status(200).json(response.data))
    .catch(err => console.log(err))
}

const search = (req, res) => {
  axios
    .get(
      `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${
        req.params.id
      }`
    )
    .then(response => res.status(200).json(response.data))
}

module.exports = {
  search,
  trends
}
