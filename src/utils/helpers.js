import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
export const fetchThings = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const buildChartData = (data, caseType) => {
  let chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[caseType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[caseType][date];
  }
  return chartData;
};

export const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const drawCircle = (data, casesType, maxCases) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={"#000000"}
      // fillColor={casesTypeColors[casesType].hex}
      fillColor = {

        country.cases > (maxCases * .75) ? "#CC1034" : 
        country.cases > (maxCases * .50) && (country.cases <= (maxCases * .75)) ? "#CCCC10" : 
        country.cases > (maxCases * .25) && (country.cases <= (maxCases * .50)) ? "#29CC10" : 
        "#10CCCC"}

      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-active">
            Active: {numeral(country.active).format("0,0")}
          </div>
          <div className="info-test">
            Test: {numeral(country.tests).format("0,0")}
          </div>
          <div className="info-critical">
            Critical cases: {numeral(country.critical).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

  
export const sortData = (data, type) => {
  return data.sort((a,b) => b[type] - a[type])
}