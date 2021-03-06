import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL
} from '../constants/orderConstants';
import axios from 'axios';
import {logout} from './userActions';
import {USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS} from '../constants/userConstants';


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
            //was not getting my custom error message because I left out 'data' in the condition of my ternary
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        // HE will probably fix this but in the initial build he didn't include the slash - I did because I don't
        // know of a situation where it wouldn't exist...I was right
        const {data} = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        // based const message section off of final
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}


export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        //Here, I'm wanting to clear the cart after successful purchase, and re-route to thankyou screen
        localStorage.removeItem('cartItems')
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        document.location.href = `/thankyou/${orderId}`




    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
            //was not getting my custom error message because I left out 'data' in the condition of my ternary
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:
            //was not getting my custom error message because I left out 'data' in the condition of my ternary
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.get(`/api/orders`, config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }

        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload:
            //was not getting my custom error message because I left out 'data' in the condition of my ternary
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
