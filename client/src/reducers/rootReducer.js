import { combineReducers } from 'redux';

import filmReducer from './filmReducer';
import importedFilmDataReducer from './importedFilmDataReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  films: filmReducer,
  importedData: importedFilmDataReducer,
  user: userReducer,
});

export default rootReducer;
