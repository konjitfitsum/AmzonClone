
import React from 'react'
import { BrowserRouter as Router , Routes ,Route  } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import SignIn from './Pages/Auth/SignUp'
import Payment from './Pages/Payment/Payment'
import Results from './Pages/Results/Results'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
function Routing() {
  return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path='/auth' element={<SignIn/>} />
                <Route path="/payment" element={<Payment/>} />
                <Route path="/orders" element={<Orders/>} />
                <Route path='/category/:categoryName' element={<Results/>}/>
                <Route path="/cart" element={<Cart/>} />
            </Routes>
        </Router>
);
}

export default Routing;