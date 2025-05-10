import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/loginReducer';
import rootSaga from './saga/rootSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create Redux store with middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run sagas
sagaMiddleware.run(rootSaga);

export default store;
