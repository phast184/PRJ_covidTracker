import React from 'react'
import './Table.css'
import numeral from 'numeral'
import {useGlobalContext} from '../context/globalContext'
import {sortData} from '../utils/helpers'
function Table() {
    const {countries, typeInput} = useGlobalContext();
    let tempCountries = [...countries];
    tempCountries = sortData(tempCountries, typeInput)
    console.log(tempCountries)

    return (
        <div className = 'table'>
            {tempCountries.map(country => {
                return(
                    <tr>
                        <td>{country.country}</td>
                        <td>
                            <strong>{numeral(country[typeInput]).format("0,0")}</strong>
                        </td>
                    </tr>
                )
            })}
        </div>
    )
}

export default Table
