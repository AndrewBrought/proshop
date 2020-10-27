import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            // This will determine if an item exists or not by mapping through the payload and trying to match
            // the x.product (id) to the item.product (id)
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem) {
                    return {
                        ...state,
                        // we're mapping through the current cartItems, if the current item id is equal to
                        // the existItem id then we return the item for this iteration, else it will be x
                        cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                    }
            } else {
                // if the item doesn't exist, we add it to the array of items
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        default:
            return state
    }

}
