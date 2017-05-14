import React from 'react'
import {
    HashRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
import Bundle from '../components/bundle';
import app from 'bundle-loader?lazy!../components/app.jsx'

const App = () => (
    <Bundle load={app}>
        {(App) => <App />}
    </Bundle>
);
const BasicExample = ({socket}) => (
    <Router>
        <div>
            <Redirect from='/' to='/app'/>
            <Route path="/app" component={App}/>
        </div>
    </Router>
);

export default BasicExample