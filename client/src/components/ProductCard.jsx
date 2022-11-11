import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const ProductCard = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
        </Link>

        <Card.Title as='div'>
            <Link to={`/product/${product._id}`} >
                <strong>{product.name}</strong>
            </Link>
        </Card.Title>
        
        <Card.Text as='div'>
            <Rating 
                value={product.rating} 
                text={` from ${product.numReviews} revie`}/> 
        </Card.Text>

        <Card.Text as='h3'>
            ${product.price}
        </Card.Text>
    </Card>
  )
}

export default ProductCard
