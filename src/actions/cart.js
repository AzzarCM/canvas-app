import { types } from "../types/types";

export const fillItems = ( items ) =>({
    type: types.FILL_ITEMS,
    payload: items
});

export const addToCart = ( id, price, material, material_id, medidas )=>({
    type: types.ADD_TO_CART,
    id,
    price,
    material,
    material_id,
    medidas,
});

//remove item action
export const removeItem=(id)=>{
    return{
        type: types.REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: types.SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity=(id)=>{
    return{
        type: types.ADD_QUANTITY,
        id
    }
}

export const emptyCart = ()=>{
    return {
        type: types.LOG_OUT
    }
}

export const changeTotal = (total) =>{
    return{
        type: types.CHANGE_TOTAL,
        payload: total
    }
}
