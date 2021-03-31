import React, { useState, useEffect, useReducer, useContext } from "react";
import { fetchThings, buildChartData } from "../utils/helpers";
import reducer from "../reducer/canadaReducer";
import {
  LOAD_ALL_PROVINCES_DATA,
  LOAD_CANADA_DATA,
  SET_CASE_TYPE,
  SET_PROVINCE_INPUT,
  LOAD_HISTORICAL_CANADA,
  LOAD_HISTORICAL_PROVINCES,
  SET_TYPE_INPUT,
} from "../actions/canadaActions";
import { } from "../actions/canadaActions";

const initialState = {
  provinces: [],
  canada: [],
  caseType: "cases",
  provinceInput: "Canada",
  typeInput: "confirmed",
  typeInputData: [
    { type: "confirmed", name: "Confirmed Cases" },
    { type: "deaths", name: "Deaths" },
    { type: "recovered", name: "Recovered Cases" },
  ],
  historicalProvince: []
};

const CanadaContext = React.createContext();

export const CanadaContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //**fetch data for Canada */

  const fetchCanada = async () => {
    let url = "https://disease.sh/v3/covid-19/countries/CA?strict=true";
    const data = await fetchThings(url);
    dispatch({ type: LOAD_CANADA_DATA, payload: data });
  };
  //**fetch data of all provinces in Canada */
  const fetchProvinces = async () => {
    let url = "https://disease.sh/v3/covid-19/jhucsse";
    let data = await fetchThings(url);
    data = data.filter((a) => a.country === "Canada");
    dispatch({ type: LOAD_ALL_PROVINCES_DATA, payload: data });
  };


  //**set type input */

  const setTypeInput = (e) => {
    dispatch({ type: SET_TYPE_INPUT, payload: e.target.value });
  };

  /**Set province input for dropdown menu */

  const setProvinceInput = (e) => {
    dispatch({ type: SET_PROVINCE_INPUT, payload: e.target.value })
  }

  /**Set case type  */
  const setCaseType = (type) => {
    dispatch({ type: SET_CASE_TYPE, payload: type })
  }



  useEffect(() => {
    const fetchHistorical = async () => {
      let url = "";
      let chartData;
      try {
        if (state.provinceInput === "Canada") {
          url = `https://disease.sh/v3/covid-19/historical/CA?lastdays=120`;
          const data = await fetchThings(url);
          chartData = buildChartData(data.timeline, state.caseType);
        } else {
          const dataSchema = {
            cases: [],
            deaths: [],
            recovered: []
          }
          url = `https://api.opencovid.ca/timeseries`;
          const data = await fetchThings(url);
          dataSchema.cases = data.cases.filter(d => d.province === state.provinceInput).slice(-120);
          dataSchema.deaths = data.mortality.filter(d=> d.province === state.provinceInput).slice(-120);
          dataSchema.recovered = data.recovered.filter(d => d.province === state.provinceInput).slice(-120);
          console.log(dataSchema)
          if (data.message) {
            chartData = data; // in case there is no available data, it will return a message
          } else {
            chartData = buildChartData(data.timeline, state.caseType);
          }
        }
    
        dispatch({ type: LOAD_HISTORICAL_PROVINCES, payload: chartData });
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchHistorical();
  }, [state.provinceInput, state.provinces, state.caseType]);

  console.log(state.provinceInput)
  
  useEffect(() => {
    fetchCanada();
    fetchProvinces();
  }, []);
  return (
    //to pass the state from the context Provider
    <CanadaContext.Provider value={{ ...state, setTypeInput, setProvinceInput, setCaseType }}>
      {children}
    </CanadaContext.Provider>
  );
};

export const useCanadaContext = () => {
  return useContext(CanadaContext);
};
