import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"

import Graph from './components/Graph'
import Body from './components/Body'

// const dataList = require('./Data.js').datas ////// Local data

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputText: "",
      chosen: {},
      dataArray: [],
      statsArray: [],
      
    }
    this.getNewQuote = this.getNewQuote.bind(this)
    this.getTrends = this.getTrends.bind(this)
    this.numberFormatter = this.numberFormatter.bind(this)
    this.dateFormatter = this.dateFormatter.bind(this)
  }

  handleTyping(val) {
    this.setState({ inputText: val })
  }

  getNewQuote(search) {
    axios
      .get(`/api/search/${search.toUpperCase()}`)
      .then(response => {
        this.setState({ dataArray: response.data })
      })
      .then(() => this.getTrends(search))
  }

  getTrends(search) {
    var placeHolder = []
    console.log(search)
    axios.get(`/api/trends/${search.toUpperCase()}`).then(response => {
      for (var key in response.data["Monthly Time Series"]) {
        response.data["Monthly Time Series"][key].Date = key
        placeHolder.push(response.data["Monthly Time Series"][key])
      }
      this.setState({ statsArray: placeHolder.splice(0, 12) })
    })
  }

  numberFormatter(num) {
    if (num > 999999999) {
      return (num / 1000000000).toFixed(1) + "B"
    } else if (num > 999999) {
      return (num / 1000000).toFixed(1) + "M"
    } else return num > 999(num / 1000).toFixed(1) + "K"
  }

  dateFormatter(date) {
    let timeString = date.slice(10, 19)
    var H = +timeString.substr(0, 2)
    var h = H % 12 || 12
    var ampm = H < 12 || H === 24 ? " AM" : " PM"
    timeString = h + timeString.substr(3, 6) + ampm
    return timeString
  }

  render() {
    console.log(this.state)
    const { dataArray } = this.state
    const displayData = dataArray.Name ? (
      <Body dataArray = {dataArray}/>
    ) : (
      <p> Type Your Search Below: </p>
    )
    return (
      <div className="flexAll">
        <div className="mainDiv">
          <h2>Requirements:</h2>

          <hr className="firstHr" />

          {displayData}

          <input
            onChange={e => this.handleTyping(e.target.value)}
            onKeyPress={e =>
              e.key === "Enter" ? this.getNewQuote(this.state.inputText) : null
            }
            placeholder="Search text here"
          />
          <button
            className="buttonstyle"
            onClick={() => this.getNewQuote(this.state.inputText)}
          >
            Get New Quote
          </button>
        </div>
        <div>
          <Graph statsArray={this.state.statsArray}/>
        </div>
      </div>
    )
  }
}

export default App
