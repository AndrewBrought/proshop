import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product'
import axios from 'axios';


const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')

            setProducts(data);
        }
        fetchProducts();
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
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
        </>
    );
}

export default HomeScreen;
