import {createStore,applyMiddleware} from 'redux'

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducers from '../reducers/appReducer.jsx'

import createSocketMiddleware from '../middlewates/socket'


export default function configureStore(socket,initialState) {
    var socketMiddleware = createSocketMiddleware(socket);
    const store = createStore(appReducers, initialState, composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        createLogger,
        socketMiddleware
    )));
    if (module.hot) {
        module.hot.accept('../reducers/appReducer.jsx', () => {
            const nextRootReducer = require('../reducers/appReducer.jsx');
            store.replaceReducer(nextRootReducer);
        });
    }
  //  appService(store,socket);
    return store;
}
