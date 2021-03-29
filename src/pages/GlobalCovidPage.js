import React, {useState} from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { useGlobalContext } from "../context/globalContext";
import "../App.css";
import Navbar from "../components/NavBar";
import InfoBox from "../components/InfoBox";
import Table from "../components/Table";
import Map from "../components/Map/Map";
import LineGraph from "../components/LineGraph";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import {FaLightbulb, FaRegLightbulb} from "react-icons/fa";

const GlobalStyle = createGlobalStyle`
.app, .map{
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#111" : "#EEE"};
    color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};
}

.infoBox, .infoBox__total, .app__right, #title_header,
 .countryDropDown, .countryMenuItem, .MuiMenu-paper,
  #select-dropDown, .table tr:nth-of-type(even), .graph-header{
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#555" : "#EEE"};
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
}

.table tr:nth-of-type(odd){
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333" : "#EEE"};
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "black")};
}

.fa-lightbulb, .fa-lightbulb-text{
  color: ${(props) => (props.theme.mode === "dark" ? "yellow" : "black")};
}

.fa-lightbulb{
  cursor: pointer;
}
`;

function App() {
  // const [country, setCountry] = useState("worldwide");
  const {
    country,
    countries,
    countryInput,
    setCountryInput,
    setCaseType,
    caseType,
    typeInputData,
    typeInput,
    setTypeInput,
  } = useGlobalContext();

  const [theme, setTheme] = useState({mode: "dark"})
  console.log(countries)
  console.log(typeInput);
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
    <div className="app">
      <Navbar />
      <div className="container">
        <div className="app__left">
          <div className="app__header">
          <h1>COVID-19 Safety Map&nbsp;<FaLightbulb className="fa-lightbulb" onClick={e => setTheme(theme.mode === 'dark' ? {mode: 'light'} : {mode: 'dark'})}></FaLightbulb>
              <span className="fa-lightbulb-text" style={{fontSize: "0.4em", textDecoration: "none"}}>&nbsp;{theme.mode === 'dark' ? "Turn on the lights" : "Turn off the lights"}</span></h1>
            <FormControl className="app_dropDown">
              <Select
                variant="outlined"
                value={countryInput}
                onChange={(e) => setCountryInput(e)}
                className="countryDropDown"
              >
                <MenuItem value="worldwide" selected="selected">
                  Worldwide
                </MenuItem>
                {countries.map((country, index) => {
                  return (
                    <MenuItem value={country.countryInfo.iso2} key={index} className="countryMenuItem">
                      {country.country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="app__stat">
            <InfoBox
              title="Today Coronavirus Cases"
              onClick={(e) => setCaseType("cases")}
              active={caseType === "cases"}
              cases={numeral(country.todayCases).format("0.0a")}
              total={numeral(country.cases).format("0.0a")}
              isRed
              theme={theme.mode}
            />
            <InfoBox
              title="Today Recovered People"
              cases={numeral(country.todayRecovered).format("0.0a")}
              onClick={(e) => setCaseType("recovered")}
              active={caseType === "recovered"}
              total={numeral(country.recovered).format("0.0a")}
              theme={theme.mode}
            />
            <InfoBox
              title="Today Death"
              cases={numeral(country.todayDeaths).format("0.0a")}
              onClick={(e) => setCaseType("deaths")}
              active={caseType === "deaths"}
              total={numeral(country.deaths).format("0.0a")}
              isRed
              theme={theme.mode}
            />
          </div>
          <Map />
        </div>
        <Card className="app__right">
          <CardContent>
            <div className="app__information">
              <div className="app__right__header">
                <div id="title_header">
                  <h4>Live Stats By Country</h4>
                </div>
                <FormControl className="app_dropDown">
                  <Select
                    variant="outlined"
                    value={typeInput}
                    onChange={(e) => setTypeInput(e)}
                    id="select-dropDown"
                  >
                    {typeInputData.map((typeInput, index) => {
                      return (
                        <MenuItem value={typeInput.type} key={index}>
                          {typeInput.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <Table theme={theme.mode} data = {countries} typeInput = {typeInput}></Table>
              <h4 className="graph-header">{countryInput} line graph</h4>
              <LineGraph theme={theme.mode}/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
    </ThemeProvider> 
  );
}

export default App;
