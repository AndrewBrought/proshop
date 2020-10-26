import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listProducts} from '../actions/productActions';


const HomeScreen = () => {
    // This makes the request to the backend to get products
    const dispatch = useDispatch();

    // we're calling this whatever we name is in our store.js
    // The use selector grabs products from the state and allows us to pull out what we want ({} = productList)
    const productList = useSelector(state => state.productList);
    // Here we're destructuring our productList object - it's state is handled in our productReducer
    // Here's where we pull out what we want - so we can display it in our output.
    const {loading, error, products} = productList;

    useEffect(() => {
        // This is firing off the action to get the products and send it down into the state
        dispatch(listProducts())

        //    we pass it down here as a dependency
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ?
                <Loader />
                : error ?
                    <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        {/*We want to loop through our products brought in from product.js
                so we use .map() to create a list.
                So we pass in product because we want to show something for each product...for now product.name*/}
                        {products.map(product => (
                            // These are media query classes from react-bootstrap to make this component row screen dynamic
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
            }

        </>
    );
}

export default HomeScreen;
