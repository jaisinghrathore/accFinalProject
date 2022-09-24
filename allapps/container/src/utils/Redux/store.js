import { createStore } from "redux";
import userReducers from "./reducers/userReducer";

const store = createStore(userReducers);

export default store;
