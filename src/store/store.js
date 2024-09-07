import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { enableBatching } from "redux-batched-actions";

const middleware = [thunk];
const initialState = {};

const store = createStore(
  enableBatching(rootReducer),
  initialState,
  applyMiddleware(...middleware)
);

export default store;
