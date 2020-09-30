import React from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

import squaregrid from '@turf/square-grid';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiamFjazMzMyIsImEiOiJja2I2OWZ1MHAweGZvMzBuc3pvbnh2cDVpIn0.Z9TyDU8kwi_hELw1EfONeg';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 18.068580,
  latitude: 59.329355,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

function App({ data }) {
  var bbox = [17.432, 59.087, 18.544, 59.875]; //boundarybox
  var cellSide = 5;
  var options = { units: 'kilometers' };

  //Creation of the grid
  var grid = squaregrid(bbox, cellSide, options);
  console.log(grid);

  const layers = [
    new GeoJsonLayer({
      id: 'geojson-layer',
      data: grid,
      pickable: true,
      stroked: true,
      filled: true,
      extruded: true,
      lineWidthScale: 20,
      lineWidthMinPixels: 2,
      getFillColor: [160, 160, 180, 200],
      getLineColor: ["#ff0000"],
      getRadius: 100,
      getLineWidth: 2,
      getElevation: 30
    })
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default App;