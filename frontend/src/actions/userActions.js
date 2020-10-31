import axios from 'axios';
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants';
import {PRODUCT_DETAILS_FAIL} from '../constants/productConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/login',
            {email, password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                //was not getting my custom error message because I left out 'data' in the condition of my ternary
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users',
            { name, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        //This will log the user in right after registration
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // We set to user storage because it's basically the same as logging in (because we are logging them in)
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
            //was not getting my custom error message because I left out 'data' in the condition of my ternary
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.get(
            `/api/users/${id}`, config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
            //was not getting my custom error message because I left out 'data' in the condition of my ternary
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.put(`/api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    //    This is how we handle the name in the navbar updating when we update our name
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
            //was not getting my custom error message because I left out 'data' in the condition of my ternary
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
