import React from 'react'
import './Table.css'
import numeral from 'numeral'

import { useGlobalContext } from '../context/globalContext'
import { useCanadaContext } from '../context/canadaContext'
import { sortDataCountries, sortDataProvinces } from '../utils/helpers'
function Table(props) {
    let tempData = [...props.data];
    tempData.length > 100 ? tempData = sortDataCountries(tempData, props.typeInput) : tempData = sortDataProvinces(tempData, props.typeInput);
    return (
        <div className='table'>
            {
                tempData.length > 100 ? tempData.map(country => {
                    return (
                        <tr>
                            <td>{country.country}</td>
                            <td>
                                <strong>{numeral(country[props.typeInput]).format("0,0")}</strong>
                            </td>
                        </tr>
                    )
                }) :
                    tempData.map(p => {
                        return (
                            <tr>
                                <td>{p.province}</td>
                                <td>
                                    <strong>{numeral(p.stats[props.typeInput]).format("0,0")}</strong>
                                </td>
                            </tr>
                        )
                    })}
        </div>
    )
}

export default Table
