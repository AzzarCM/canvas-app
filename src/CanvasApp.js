import React from 'react'
import { AppRouter } from "./routers/AppRouter"
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'normalize.css'
import './styles/components/home.css';
import './styles/components/auth.css';
import './styles/components/buttons.css';
import './styles/components/carousel.css';
import './styles/components/cart.css';
import './styles/components/foot.css';
import './styles/components/navbar.css';
import './styles/components/questions.css';
import './styles/components/realated.css';
import './styles/components/related.css';
import './styles/components/selled.css';
import './styles/components/temas.css';
import './styles/components/upload.css';
import './styles/components/header.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export const CanvasApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}
