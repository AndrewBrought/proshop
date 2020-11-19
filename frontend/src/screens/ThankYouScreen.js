import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails } from '../actions/orderActions';
import FormContainer from '../components/FormContainer';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


const ThankYouScreen = ({ match, history }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if(!order || order._id !== orderId) {

            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId, dispatch, history, userInfo])


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <FormContainer>
                <h1>Thank You For Your Inquiry: </h1>
                <h4>Ref ID: {order._id}</h4>
                <h1>Inquired At: </h1>
                <h4>{order.paidAt.substring(0, 10)}</h4>
                <br/>
                <Link to='/'><Button type='submit' variant='primary'>
                    New Inquiry ?
                </Button></Link>
            </FormContainer>
        </>
}

export default ThankYouScreen;
