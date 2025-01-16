
import { IApp, UPDATE_APP } from "../types";
export const updateApp = (payload: IApp) => {
    return {
        type: UPDATE_APP,
        payload: payload,
    };
};

