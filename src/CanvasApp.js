import React from 'react'
import { AppRouter } from "./routers/AppRouter"
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'normalize.css'
import './styles/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export const CanvasApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}
