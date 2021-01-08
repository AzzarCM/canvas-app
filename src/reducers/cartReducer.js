
import {types} from "../types/types"

const initialState = {
    items: [],
    addedItems: [],
    total: 0
}
   


export const cartReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.FILL_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case types.ADD_TO_CART:
            let addedItem = state.items.find(item=>item.id == action.id)
            
            let existed_item= state.addedItems.find(item=> action.id == item.id)
        
            if(existed_item)
            {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + parseFloat(addedItem.price)
                  }
            }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + parseFloat(addedItem.price)
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }

        default:
            return state
    }
}