import React from 'react'
import {
    Switch,
    Route,
    Redirect,
 } 
from 'react-router-dom';
import { PrincipalScreen } from '../components/main/PrincipalScreen';
import { QuestionScreen } from '../components/questions/QuestionScreen';
import { MostSelledScreen } from '../components/selled/MostSelledScreen';
import { TemasScreen } from '../components/temas/TemasScreen';
import { UploadScreen } from '../components/upload/UploadScreen';

export const PrincipalRouter = () => {
    return (
        <div className="main__main-container">
            <Switch>
                <Route
                    exact
                    path="/main/home"
                    component={ PrincipalScreen }
                />
                <Route
                    exact
                    path="/main/most-selled"
                    component={ MostSelledScreen }
                />
                <Route
                    exact
                    path="/main/themes"
                    component={ TemasScreen }
                />
                <Route
                    exact
                    path="/main/upload"
                    component={ UploadScreen }
                />
                <Route
                    exact
                    path="/main/faq"
                    component={ QuestionScreen }
                />
                <Redirect to="/main/home"/>
            </Switch>
        </div>
    )
}
