import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem, NavItem, FormControl } from "react-bootstrap"
import { addToCart , removeFromCart } from '../redux/actions/cartActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CartScreen = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get('qty'));
  let navigate = useNavigate();

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id) =>{
    dispatch(removeFromCart(id))
  }
  const checkOutHandler = () =>{

  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart </h1>
        {
          cartItems.length === 0
            ? <Message>
              Your cart is empty <Link to='/'>Go back</Link>
              </Message>
            : (
              <ListGroup variant='flush'>
                {cartItems.map(item => (
                  <ListGroupItem key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>

                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>

                      <Col md={2}>
                        $ {item.price}
                      </Col>

                      <Col md={2}>
                        <FormControl as='select'
                          value={item.qty} onChange={(e) => {
                            dispatch(addToCart(item.product ,Number(e.target.value)))
                          }}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))}
                        </FormControl>
                      </Col>

                      <Col md={2}>
                        <Button type='button' variant='light'
                            onClick={() => removeFromCartHandler(item.product)} > 
                                <i className='fas fa-trash'></i>
                        </Button>
                      </Col>

                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )
        }
      </Col>

      <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>
                        Subtotal {cartItems.reduce((accum , item) => accum+item.qty , 0)} items
                    </h2>
                    ${cartItems.reduce((acc, item) => acc + item.qty*item.price ,0).toFixed(2)} 
                </ListGroupItem>
                <ListGroupItem>
                    <Button 
                        type = 'button' 
                        className = 'btn-block'
                        disabled = {cartItems.length === 0}
                        onClick = {checkOutHandler()}>
                            Proced to Checkout
                    </Button>
                </ListGroupItem>
            </ListGroup>
        </Card>
      </Col>

    </Row>
  )
}

export default CartScreen
