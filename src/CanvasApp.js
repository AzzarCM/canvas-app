import React from 'react'
import { AppRouter } from "./routers/AppRouter"
import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'


export const CanvasApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}
