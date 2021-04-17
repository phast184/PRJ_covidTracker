import React from 'react'
import InfoBox from './InfoBox'
import {useCanadaContext} from '../context/canadaContext'
import numeral from "numeral"
function InfoBoxes(theme) {

    const {caseType, canada, setCaseType, provinceInput, provinces} = useCanadaContext();
    let todayCases, todayDeaths, todayRecovered, totalCases, totalRecovered, totalDeaths;
    if (provinceInput === 'Canada'){
        todayCases = canada.todayCases;
        todayDeaths = canada.todayDeaths;
        todayRecovered = canada.todayRecovered;
        totalCases = canada.cases;
        totalDeaths = canada.deaths;
        totalRecovered = canada.recovered
    }
    else {
      const tempProvince = provinces.filter(prov => prov.province === provinceInput);
      totalCases = tempProvince[0].stats.confirmed;
      totalDeaths = tempProvince[0].stats.deaths;
      totalRecovered = tempProvince[0].stats.recovered;
    }
    return (
        <div>
            <div className="app__stat">
            <InfoBox
              title="Today Coronavirus Cases"
              onClick={(e) => setCaseType("cases")}
              active={caseType === "cases"}
              cases={numeral(todayCases).format("0.0a")}
              total={numeral(totalCases).format("0.0a")}
              isRed
              theme={theme.theme}
            />
            <InfoBox
              title="Today Recovered People"
              cases={numeral(todayRecovered).format("0.0a")}
              onClick={(e) => setCaseType("recovered")}
              active={caseType === "recovered"}
              total={numeral(totalDeaths).format("0.0a")}
              theme={theme.theme}
            />
            <InfoBox
              title="Today Death"
              cases={numeral(todayDeaths).format("0.0a")}
              onClick={(e) => setCaseType("deaths")}
              active={caseType === "deaths"}
              total={numeral(totalRecovered).format("0.0a")}
              isRed
              theme={theme.theme}
            />
          </div>
        </div>
    )
}

export default InfoBoxes

