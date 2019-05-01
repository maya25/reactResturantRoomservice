import { applyMiddleware, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import epics from './epics';
import rootReducer from './reducers';
import api from './utils/api';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootEpic = combineEpics(...epics);
const epicMiddleware = createEpicMiddleware({
  dependencies: { api }
});

export default createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);
