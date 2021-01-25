import { types } from "../types/types";

export const setError = ( err ) =>({
    type: types.uiSetError,
    payload: err
});

export const removeError = () =>({
    type: types.uiRemoveError, 
});

export const startLoading = ()=>({
    type: types.uiStartLoading
});

export const finisLoading = ()=>({
    type: types.uiFinishLoading
})

export const changeSearchText = ( text ) =>({
    type: types.uiSetNewText,
    payload: text
});