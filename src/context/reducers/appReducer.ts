import {IApp, UPDATE_APP} from "../types";

const initialState : IApp = {
    page : "home"
};

const appReducer = (state = initialState, action: { type: string; payload: IApp; }) => {
    switch (action.type) {
        case UPDATE_APP:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default appReducer;