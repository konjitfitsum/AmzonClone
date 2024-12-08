import React, {useState, useContext} from 'react'
import classes from './SignUp.module.css'
import { Link } from 'react-router-dom'
import {auth} from '../../Utility/firebase'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const [error ,setError] = useState("")
  

  const[{user,}, dispatch]=useContext(DataContext)
    console.log(user);
  const authHandler = async(e) =>{
    e.preventDefault()
    console.log(e.target.name); 
    if(e.target.name == "signin"){
        //firebase auth
      signInWithEmailAndPassword(auth,email,password)
      .then((userInfo) => {
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user,
        })
      }).catch((err)=>{
        console.log(err);
      })
    } else{
      createUserWithEmailAndPassword(auth,email,password).then((userInfo) => {
      
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user,
        })
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  
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
              <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" id='email' />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password' />
            </div>
            <button type='submit' onClick={authHandler} name="signin" className={classes.login_signInButton}>Signin</button>
          </form>
        {/* agreement */}
        <p>By signing-in you agree to the AMAZON Fake Clone Conditions of use & Sale.Please see our privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>

        {/* create account btn */}

        <button type='submit' onClick={authHandler} name='signup'  className={classes.login_registerButton}>Create Your Amazon Account</button>
        </div>

      </section> 
    
  
    
  
  )
}

export default Auth