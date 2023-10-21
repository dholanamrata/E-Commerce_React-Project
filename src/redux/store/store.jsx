import { applyMiddleware, legacy_createStore } from "redux";
import reducers from "../reducers/combinereducers";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";

const store = legacy_createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))
export default store;
