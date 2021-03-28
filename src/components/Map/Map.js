import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { useGlobalContext } from "../../context/context";
import "./Map.css";
import { drawCircle } from "../../utils/helpers";
import ChangeView from './ChangeView'



function Map() {
  const { mapCenter, mapZoom, countries, caseType } = useGlobalContext();
  console.log(countries)

  function maxCases(){
    return Math.max.apply(Math, countries.map(function(country) { return country.cases; }))
  }

  return (
    <div className="map">
      <LeafletMap center={mapCenter} zoom={mapZoom}>
        <ChangeView center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        >
        </TileLayer>
        {drawCircle(countries, caseType, maxCases())}
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
