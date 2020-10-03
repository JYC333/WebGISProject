import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { PolygonLayer, PathLayer } from '@deck.gl/layers';
import { GridLayer } from '@deck.gl/aggregation-layers';
import { StaticMap } from 'react-map-gl';

import Button from '@material-ui/core/Button';

import './style.css'

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

function App() {
  const [gridData, setGridData] = useState();
  const [networkData, setNetworkData] = useState();
  const [trajectoryData, setTrajectoryData] = useState();
  const [filteredGirdData, setFilteredGirdData] = useState();
  const [filteredNetworkData, setFilteredNetworkData] = useState();
  const [filteredTrajectoryData, setFilteredTrajectoryData] = useState();
  const [hoverInfo, setHoverInfo] = useState({ object: { id: '' } });
  const [clickInfo, setClickInfo] = useState();

  const [gridSequence, setGridSequence] = useState();
  const [trajectorySequence, setTrajectorySequence] = useState();

  const layers = [
    new PolygonLayer({
      id: 'NetworkGrid',
      data: filteredGirdData,
      visible: true,
      autoHighlight: true,
      pickable: true,
      stroked: true,
      filled: true,
      getPolygon: d => d.contour,
      getFillColor: d => [d.number_of_trajectories, 140, 0],
      getLineColor: [0, 0, 0],
      getLineWidth: 0,
      onClick: info => {
        fetch('http://localhost:9000/gridSequence', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8;'
          },
          body: info.object.gid
        })
          .then(res => res.json())
          .then(data => {
            setGridSequence(data.sequence_of_grids);
          });

        fetch('http://localhost:9000/trajectorySequence', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8;'
          },
          body: info.object.gid
        })
          .then(res => res.json())
          .then(data => {
            setTrajectorySequence(data.sequence_of_grids);
          });
      }
    }),
    new PolygonLayer({
      id: 'GridSequence',
      data: gridSequence,
      visible: true,
      autoHighlight: true,
      pickable: true,
      stroked: true,
      filled: true,
      getPolygon: d => d.contour,
      getFillColor: d => [0, 255, 255],
      getLineColor: [0, 0, 0],
      getLineWidth: 0,
    }),
    new PathLayer({
      id: 'RoadNetwork',
      data: filteredNetworkData,
      visible: false,
      autoHighlight: true,
      pickable: true,
      widthScale: 20,
      widthMinPixels: 2,
      getPath: d => d.coordinates,
      getColor: [235, 152, 107],
      getWidth: d => 0.5
    }),
    new PathLayer({
      id: 'AllTrajectories',
      data: filteredTrajectoryData,
      visible: true,
      autoHighlight: true,
      pickable: true,
      widthScale: 20,
      widthMinPixels: 2,
      getPath: d => d.coordinates,
      getColor: [235, 152, 107],
      getWidth: d => 0.5
    }),
    new PathLayer({
      id: 'TrajectorySequence',
      data: trajectorySequence,
      visible: true,
      autoHighlight: true,
      pickable: true,
      widthScale: 20,
      widthMinPixels: 2,
      getPath: d => d.coordinates,
      getColor: [255, 0, 0],
      getWidth: d => 0.5
    }),

  ];

  useEffect(() => {
    fetch('http://localhost:9000/girdData', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8;'
      }
    })
      .then(res => res.json())
      .then(data => {
        setGridData(data.features);
      });

    fetch('http://localhost:9000/NetworkData', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8;'
      }
    })
      .then(res => res.json())
      .then(data => {
        setNetworkData(data.features);
      });

    fetch('http://localhost:9000/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8;'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.features);
        setTrajectoryData(data.features);
      });

  }, []);

  useEffect(() => {
    setFilteredGirdData(gridData);
  }, [gridData]);

  useEffect(() => {
    setFilteredNetworkData(networkData);
  }, [networkData]);

  useEffect(() => {
    setFilteredTrajectoryData(trajectoryData);
  }, [trajectoryData]);

  function changeGird(num) {
    setFilteredGirdData(gridData.filter(d => d.number_of_trajectories > num));
  };

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      // onHover=
      getTooltip={({ object }) => object && `${object.gid}
    Number of trajectories: ${object.number_of_trajectories}
    Number of trajectories starting: ${object.number_of_trajectories_starting}
    Number of trajectories ending: ${object.number_of_trajectories_ending}`}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      <Button variant="contained" color="primary" onClick={() => { changeGird(0) }}>Primary</Button>
    </DeckGL>
  );
}

export default App;