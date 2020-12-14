import React from 'react'
import {
    Switch,
    Route,
    Redirect,
 } 
from 'react-router-dom' 
//screens
import { LoginScreen } from "../components/Auth/LoginScreen";
import { RegisterScreen } from "../components/Auth/RegisterScreen";

export const AuthRouter = () => {
    return (
        <div className="auth__main-container">
            <Switch>
                <Route
                    exact
                    path="/auth/login"
                    component= { LoginScreen }
                />
                <Route
                    exact
                    path="/auth/register"
                    component= { RegisterScreen }
                />
                <Redirect to="/auth/login"/>
            </Switch>
        </div>
    )
}
