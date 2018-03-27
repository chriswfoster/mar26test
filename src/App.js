import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"
import * as V from 'victory'
import {VictoryChart, VictoryLine} from 'victory'
// const dataList = require('./Data.js').datas ////// Local data

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputText: "",
      chosen: {},
      dataArray: [],
      statsArray: [],
      data: [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
      ]
    }
  }

  handleTyping(val) {
    this.setState({ inputText: val })
  }

  getNewQuote(search) {
    axios.get(`/api/search/${search.toUpperCase()}`).then(response => {
      this.setState({ dataArray: response.data }) 
    })
    .then( () => this.getTrends(search))
  }

  getTrends(search) {
    var placeHolder = []
    console.log(search)
    axios.get(`/api/trends/${search.toUpperCase()}`)
    .then(response => {
      
      for(var key in response.data['Monthly Time Series']){
        response.data['Monthly Time Series'][key].Date = key
        placeHolder.push(response.data['Monthly Time Series'][key])
      }
      this.setState({statsArray: placeHolder.splice(0, 12)})

    })
  
    }

  // getNewQuote(search) {
  //   dataList[search.toUpperCase()]
  //     ? this.statusChecker(search)
  //     : alert("Please try a different search parameter.");
  // }

  // statusChecker(search) {
  //   dataList[search.toUpperCase()].Status === "SUCCESS"
  //     ? this.setState({ chosen: dataList[search.toUpperCase()] })
  //     : alert(dataList[search.toUpperCase()].Message);
  // }

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
    const { dataArray, data } = this.state
    const displayData = dataArray.Name ? (
      <div>
        <p className="font">{dataArray.Name.toUpperCase()}</p>
        <div className="listFlex">
          <p className="font" style={{ fontSize: "1.25em" }}>
            {dataArray.LastPrice.toFixed(2)}
          </p>
          <p className={dataArray.Change > 0 ? "positive" : "negative"}>
            {dataArray.Change.toFixed(2)} ( {dataArray.ChangePercent.toFixed(2)}%
            )
          </p>
        </div>
        <hr className="otherHr" />

        <div className="listFlex">
          <p className="words">Range</p>
          <p className="numbs">
            {dataArray.Low.toFixed(2)} - {dataArray.High.toFixed(2)}
          </p>
        </div>
        <hr className="otherHr" />
        <div className="listFlex">
          <p className="words">Open</p>
          <p className="numbs">{dataArray.Open.toFixed(2)}</p>
        </div>
        <hr className="otherHr" />
        <div className="listFlex">
          <p className="words">Volume</p>
          <p className="numbs">{this.numberFormatter(dataArray.Volume)}</p>
        </div>
        <hr className="otherHr" />
        <div className="listFlex">
          <p className="words">Market Cap</p>
          <p className="numbs">{this.numberFormatter(dataArray.MarketCap)}</p>
        </div>
        <hr className="otherHr" />
        <div className="datePos">
          <p className="words">
            As of {this.dateFormatter(dataArray.Timestamp)}
          </p>
        </div>
      </div>
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
        <VictoryChart>
  <VictoryLine
    data={data}
  />
</VictoryChart>
       
</div>
      </div>
    )
  }
}

export default App
