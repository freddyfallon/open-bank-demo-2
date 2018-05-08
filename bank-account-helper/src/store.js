import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import auth from './reducers/getTokenReducer';
import transactions from './reducers/getTransactionReducer';

export default createStore(
  combineReducers({ auth, transactions }),
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
