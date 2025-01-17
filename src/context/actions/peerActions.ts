
import { IPeer, PeerAction, UPDATE_PEER, ADD_PEER } from "../types";
export const updatePeer = (task: string): PeerAction  => {
    return {
        type: UPDATE_PEER,
        payload: task,
    };
};

export const addPeersConnection = (peerID : string): PeerAction => {
    return {
        type: ADD_PEER,
        payload : peerID
    }
}

