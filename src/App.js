import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
// const dataList = require('./Data.js').datas ////// local data


class App extends Component{
constructor() {
  super();
  this.state = {
    inputText: "",
    chosen: {},
    dataArray: []
  };
}

handleTyping(val) {
  this.setState({ inputText: val });
}

getNewQuote(search){
  let tehArray = []
  axios.get(`/api/search/${search.toUpperCase()}`)
  .then(response => {
    
    console.log(response.data)
  }
)
}

getAverages(){

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
    return (num / 1000000000).toFixed(1) + "B";
  } else if (num > 999999) {
    return (num / 1000000).toFixed(1) + "M";
  } else return num > 999(num / 1000).toFixed(1) + "K";
}

dateFormatter(date) {
  let timeString = date.slice(10, 18);
  var H = +timeString.substr(0, 2);
  var h = H % 12 || 12;
  var ampm = H < 12 || H === 24 ? " AM" : " PM";
  timeString = h + timeString.substr(2, 6) + ampm;
  return timeString;
}

render() {
  console.log(this.state);
  const { chosen } = this.state;
  const displayData = chosen.Name ? (
    <div>
      <p className="font">{chosen.Name.toUpperCase()}</p>
      <div className="listFlex">
        <p className="font" style={{ fontSize: "1.25em" }}>
          {chosen.LastPrice.toFixed(2)}
        </p>
        <p
          className={
            chosen.Change > 0
              ? "positive"
              :  "negative"
          }
        >
          {chosen.Change.toFixed(2)} ( {chosen.ChangePercent.toFixed(2)}% )
        </p>
      </div>
      <hr className="otherHr" />

      <div className="listFlex">
        <p className="words">Range</p>
        <p className="numbs">
          {chosen.Low.toFixed(2)} - {chosen.High.toFixed(2)}
        </p>
      </div>
      <hr className="otherHr" />
      <div className="listFlex">
        <p className="words">Open</p>
        <p className="numbs">{chosen.Open.toFixed(2)}</p>
      </div>
      <hr className="otherHr" />
      <div className="listFlex">
        <p className="words">Volume</p>
        <p className="numbs">{this.numberFormatter(chosen.Volume)}</p>
      </div>
      <hr className="otherHr" />
      <div className="listFlex">
        <p className="words">Market Cap</p>
        <p className="numbs">{this.numberFormatter(chosen.MarketCap)}</p>
      </div>
      <hr className="otherHr" />
      <div className="datePos">
        <p className="words">As of {this.dateFormatter(chosen.Timestamp)}</p>
      </div>
    </div>
  ) : (
    <p> Type Your Search Below: </p>
  );
  return (
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
  );
}
}


export default App;
