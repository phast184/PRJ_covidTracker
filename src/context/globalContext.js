/**STEPS TO BUILD A CONTEXT FOLDER
 * 1) CREATE AN INITIAL STATE OUTSIDE THE FUNCTION COMPONENT
 * 2) CREATE CONTEXT
 * 3) CREATE A PROVIDER FUNCTION
 * 4) CREATE A CUSTOM USE CONTEXT
 */

import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/globalReducer";
import { fetchThings, buildChartData } from "../utils/helpers";
import {
  LOAD_DATA_COUNTRIES,
  LOAD_DATA_ALL,
  LOAD_DATA_COUNTRY,
  SET_COUNTRY_INPUT,
  LOAD_HISTORICAL_COUNTRY,
  SET_CASE_TYPE,
  SET_TYPE_INPUT,
} from "../actions/globalActions";
import { LOAD_MAP } from "../actions/canadaActions";

const initialState = {
  all: [],
  caseType: "cases",
  countries: [],
  country: {},
  countryInput: "worldwide",
  historicalCountry: {},
  mapCenter: {
    lat: 34.80746,
    lng: -40.4796,
  },
  mapZoom: 3,
  typeInputData: [
    { type: "cases", name: "Cases" },
    { type: "active", name: "Active Cases" },
    { type: "recovered", name: "Recovered" },
    { type: "tests", name: "Tests" },
    { type: "deaths", name: "Deaths" },
    { type: "critical", name: "Critical Cases" },
    { type: "testsPerOneMillion", name: "Tests / Million" },
    { type: "casesPerOneMillion", name: "Cases / Million" },
  ],
  typeInput: "cases",
};
const GlobalContext = React.createContext();
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  /**fetch data of all countries */
  const fetchCountries = async () => {
    let url = "https://disease.sh/v3/covid-19/countries";
    const data = await fetchThings(url);
    dispatch({ type: LOAD_DATA_COUNTRIES, payload: data });
  };

  /**fetch data of worldwide */
  const fetchAll = async () => {
    let url = "https://disease.sh/v3/covid-19/all";
    const data = await fetchThings(url);
    dispatch({ type: LOAD_DATA_ALL, payload: data });
  };



  const setCountryInput = (e) => {
    dispatch({ type: SET_COUNTRY_INPUT, payload: e.target.value });
    dispatch({ type: LOAD_DATA_COUNTRY });
  };

  const setCaseType = (type) => {
    dispatch({ type: SET_CASE_TYPE, payload: type });
  };

  const setTypeInput = (e) => {
    dispatch({ type: SET_TYPE_INPUT, payload: e.target.value });
  };
  /**Every time there is a change in inputCountry load new country data */
  useEffect(() => {
    const fetchHistorical = async () => {
      let url = "";
      let chartData;
      try {
        if (state.countryInput === "worldwide") {
          url = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
          const data = await fetchThings(url);
          chartData = buildChartData(data, state.caseType);
        } else {
          url = `https://disease.sh/v3/covid-19/historical/${state.countryInput}?lastdays=120`;
          const data = await fetchThings(url);
          if (data.message) {
            chartData = data; // in case there is no available data, it will return a message
          } else {
            chartData = buildChartData(data.timeline, state.caseType);
          }
        }
        dispatch({ type: LOAD_HISTORICAL_COUNTRY, payload: chartData });
      } catch (error) {
        console.log(error);
      }
    };

  
    fetchHistorical();
  }, [state.countryInput, state.country, state.caseType]);

  useEffect(() => {
    fetchAll();
    fetchCountries();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setCountryInput,
        setCaseType,
        setTypeInput,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
