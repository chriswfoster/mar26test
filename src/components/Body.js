import React, { Component } from "react"

class Body extends Component {
  render() {
    const { dataArray, numberFormatter, dateFormatter } = this.props
    return (
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
          <p className="numbs">{numberFormatter(dataArray.Volume)}</p>
        </div>
        <hr className="otherHr" />
        <div className="listFlex">
          <p className="words">Market Cap</p>
          <p className="numbs">{numberFormatter(dataArray.MarketCap)}</p>
        </div>
        <hr className="otherHr" />
        <div className="datePos">
          <p className="words">As of {dateFormatter(dataArray.Timestamp)}</p>
        </div>
      </div>
    )
  }
}
export default Body
