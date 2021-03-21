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
import Table from "../components/Table";
import Map from "../components/Map/Map";
import LineGraph from "../components/LineGraph";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";

function CanadaCovidPage() {
  // const [country, setCountry] = useState("worldwide");
  const {
    country,
    countries,
    countryInput,
    setCountryInput,
    setCaseType,
    caseType,
  } = useGlobalContext();

  const {
    provinces,
    canada,
    provinceInput,
    setProvinceInput,
    typeInput,
    typeInputData,
    setTypeInput,
  } = useCanadaContext();

  console.log(typeInput)
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
          <div className="app__stat">
            <InfoBox
              title="Coronavirus Cases"
              onClick={(e) => setCaseType("cases")}
              active={caseType === "cases"}
              cases={numeral(country.todayCases).format("0.0a")}
              total={numeral(country.cases).format("0.0a")}
              isRed
            />
            <InfoBox
              title="Recovered People"
              cases={numeral(country.todayRecovered).format("0.0a")}
              onClick={(e) => setCaseType("recovered")}
              active={caseType === "recovered"}
              total={numeral(country.recovered).format("0.0a")}
            />
            <InfoBox
              title="Death"
              cases={numeral(country.todayDeaths).format("0.0a")}
              onClick={(e) => setCaseType("deaths")}
              active={caseType === "deaths"}
              total={numeral(country.deaths).format("0.0a")}
              isRed
            />
          </div>
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
              <h4 className="graph-header">{countryInput} line graph</h4>
              <LineGraph />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CanadaCovidPage;
