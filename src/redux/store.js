import { createStore, applyMiddleware } from "redux";
// import { logger } from "redux-logger";
// import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducer";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

var middlewares = [];

const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
