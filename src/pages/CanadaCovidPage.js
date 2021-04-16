import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { useGlobalContext } from "../context/globalContext";
import { useCanadaContext } from "../context/canadaContext";
import "../App.css";
import Navbar from "../components/NavBar";
import InfoBox from "../components/InfoBox";
import InfoBoxes from "../components/InfoBoxes";
import Table from "../components/Table";
import Map from "../components/Map/Map";
import LineGraph from "../components/LineGraph";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";
import SidebarContainer from "../components/sidebarContainer/sidebarContainer";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import storage from "local-storage-fallback";

function CanadaCovidPage() {
  const {
    provinces,
    historicalProvince,
    caseType,
    provinceInput,
    setProvinceInput,
    typeInput,
    typeInputData,
    setTypeInput,
  } = useCanadaContext();

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
    setTheme(theme.mode === "dark" ? { mode: "light" } : { mode: "dark" });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div className="app">
          <SidebarContainer theme={theme} changeTheme={changeTheme}/>
          <div className="container">
            <div className="app__left">
              <div className="app__header">
                <FormControl className="app_dropDown">
                  <Select
                    variant="outlined"
                    value={provinceInput}
                    onChange={(e) => setProvinceInput(e)}
                    className="countryDropDown"
                  >
                    <MenuItem value="Canada" selected="selected">
                      Canada
                    </MenuItem>
                    {provinces.map((p, index) => {
                      return (
                        <MenuItem value={p.province} key={index}>
                          {p.province}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <Map />
              <InfoBoxes theme={theme.mode} />
            </div>
            <Card className="app__right">
              <CardContent>
                <div className="app__information">
                  <div className="app__right__header">
                    <div id="title_header">
                      <h4>Chart Of Provinces Sorted By</h4>
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
                  <Table data={provinces} typeInput={typeInput}></Table>
                  <h4 className="graph-header">{provinceInput} line graph</h4>
                  <LineGraph
                    dataChart={historicalProvince}
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

export default CanadaCovidPage;
