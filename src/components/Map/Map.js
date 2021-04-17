import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { drawCircle, drawCircleCanada } from "../../utils/helpers";
import _ from 'lodash'
import ChangeView from "./ChangeView";

function Map(props) {

  const maxCasesCountries = () => {
    return Math.max.apply(
      Math,
      props.data.map((country) => {
        return country.cases;
      })
    );
  }

  const maxCasesCanada = () => {
    return Math.max.apply(
      Math,
      props.data.map((province) => {
        return province.stats.confirmed;
      })
    );
  }

  const caseType = props.caseType === 'cases' ? 'confirmed' : props.caseType
  return (
    <div className="map">
      <LeafletMap center={props.mapCenter} zoom={props.mapZoom}>
        <ChangeView center={props.mapCenter} zoom={props.mapZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
        {
          _.get(props.data[0], 'countryInfo') !== undefined ? drawCircle(props.data, props.caseType, maxCasesCountries()) : drawCircleCanada(props.data, caseType, maxCasesCanada())
        }
      </LeafletMap>
    </div>
  );
}

export default Map;

/**STEPS TO ADD REACT-LEAFLET (map)
 * 1) IMPORT MapContainer as LeafletMap and TileLayer
 * 2) import "leaflet/dist/leaflet.css" to style the map
 * 3) Leaflet map properties:
 *      center: latitude and longitude to focus on a particular point on the map
 *      zoom: to show the default zoom on the map
 * 4) Circle is to add circle on the map:
 *      center: lat and long, to show the position of the circle on the map
 *      color:  color of the circle
 *      fillOpacity: opacity of the circle
 *      radius
 *
 */
