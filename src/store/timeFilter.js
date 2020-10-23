import React from "react"
import useGlobalHook from "use-global-hook"

const initialState = {
    startIndex: 0,
    endIndex: 0,
    startTimestamp: 0,
    endTimestamp: 0
}

const actions = {
    setStartIndex: (store, value) => {
        store.setState({ startIndex: value });
    },
    setEndIndex: (store, value) => {
        store.setState({ endIndex: value });
    },
    setStartTimestamp: (store, value) => {
        store.setState({ startTimestamp: value });
    },
    setEndTimestamp: (store, value) => {
        store.setState({ endTimestamp: value });
    }
}

const useTimeFilter = useGlobalHook(React, initialState, actions);

export default useTimeFilter;