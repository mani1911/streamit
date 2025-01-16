import {combineReducers} from "redux";
import peerReducer from "./peerReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({peer: peerReducer, app : appReducer});

export default rootReducer