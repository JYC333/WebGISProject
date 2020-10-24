import React from "react"
import useGlobalHook from "use-global-hook"

const initialState = {
    clickInfo: undefined,
    showNetwork: false,
    showTrajectory: false,
    colorAttribute: 1,
    dataset:1,
    cleanSelect: false
}

const actions = {
    setClickInfo: (store, value) => {
        store.setState({ clickInfo: value });
    },
    setShowNetwork: (store, value) => {
        store.setState({ showNetwork: value });
    },
    setShowTrajectory: (store, value) => {
        store.setState({ showTrajectory: value });
    },
    setColorAttribute: (store, value) => {
        store.setState({ colorAttribute: value });
    },
    setDataset: (store, value) => {
        store.setState({ dataset: value });
    },
   setCleanSelect: (store, value) => {
        store.setState({ cleanSelect: value });
    },
}

const useMapEventInfo = useGlobalHook(React, initialState, actions);

export default useMapEventInfo;