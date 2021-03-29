import React, { useState, useEffect, useReducer, useContext } from "react";
import { fetchThings, buildChartData } from "../utils/helpers";
import reducer from "../reducer/canadaReducer";
import {
  LOAD_ALL_PROVINCES_DATA,
  LOAD_CANADA_DATA,
  SET_CASE_TYPE,
  SET_PROVINCE_INPUT,
  LOAD_HISTORICAL_CANADA,
  SET_TYPE_INPUT,
} from "../actions/canadaActions";
import {} from "../actions/canadaActions";

const initialState = {
  provinces: [],
  canada: [],
  caseType: "cases",
  provinceInput: "Canada",
  typeInput: "confirmed",
  typeInputData: [
    { type: "confirmed", name: "Confirmed Cases" },
    { type: "deaths", name: "Deaths" },
    { type: "recovered", name: "Recovered" },
  ],
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
    dispatch({type: SET_PROVINCE_INPUT, payload: e.target.value})
  }


  console.log(state.provinces);
  useEffect(() => {
    fetchCanada();
    fetchProvinces();
  }, []);
  return (
    //to pass the state from the context Provider
    <CanadaContext.Provider value={{ ...state, setTypeInput, setProvinceInput }}>
      {children}
    </CanadaContext.Provider>
  );
};

export const useCanadaContext = () => {
  return useContext(CanadaContext);
};
