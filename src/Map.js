import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers';
import { GridLayer } from '@deck.gl/aggregation-layers';
import { StaticMap } from 'react-map-gl';

import squaregrid from '@turf/square-grid';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiamFjazMzMyIsImEiOiJja2I2OWZ1MHAweGZvMzBuc3pvbnh2cDVpIn0.Z9TyDU8kwi_hELw1EfONeg';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 18.068580,
  latitude: 59.329355,
  zoom: 10,
  pitch: 0,
  bearing: 0
};

function App({ data }) {
  const [gridData, setGridData] = useState(null);
  const [layers, setLayers] = useState([]);
  var bbox = [17.432, 59.087, 18.544, 59.875]; //boundarybox
  var cellSide = 5;
  var options = { units: 'kilometers' };

  //Creation of the grid
  var grid = squaregrid(bbox, cellSide, options);
  console.log(grid);

  useEffect(() => {
    fetch('http://localhost:9000', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8;'
      }
    })
      .then(res => res.json())
      .then(data => {
        // setGridData(data);
        // console.log(data.features);
        setLayers([
          // new GeoJsonLayer({
          //   id: 'geojson-layer',
          //   data: data,
          //   autoHighlight: true,
          //   pickable: true,
          //   stroked: false,
          //   filled: true,
          //   extruded: true,
          //   getFillColor: d => [255 - d.properties.number_of_trajectories, 255, 255],
          //   getElevation: 0,
          //   // opacity: d => d.properties.number_of_trajectories ? 0 : 1
          // })
          new PolygonLayer({
            id: 'polygon-layer',
            data: data.features,
            autoHighlight: true,
            pickable: true,
            stroked: true,
            filled: true,
            wireframe: true,
            lineWidthMinPixels: 1,
            getPolygon: d => d.contour,
            // getElevation: d => d.population / d.area / 10,
            getFillColor: d => [d.number_of_trajectories, 140, 0],
            getLineColor: [0, 0, 0],
            getLineWidth: 0
          })
        ]);
      });
  }, [])

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getTooltip={({object}) => object && `${object.gid}
      Number of trajectories: ${object.number_of_trajectories}
      Number of trajectories starting: ${object.number_of_trajectories_starting}
      Number of trajectories ending: ${object.number_of_trajectories_ending}`}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default App;