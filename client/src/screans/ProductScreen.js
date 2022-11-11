import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { listProductDetails } from '../redux/actions/productActions'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history }) => {
  const [qty, setQty] = useState(1)
  const { id } = useParams()
  let navigate = useNavigate();
  
  const dispatch = useDispatch()
  
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch])

  const addToCartHandler = () => {
   navigate({
        pathname: `/cart/${id}`,
        search: `?qty=${qty}`,
    });
  }

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>

      {loading
        ? <Loader />
        : error
        ? <Message>{error}</Message>
        : (
            <Row>
              <Col md={6} >
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <h2>{product.name}</h2>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Rating
                      value={product.rating}
                      text={` from ${product.numReviews} revie`} />
                  </ListGroupItem>

                  <ListGroupItem>Price: ${product.price}</ListGroupItem>

                  <ListGroupItem>Description: {product.description}</ListGroupItem>

                </ListGroup>
              </Col>

              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroupItem>
                      <Row>
                        <Col>
                          Price:
                        </Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                      <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                          {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroupItem>

                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <FormControl as='select' value={qty}
                              onChange={(e) => {
                                setQty(e.target.value)
                              }}>
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                              ))}
                            </FormControl>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )}

                    <ListGroupItem>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </ListGroupItem>

                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
    </div>
  )
}

export default ProductScreen
