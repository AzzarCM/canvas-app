import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';
import { cartReducer } from '../reducers/cartReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        
    }
}


const persistedState = loadFromLocalStorage();


const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    cart: cartReducer,
})

export const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);

store.subscribe(()=> saveToLocalStorage(store.getState()))