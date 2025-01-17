import {ADD_PEER, IPeer, UPDATE_PEER} from "../types";

const initialState : IPeer = {
    peerID : null,
    // peersConnected : []
};

const peerReducer = (state = initialState, action: { type: string; payload: IPeer; }) => {
    switch (action.type) {
        case UPDATE_PEER:
            return {
                ...state,
                ...action.payload
            };

        // case ADD_PEER:
        //     const currentPeersConnected = state.peersConnected;
        //     curre
        //     return {...state, }
        default:
            return state;
    }
};

export default peerReducer;