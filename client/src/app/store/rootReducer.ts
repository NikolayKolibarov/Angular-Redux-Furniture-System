import { combineReducers } from 'redux';

import { IAppState } from './IAppState';

import authenticationReducer from './authentication';
import furnitureReducer from './furniture';

const reducers = {
  authentication: authenticationReducer,
  furniture: furnitureReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

