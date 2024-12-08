import React from 'react'
import classes from './SignUp.module.css'
import { Link } from 'react-router-dom'
function Auth() {
  return (
      <section className={classes.login}> 
        {/* logo */}
        <Link>
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG1.png" alt="amazon logo" />
        </Link>
        {/* form */}
        <div className={classes.login_container}>
          <h1>Sign-in</h1>
          <form action="">
            <div >
              <label htmlFor="email">Email</label>
              <input type="email" id='email' />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' />
            </div>
            <button className={classes.login_signInButton}>Signin</button>
          </form>
        {/* agreement */}
        <p>By signing-in you agree to the AMAZON Fake Clone Conditions of use & Sale.Please see our privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>

        {/* create account btn */}

        <button className={classes.login_registerButton}>Create Your Amazon Account</button>
        </div>

      </section> 
    
  
    
  
  )
}

export default Auth