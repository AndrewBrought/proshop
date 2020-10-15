import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product'
import products from '../products';


const HomeScreen = () => {

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {/*We want to loop through our products brought in from product.js
                so we use .map() to create a list.
                So we pass in product because we want to show something for each product...for now product.name*/}
                {products.map(product => (
                    // These are media query classes from react-bootstrap to make this component row screen dynamic
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default HomeScreen;
