import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../context/reducers/rootReducer";

const store = configureStore({ 
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }) 
});

export default store;
export type RootState = ReturnType<typeof store.getState>;