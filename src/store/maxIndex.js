import React from "react"
import useGlobalHook from "use-global-hook"

const initialState = {
    maxIndex: 0,
}

const actions = {
    setMaxIndex: (store, value) => {
        store.setState({ maxIndex: value });
    }
}

const useMaxIndex = useGlobalHook(React, initialState, actions);

export default useMaxIndex;