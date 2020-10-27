import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id

    // location.search returns the querystring for qty, ex: ?qty=1
    // .split will create an array of '?qty' at index-0 and '1' at index-1: ['?qty', '1'], then we can just call
    // to return index-1 for the number itself - we wrap it Number to get a number type back
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div>
            Cart
        </div>
    );
}

export default CartScreen;
