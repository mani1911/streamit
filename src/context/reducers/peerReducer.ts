import {IPeer, UPDATE_PEER} from "../types";

const initialState : IPeer = {
    peerID : null,
    peer: null
};

const peerReducer = (state = initialState, action: { type: string; payload: IPeer; }) => {
    switch (action.type) {
        case UPDATE_PEER:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default peerReducer;