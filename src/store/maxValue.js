import React from "react"
import useGlobalHook from "use-global-hook"

const initialState = {
    maxIndex: 0,
    maxTrajectory: 0,
    maxTrajectoryStart: 0,
    maxTrajectoryEnd: 0
}

const actions = {
    setMaxIndex: (store, value) => {
        store.setState({ maxIndex: value });
    }, 
    setMaxTrajectory: (store, value) => {
        store.setState({ maxTrajectory: value });
    },
    setMaxTrajectoryStart: (store, value) => {
        store.setState({ maxTrajectoryStart: value });
    },
    setMaxTrajectoryEnd: (store, value) => {
        store.setState({ maxTrajectoryEnd: value });
    },

}

const useMaxValue = useGlobalHook(React, initialState, actions);

export default useMaxValue;