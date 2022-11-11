import React from "react"
import {Container} from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import Footer from "./components/Footer";
import Header from "./components/Headar";
import HomeScreen from "./screans/HomeScreen";
import ProductScreen from "./screans/ProductScreen";
import CartScreen from "./screans/CartScreen";
import PageNotFound from "./screans/PageNotFound";

function App() {
  return (
    <>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
            <Route path='/cart/:id' element={<CartScreen/>}/>
            <Route path='/cart' element={<CartScreen/>}/>
            <Route path='/login' element={<HomeScreen/>}/>
            <Route path='/*' element={<PageNotFound/>}/>
          </Routes>
        </Container>
      </main>
      <Footer/> 

    </>
  );
}

export default App;
