
import { REMOVE_PEER, PeerAction, UPDATE_PEER, ADD_PEER, ADD_TO_QUEUE } from "../types";
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

export const removePeersConnection = (peerID : string): PeerAction => {
    return {
        type: REMOVE_PEER,
        payload : peerID
    }
}

export const addSongtoQueue = (audio : Uint8Array<ArrayBuffer>): PeerAction => {
    console.log(audio)
    return {
        type: ADD_TO_QUEUE,
        payload : audio
    }
}


