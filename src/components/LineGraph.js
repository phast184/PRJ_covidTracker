import React from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { casesTypeColors } from "../utils/helpers";
import "./LineGraph.css";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
        ticks:{
          fontColor: "black"
        }
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
          fontColor: "black"
        },
      },
    ],
  },
};

function LineGraph(props) {
  return (
    <div className="graph">
      
      {props.dataChart?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: `${casesTypeColors[props.caseType].half_op}`,
                borderColor: `${casesTypeColors[props.caseType].hex}`,
                data: props.dataChart,
              },
            ],
          }}
          options={options}
        />
      )}

      {props.dataChart.message && <h3>No data available for this country</h3>}
    </div>
  );
}

export default LineGraph;
