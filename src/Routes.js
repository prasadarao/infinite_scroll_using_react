import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import InfiniteScroll from './components/InfiniteScroll'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={InfiniteScroll} />
            </Switch>
        </Router>
    )
}

export default Routes;
    