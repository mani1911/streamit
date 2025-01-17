import {PeerAction, IPeer, UPDATE_PEER, ADD_PEER, REMOVE_PEER} from "../types";

const initialState : IPeer = {
    peerID : null,
    peersConnected : []
};

const peerReducer = (state = initialState, action: PeerAction): IPeer => {
    switch (action.type) {
        case UPDATE_PEER:
            return {
                ...state,
                peerID : action.payload
            };
        
        case ADD_PEER:

            const newPeersConnected = new Array(...state.peersConnected);
            if(action.payload !== null && !newPeersConnected.includes(action.payload)) newPeersConnected.push(action.payload);
            return {
                ...state,
                peersConnected : newPeersConnected
            }   
        
        case REMOVE_PEER:
            var ind = -1;
            const peersConnected = new Array(...state.peersConnected);

            ind = peersConnected.indexOf(action.payload);
            if (ind > -1) { 
                peersConnected.splice(ind, 1); 
            }
            return {
                ...state,
                peersConnected : peersConnected
            }  
            // if(peersConnected.includes(action.payload)) peersConnected.
        default:
            return state;
    }
};

export default peerReducer;