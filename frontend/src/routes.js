import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//pages
import Login from './pages/Login'
import Profile from './pages/Profile'
import Spots from './pages/Spots'

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/spots" component={Spots}></Route>
            </Switch>
        </BrowserRouter>
    )
}