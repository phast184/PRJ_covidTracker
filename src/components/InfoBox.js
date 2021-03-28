import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
function InfoBox({ title, cases, total, type, isRed, onClick, active, theme }) {
  console.log(theme)
   
  return (
    <Card
      onClick={onClick}
      className={`infoBox ${active && "infoBox--selected--green"} ${
        isRed && "infoBox--selected--red"
      }`}
    >
      <CardContent>
        <Typography style={{color:theme === 'dark' ? "white" : "black"}} gutterBottom>
          {title}
        </Typography>
        <h2
          className={!isRed ? "infoBox__cases infoBox__cases--green" : "infoBox__cases infoBox__cases--red"}
        >
          +{cases}
        </h2>

        <Typography
          style={{color:theme === 'dark' ? "white" : "black"}}
          gutterBottom
          className="infoBox__total"
        >
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
