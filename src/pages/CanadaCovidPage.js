import React from "react";
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
import InfoBoxes from "../components/InfoBoxes"
import Table from "../components/Table";
import Map from "../components/Map/Map";
import LineGraph from "../components/LineGraph";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";

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

  console.log(caseType)
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <div className="app__left">
          <div className="app__header">
            <FormControl className="app_dropDown">
              <Select
                variant="outlined"
                value={provinceInput}
                onChange={(e) => setProvinceInput(e)}
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
          <InfoBoxes />
          <Map />
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
              <Table data = {provinces} typeInput = {typeInput}></Table>
              <h4 className="graph-header">{provinceInput} line graph</h4>
              <LineGraph dataChart = {historicalProvince} caseType = {caseType}/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CanadaCovidPage;
