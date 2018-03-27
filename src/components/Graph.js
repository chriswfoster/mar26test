import React, { Component } from "react"

import { VictoryChart, VictoryCandlestick } from "victory"

class component extends Component {
  constructor() {
    super()
    this.state = {
      sortedArray: [],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    }
  }

  updateGraph(dataArray) {
    const sortedArray = dataArray.reverse().map((item, ind) => {
      let first = this.state.months[item["Date"].substr(5, 2) - 1]
      return {
        x: first,
        open: parseFloat(item["1. open"]),
        close: parseFloat(item["4. close"]),
        high: parseFloat(item["2. high"]),
        low: parseFloat(item["3. low"])
      }
    })
    this.setState({ sortedArray })
  }

  render() {
    console.log(this.state)
    const { data, statsArray } = this.props
    const { sortedArray } = this.state
    return (
      <div>
        <VictoryChart>
          <VictoryCandlestick
            candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
            data={sortedArray}
          />
        </VictoryChart>
        <button
          onClick={() => this.updateGraph(statsArray)}
          className="buttonstyle"
        >
          Refresh Graph
        </button>
      </div>
    )
  }
}
export default component
