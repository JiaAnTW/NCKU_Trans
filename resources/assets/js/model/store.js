import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducer/index";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( reducers, composeEnhancers(applyMiddleware(thunk))); 

export { store };