import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import Room from './Room';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <p>Home page</p>
                    </Route>
                    <Route exact path="/join" component={JoinRoom}/>
                    <Route exact path="/create" component={CreateRoom}/>
                    <Route path="/room/:roomCode" component={Room}/>
                </Switch>
            </Router>
        )
    }
}
