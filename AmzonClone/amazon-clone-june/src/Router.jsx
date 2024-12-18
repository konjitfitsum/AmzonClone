
import React from 'react'
import { BrowserRouter as Router , Routes ,Route  } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Results from './Pages/Results/Results'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

const stripePromise = loadStripe('pk_test_51QTs32G3EIiKe2ajMqOjCr6xsHoXN7Lb6I8lcRjXz91BjN4f6YYj6g8lp8X48uCGdg08WFv3Cg5WWPvMaClK9A6Z00EI85leQ2');

function Routing() {

  return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path='/auth' element={<Auth/>} />
                <Route path="/payments" element={
                    <ProtectedRoute msg={"Please login to checkout"} redirect={"/payments"}>
                      <Elements stripe={stripePromise}>
                    <Payment/>
                    </Elements>   
                    </ProtectedRoute>
                   
                    } />
                <Route path="/orders" element={
                    <ProtectedRoute 
                        msg={"you must be logged in to view your orders."}
                        redirect={"/orders"}
                    >
                        <Orders/>
                    </ProtectedRoute>
                   } />
                <Route path='/category/:categoryName' element={<Results/>}/>
                <Route path='/products/:productId' element={<ProductDetail/>}/>
                <Route path="/cart" element={<Cart/>} />
            </Routes>
        </Router>
);
}

export default Routing;