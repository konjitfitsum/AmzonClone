// import React, {useContext,useState} from 'react'
// import LayOut from '../../Components/LayOut/LayOut'
// import classes from './Payment.module.css'
// import ProductCard from '../../Components/Product/ProductCard'
// import { DataContext } from '../../Components/DataProvider/DataProvider'
// import {useStripe,useElements,CardElement} from '@stripe/react-stripe-js'
// import { GiSmallFire } from 'react-icons/gi'
// import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
// import { axiosInstance } from '../../Api/axios';
// import {ClipLoader } from'react-spinners'
// import { db } from '../../Utility/firebase'
// function Payment() {
//   const [{user,basket}] = useContext(DataContext);
//   console.log(user);
//   const totalItem =basket?.reduce((amount, item) => {
//     return item.amount + amount;
//   }, 0)

//   const total =basket?.reduce((amount, item) => {
//     return item.price * item.amount + amount;
//   })
//   const [cardError, setCardError] =useState(null)
//   const [processing, setProcessing] = useState(false);


//   const stripe = useStripe();
//   const elements = useElements();
//   const handleChange =(e)=>{
//     console.log(e);
//     e?.error?.message? setCardError(e?.error?.message):setCardError("")
//   };
//   //step1 backend || function ...> contact to the client secret

      
//   const handlePayment = async (e) => {
//       e.preventDefault();

//       try{
//         setProcessing(true);
//           // step1 backend || function ...> contact to the client secret
//         const response =await axiosInstance ({
//           method: 'POST',
//           url : `/payment/create?total=${total * 100}`,
//         });

//         console.log(response.data);

//         const clientSecret = response.data?.clientSecret;
// // step2 client side react side confirmation
//         const {paymentIntent} = await stripe.confirmCardPayment(
//           clientSecret, 
//           {
//             payment_method:{
//               card: elements.getElement(CardElement)
//             },
//           }
//         )
//         console.log(paymentIntent);
//           // step3 after the confirmation ...> order firebase database save, clear basket...

//           await db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
//             basket:basket,
//             amount:paymentIntent.amount,
//             created:paymentIntent.created,
//           })
//         setProcessing(false);
//       }catch (error) {}
//       setProcessing(false);
      
    
      

      

//   }
//   return (
//     <LayOut>
//       {/* header */}
//        <div className={classes.payment__header}>Checkout({totalItem}) items</div>
//        {/* payment method */}
//        <section className={classes.payment}>
//         {/* address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123 React lane</div>
//             <div>NewYork, Il</div>
//           </div>
//         </div>
//         <hr />

//         {/* product */}
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div className={classes.flex}>
//             {
//               basket?.map((item)=>( <ProductCard product={item} flex={true}/>)
//             )}
//           </div>
//         </div>
//         <hr />

//         {/* card form */}
//         <div className={classes.flex}>
//           <h3>Payment methods</h3>
//           <div className={classes.payment__card__container}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlePayment}>
//                 {/* error */}
//                 {cardError && <small style={{color:"red"}}>{cardError}</small>}
//                 {/* card element */}
//                   <CardElement onChange={handleChange}/>

//                   {/* price */}
//                   <div className={classes.payment__price}>
//                     <div>
//                       <span style={{display:"flex",  gap:"10px"}}>
//                         <p>Total Order |</p> <CurrencyFormat amount={total}/> </span>
//                     </div>
//                     <button type='submit'>
//                       {
//                         processing?(
//                           <div className={classes.loading}>
//                           <ClipLoader color="gray" size={12}/>
//                           <p>Please wait ...</p>
//                           </div>
//                         ):"Pay Now"
//                       }
                      
//                       </button>
//                   </div>
//               </form>
//             </div>
//           </div>
//         </div>
//        </section>
//     </LayOut>

//   )
// }

// export default Payment



import React, { useContext, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Payment.module.css';
import ProductCard from '../../Components/Product/ProductCard';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { GiSmallFire } from 'react-icons/gi';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0) || 0;
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0) || 0;

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e?.error?.message || '');
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCardError('Stripe is not properly initialized.');
      return;
    }

    try {
      setProcessing(true);

      const response = await axiosInstance({
        method: 'POST',
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      if (!clientSecret) {
        throw new Error('Unable to retrieve client secret.');
      }

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setProcessing(false);
        navigate('/orders',{state: {msg: "you have placed new order..."}});
      // Reset basket or redirect user as needed
      console.log('Payment successful:', paymentIntent);
    } catch (error) {
      console.error('Payment failed:', error);
      setCardError(error.message || 'An unexpected error occurred.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>New York, IL</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div className={classes.flex}>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: 'red' }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: 'flex', gap: '10px' }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      'Pay Now'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
