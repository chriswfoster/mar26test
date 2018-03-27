import React, { Component } from "react"
import * as V from "victory"
import { VictoryChart, VictoryLine } from "victory"

class component extends Component {
  updateGraph() {}

  render() {
    const { data } = this.props
    return (
      <div>
        <VictoryChart>
          <VictoryLine data={data} />
        </VictoryChart>
        <button onClick={() => this.updateGraph()} className="buttonstyle">
          Refresh Graph
        </button>
      </div>
    )
  }
}
export default component
