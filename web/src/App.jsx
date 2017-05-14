import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import configureStore from './core/store/appStore.jsx'
import AppContainer from './core/routers/appRouter.jsx';

import 'font-awesome/css/font-awesome.css'
import './core/style/common.scss'
import {securityService} from './security/services/securityService.jsx'
import io from 'socket.io-client'

window.socket = io.connect('http://localhost:81');
window.socket.on('connect',function(){
    var currentUser = securityService.getCurrentUserInfo();
    if (currentUser) {
        window.socket.emit('userRefreshView',currentUser);
    }
});

var store = configureStore(window.socket);


ReactDOM.render(
    <Provider store={store}>
        <HashRouter basename="/">
            <AppContainer/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
