import {
  LOAD_DATA_COUNTRIES,
  LOAD_DATA_COUNTRY,
  SET_COUNTRY_INPUT,
  SORT_COUNTRIES,
  LOAD_DATA_ALL,
  LOAD_HISTORICAL_COUNTRY,
  SET_CASE_TYPE,
  SET_TYPE_INPUT,
} from "../context/globalActions";
const reducer = (state, action) => {
  if (action.type === LOAD_DATA_COUNTRIES) {
    return {
      ...state,
      countries: action.payload,
    };
  }

  if (action.type === SORT_COUNTRIES) {
    let tempCountries = [state.countries];
    //tempCountries = tempCountries.sort((a,b) => a.cases - b.cases)
    return {
      ...state,
      sortedCountries: tempCountries,
    };
  }

  if (action.type === SET_COUNTRY_INPUT) {
    return {
      ...state,
      countryInput: action.payload,
    };
  }

  if (action.type === LOAD_DATA_COUNTRY) {
    if (state.countryInput === "worldwide") {
      return {
        ...state,
        country: state.all,
        mapCenter: { lat: 34.80746, lng: -40.4796 },
        mapZoom: 4
      };
    } else {
      const tempCountry = state.countries.filter(
        (country) => country.countryInfo.iso2 === state.countryInput
      );
      return {
        ...state,
        country: tempCountry[0],
        mapCenter: {
          lat: tempCountry[0].countryInfo.lat,
          lng: tempCountry[0].countryInfo.long,
        },
        mapZoom: 4
      };
    }
  }

  if (action.type === LOAD_DATA_ALL) {
    return {
      ...state,
      all: action.payload,
      country: action.payload,
    };
  }

  if (action.type === LOAD_HISTORICAL_COUNTRY) {
    return {
      ...state,
      historicalCountry: action.payload,
    };
  }

  if (action.type === SET_CASE_TYPE) {
    return {
      ...state,
      caseType: action.payload,
    };
  }

  if (action.type === SET_TYPE_INPUT){
    return{
      ...state,
      typeInput: action.payload
    }
  }
  return state;
};

export default reducer;
