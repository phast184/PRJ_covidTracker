import React from 'react'
import InfoBox from './InfoBox'
import {useCanadaContext} from '../context/canadaContext'
import numeral from "numeral"
function InfoBoxes(theme) {

    const {caseType, canada, setCaseType, provinceInput} = useCanadaContext();
    let todayCases, todayDeaths, todayRecovered, totalCases, totalRecovered, totalDeaths;
    if (provinceInput === 'Canada'){
        todayCases = canada.todayCases;
        todayDeaths = canada.todayDeaths;
        todayRecovered = canada.todayRecovered;
        totalCases = canada.cases;
        totalDeaths = canada.deaths;
        totalRecovered = canada.recovered
    }
    console.log(theme)
    return (
        <div>
            <div className="app__stat">
            <InfoBox
              title="Coronavirus Cases"
              onClick={(e) => setCaseType("cases")}
              active={caseType === "cases"}
              cases={numeral(todayCases).format("0.0a")}
              total={numeral(totalCases).format("0.0a")}
              isRed
              theme={theme.theme}
            />
            <InfoBox
              title="Recovered People"
              cases={numeral(todayRecovered).format("0.0a")}
              onClick={(e) => setCaseType("recovered")}
              active={caseType === "recovered"}
              total={numeral(totalDeaths).format("0.0a")}
              theme={theme.theme}
            />
            <InfoBox
              title="Death"
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

