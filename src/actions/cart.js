import { types } from "../types/types";

export const fillItems = ( items ) =>({
    type: types.FILL_ITEMS,
    payload: items
});

export const addToCart = ( id )=>({
    type: types.ADD_TO_CART,
    id
})