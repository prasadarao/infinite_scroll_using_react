import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import InfiniteScrollSingle from './components/InfiniteScrollSingle'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={InfiniteScrollSingle} />
            </Switch>
        </Router>
    )
}

export default Routes;
    