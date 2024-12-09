import React, {useContext,useState} from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from './Payment.module.css'
import ProductCard from '../../Components/Product/ProductCard'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import {useStripe,useElements,CardElement} from '@stripe/react-stripe-js'
import { GiSmallFire } from 'react-icons/gi'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
function Payment() {
  const [{user,basket}] = useContext(DataContext);
  console.log(user);
  const totalItem =basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0)

  const total =basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  })
  const [cardError, setCardError] =useState(null)
  const stripe = useStripe();
  const elements = useElements();
  const handleChange =(e)=>{
    console.log(e);
    e?.error?.message? setCardError(e?.error?.message):setCardError("")
  };
  return (
    <LayOut>
      {/* header */}
       <div className={classes.payment__header}>Checkout({totalItem}) items</div>
       {/* payment method */}
       <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React lane</div>
            <div>NewYork, Il</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div className={classes.flex}>
            {
              basket?.map((item)=>( <ProductCard product={item} flex={true}/>)
            )}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form action="">
                {/* error */}
                {cardError && <small style={{color:"red"}}>{cardError}</small>}
                {/* card element */}
                  <CardElement onChange={handleChange}/>

                  {/* price */}
                  <div className={classes.payment__price}>
                    <div>
                      <span style={{display:"flex",  gap:"10px"}}>
                        <p>Total Order |</p> <CurrencyFormat amount={total}/> </span>
                    </div>
                    <button>Pay Now</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
       </section>
    </LayOut>

  )
}

export default Payment

