import React from 'react'
import {
    Switch,
    Route,
    Redirect,
 } 
from 'react-router-dom';
import { Cart } from '../components/cart/Cart';
import { Checkout } from '../components/cart/Checkout';
import { Historial } from '../components/history/Historial';
import { TermsAndCond } from '../components/information/TermsAndCond';
import { PrincipalScreen } from '../components/main/PrincipalScreen';
import { QuestionScreen } from '../components/questions/QuestionScreen';
import { Search } from '../components/search/Search';
import { MostSelledScreen } from '../components/selled/MostSelledScreen';
import { AllThemes } from '../components/temas/AllThemes';
import { TemasScreen } from '../components/temas/TemasScreen';
import { ThemesCategory } from '../components/temas/ThemesCategory';
import { UploadScreen } from '../components/upload/UploadScreen';
import { Garantia } from '../components/information/Garantia'
export const PrincipalRouter = () => {
    return (
        <div>
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
                    path="/main/themes"
                    component={ AllThemes }
                />
                <Route
                    exact
                    path="/main/categoria/:id"
                    component={ ThemesCategory }
                />
                <Route
                    path="/main/imagen/id/:id"
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
                <Route
                    exact
                    path="/main/cart"
                    component = { Cart }
                />
                <Route
                    exact
                    path="/main/checkout"
                    component = { Checkout }
                />
                <Route
                    exact
                    path="/main/history/:id"
                    component = { Historial }
                />
                <Route
                    exact
                    path="/main/search"
                    component = { Search }
                />
                <Route
                    exact
                    path="/main/terms"
                    component = { TermsAndCond }
                />
                <Route
                    exact
                    path="/main/garantia"
                    component = { Garantia }
                />
                <Redirect to="/main/home"/>
            </Switch>
        </div>
    )
}
