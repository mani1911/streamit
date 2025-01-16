
import { IPeer, UPDATE_PEER } from "../types";
export const updatePeer = (task: IPeer) => {
    return {
        type: UPDATE_PEER,
        payload: task,
    };
};

