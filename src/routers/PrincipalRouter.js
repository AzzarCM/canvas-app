import React from 'react'
import {
    Switch,
    Route,
    Redirect,
 } 
from 'react-router-dom';
import { PrincipalScreen } from '../components/main/PrincipalScreen';

export const PrincipalRouter = () => {
    return (
        <div className="main__main-container">
            <Switch>
                <Route
                    exact
                    path="/main/home"
                    component={ PrincipalScreen }
                />

                <Redirect to="/main/home"/>
            </Switch>
        </div>
    )
}
