import axios from 'axios';
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants';

// dispatch comes from thunk
// we're saving our cart to local storage, so we pass getState - which allows us to get our entire state tree
// so anything we want, productList, productDetails, cart etc. we can grab get with: getState. ...
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // This allows us to save the return in our local storage, we call getState().cart to save the entire cart and
    // tack on .cartItems to get all the items from the cart
    // This gives us a JS object so we call JSON.stringify because we can only save strings in local storage -
    // to pull out the values we'll have to use JSON.parse to parse it back to JS
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}
