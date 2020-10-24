import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { PathLayer, GridCellLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

import useTimeFilter from './store/timeFilter';
import useMaxValue from './store/maxValue';
import useMapEventInfo from './store/mapEventInfo';

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

  const [gridData1, setGridData1] = useState();
  const [trajectoryData1, setTrajectoryData1] = useState();

  const [filteredGirdData, setFilteredGirdData] = useState();
  const [filteredTrajectoryData, setFilteredTrajectoryData] = useState();

  const [timeFilterState, timeFilterActions] = useTimeFilter();
  const [maxValueState, maxValueActions] = useMaxValue();
  const [mapEventInfoState, mapEventInfoActions] = useMapEventInfo();
  const clickInfo = mapEventInfoState.clickInfo;

  const [gridSequence, setGridSequence] = useState();

  const layers = [
    new GridCellLayer({
      id: 'NetworkGrid',
      data: filteredGirdData,
      visible: true,
      extruded: false,
      autoHighlight: true,
      pickable: true,
      stroked: true,
      filled: true,
      cellSize: 450,
      getElevation: 0,
      getPosition: d => d.contour,
      getFillColor: d => {
        if (mapEventInfoState.colorAttribute === 1) {
          if (d.trajectories && d.trajectories.length !== 0) {
            return [d.trajectories.length * 255 / maxValueState.maxTrajectory, 140, 0];
          }
          else {
            return [0, 140, 0];
          }
        } else if (mapEventInfoState.colorAttribute === 2) {
          if (d.trajectories_start && d.trajectories_start.length !== 0) {
            return [140, d.trajectories_start.length * 255 / maxValueState.maxTrajectoryStart, 0];
          }
          else {
            return [0, 140, 0];
          }
        } else if (mapEventInfoState.colorAttribute === 3) {
          if (d.trajectories_end && d.trajectories_end.length !== 0) {
            return [0, 140, d.trajectories_end.length * 255 / maxValueState.maxTrajectoryEnd,];
          }
          else {
            return [0, 140, 0];
          }
        }
      },
      getLineColor: [0, 0, 0],
      getLineWidth: 0,
      onClick: info => mapEventInfoActions.setClickInfo(info)
    }),
    new GridCellLayer({
      id: 'GridSequence',
      data: gridSequence,
      visible: true,
      extruded: false,
      autoHighlight: true,
      pickable: false,
      stroked: true,
      filled: true,
      cellSize: 450,
      getElevation: 0,
      getPosition: d => d.contour,
      getFillColor: d => [0, 255, 255],
      getLineColor: [0, 0, 0],
      getLineWidth: 0,
    }),
    new PathLayer({
      id: 'RoadNetwork',
      data: networkData,
      visible: mapEventInfoState.showNetwork,
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
      visible: mapEventInfoState.showTrajectory,
      autoHighlight: true,
      pickable: true,
      widthScale: 20,
      widthMinPixels: 2,
      getPath: d => d.coordinates,
      getColor: [235, 152, 107],
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

    fetch('http://localhost:9000/girdData1', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8;'
      }
    })
      .then(res => res.json())
      .then(data => {
        setGridData1(data.features);
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

    fetch('http://localhost:9000/trajectoryData', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8;'
      }
    })
      .then(res => res.json())
      .then(data => {
        setTrajectoryData(data.features);
      });

    fetch('http://localhost:9000/trajectoryData1', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8;'
      }
    })
      .then(res => res.json())
      .then(data => {
        setTrajectoryData1(data.features);
      });
  }, []);

  useEffect(() => {
    if (mapEventInfoState.dataset === 1) {
      setFilteredGirdData(gridData);
      if (gridData) {
        maxValueActions.setMaxTrajectory(Math.max.apply(Math, gridData.map(o => o.trajectories ? o.trajectories.length : 0)));
        maxValueActions.setMaxTrajectoryStart(Math.max.apply(Math, gridData.map(o => o.trajectories_start ? o.trajectories_start.length : 0)));
        maxValueActions.setMaxTrajectoryEnd(Math.max.apply(Math, gridData.map(o => o.trajectories_end ? o.trajectories_end.length : 0)));
      }
    } else if (mapEventInfoState.dataset === 2) {
      setFilteredGirdData(gridData1);
      if (gridData1) {
        maxValueActions.setMaxTrajectory(Math.max.apply(Math, gridData1.map(o => o.trajectories ? o.trajectories.length : 0)));
        maxValueActions.setMaxTrajectoryStart(Math.max.apply(Math, gridData1.map(o => o.trajectories_start ? o.trajectories_start.length : 0)));
        maxValueActions.setMaxTrajectoryEnd(Math.max.apply(Math, gridData1.map(o => o.trajectories_end ? o.trajectories_end.length : 0)));
      }
    }

  }, [mapEventInfoState.dataset, gridData]);

  useEffect(() => {
    if (mapEventInfoState.dataset === 1) {
      setFilteredTrajectoryData(trajectoryData);
    } else if (mapEventInfoState.dataset === 2) {
      setFilteredTrajectoryData(trajectoryData1);
    }
  }, [mapEventInfoState.dataset, trajectoryData])

  useEffect(() => {
    if (clickInfo) {
      fetch('http://localhost:9000/gridSequence', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8;'
        },
        body: clickInfo.object.gid
      })
        .then(res => res.json())
        .then(data => {
          setGridSequence(data.sequence_of_grids);
        });
    };
  }, [clickInfo]);

  function changeGridTime(gridData, startTime, endTime) {
    let data = [].concat(JSON.parse(JSON.stringify(gridData)));
    data = data.map(d => {
      if (d.trajectories) {
        d.trajectories = d.trajectories.filter(d => (d >= startTime) && (d <= endTime));
      }
      if (d.trajectories_start) {
        d.trajectories_start = d.trajectories_start.filter(d => (d >= startTime) && (d <= endTime));
      }
      if (d.trajectories_end) {
        d.trajectories_end = d.trajectories_end.filter(d => (d >= startTime) && (d <= endTime));
      }
      return d;
    }).filter(d => (d.trajectories != 0) && d.trajectories);
    setFilteredGirdData(data);
  };

  useEffect(() => {
    if (timeFilterState.endIndex > maxValueState.maxIndex) {
      maxValueActions.setMaxIndex(timeFilterState.endIndex);
    }
  });

  useEffect(() => {
    if (mapEventInfoState.dataset === 1) {
      if (gridData) {
        changeGridTime(gridData, timeFilterState.startTimestamp, timeFilterState.endTimestamp);
      }
    } else if (mapEventInfoState.dataset === 2) {
      if (gridData1) {
        changeGridTime(gridData1, timeFilterState.startTimestamp, timeFilterState.endTimestamp);
      }
    }
  }, [timeFilterState.startTimestamp, timeFilterState.endTimestamp, mapEventInfoState.colorAttribute]);

  useEffect(() => {
    setGridSequence(null);
  }, [mapEventInfoState.cleanSelect])

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      // onHover=
      getTooltip={
        ({ object }) => object && `gid: ${object.gid}
        Number of trajectories: ${object.trajectories ? object.trajectories.length : 0}
        Number of trajectories starting: ${object.trajectories_start ? object.trajectories_start.length : 0}
        Number of trajectories ending: ${object.trajectories_end ? object.trajectories_end.length : 0}`
      }
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default App;