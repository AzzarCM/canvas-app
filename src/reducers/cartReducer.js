
import { act } from "react-dom/test-utils"
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

            var addedItem = state.items.find(item=>item.id == action.id)
            var existed_item= state.addedItems.find(item=> action.id == item.id)

            if(existed_item)
            {
            if(existed_item.material != action.material || existed_item.material == action.material){
                const new_id = Math.floor(Math.random() * 10000) + 1000;
                addedItem.id = new_id;
                addedItem.price = action.price;
                addedItem.material = action.material;
                addedItem.material_id = action.material_id;
                addedItem.medidas = action.medidas;
                addedItem.quantity = 1;
                var new_total = state.total + parseFloat(action.price);
                return{
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total: new_total,
                }
            }
            addedItem.quantity += 1
            addedItem.price = action.price; 
            
             return{
                ...state,
                 total: state.total + parseFloat(addedItem.price)
                  }
            }
         else{

            addedItem.price = action.price;
            addedItem.material = action.material;
            addedItem.material_id = action.material_id;
            addedItem.medidas = action.medidas;
            addedItem.quantity = 1;
            //calculating the total
            var newTotal = state.total + parseFloat(addedItem.price)
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
        
        case types.ADD_QUANTITY:
            var addedItem = state.addedItems.find(item=> item.id == action.id);
            addedItem.quantity += 1
            var newTotal = state.total + parseFloat(addedItem.price)
            return{
                ...state,
                total: newTotal
            }
        case types.SUB_QUANTITY:
            var addedItem = state.addedItems.find(item=> item.id == action.id);
            //if the qt == 0 then it should be removed
            if(addedItem.quantity === 1){
                var new_items = state.addedItems.filter(item=>item.id != action.id)
                var newTotal = state.total - addedItem.price
                return{
                    ...state,
                    addedItems: new_items,
                    total: newTotal
                }
            }
            else {
                addedItem.quantity -= 1
                var newTotal = state.total - addedItem.price
                return{
                    ...state,
                    total: newTotal
                }
            }
        case types.REMOVE_ITEM:
            let itemToRemove= state.addedItems.find(item=> action.id == item.id)
            var new_items = state.addedItems.filter(item=> action.id != item.id)
            
            //calculating the total
            var newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        case types.LOG_OUT:
            return {
                ...state,
                addedItems: [],
                total: 0
            }
        case types.CHANGE_TOTAL:
            return {
                ...state,
                total: action.payload
            }
        default:
            return state
    }
}