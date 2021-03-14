import {
  LOAD_ALL_PROVINCES_DATA,
  LOAD_CANADA_DATA,
  SET_CASE_TYPE,
  SET_PROVINCE_INPUT,
  LOAD_HISTORICAL_CANADA,
  SET_TYPE_INPUT
} from "../actions/canadaActions";

const reducer = (state, action) => {
    if (action.type === LOAD_CANADA_DATA){
        return{
            ...state,
            canada: action.payload
        }
    }

    if (action.type === LOAD_ALL_PROVINCES_DATA){
        return{
            ...state,
            provinces: action.payload
        }
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
