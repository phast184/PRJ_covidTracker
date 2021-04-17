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
  LOAD_MAP,
} from "../actions/canadaActions";
import _ from 'lodash';
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
  historicalProvince: [],
  mapCenter: {
    lat: 60,
    lng: -95,
  },
  mapZoom: 4,
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

  const setMap = () => {
    let tempProvince = _.filter(state.provinces ,prov => prov.province === state.provinceInput);
    dispatch({type: LOAD_MAP, payload: tempProvince})
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
          url = `https://disease.sh/v3/covid-19/historical?lastdays=120`;
          let data = await fetchThings(url);
          const provinceInputLower = state.provinceInput.toLowerCase();
          data = data.filter(d => d.province === provinceInputLower);
          if (data.message) {
            chartData = data; // in case there is no available data, it will return a message
          } else {
            chartData = buildChartData(data[0].timeline, state.caseType);
          }
        }
        dispatch({ type: LOAD_HISTORICAL_PROVINCES, payload: chartData });
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistorical();
    setMap();
  }, [state.provinceInput, state.provinces, state.caseType]);

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
