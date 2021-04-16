import React, { useState, useEffect } from "react";
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
import SidebarContainer from "../components/sidebarContainer/sidebarContainer";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import storage from "local-storage-fallback";

function App() {
  // const [country, setCountry] = useState("worldwide");
  const {
    country,
    countries,
    countryInput,
    historicalCountry,
    setCountryInput,
    setCaseType,
    caseType,
    typeInputData,
    typeInput,
    setTypeInput,
  } = useGlobalContext();

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
  `;

  function getInitialTheme() {
    const savedTheme = storage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
  }
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    storage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const changeTheme = (e) => {
    setTheme(theme.mode === 'dark' ? {mode: 'light'} : {mode: 'dark'});
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div className="app">
          <SidebarContainer theme={theme} changeTheme={changeTheme} />
          <div className="container">
            <div className="app__left">
              <div className="app__header">
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
                        <MenuItem
                          value={country.countryInfo.iso2}
                          key={index}
                          className="countryMenuItem"
                        >
                          {country.country}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <Map />
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
                  <Table data={countries} typeInput={typeInput}></Table>
                  <h4 className="graph-header">{countryInput} line graph</h4>
                  <LineGraph
                    dataChart={historicalCountry}
                    caseType={caseType}
                  />
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
