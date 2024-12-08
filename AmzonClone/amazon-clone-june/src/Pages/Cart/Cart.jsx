import React, { useContext } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from './Cart.module.css'
import { Link } from 'react-router-dom'
import { DataContext} from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
function Cart() {
  const [{basket,user}, dispatch] = useContext(DataContext);
  const total =basket.reduce((amount,item)=>{
  return  item.price * item.amount + amount
  },0)
  return (

    <LayOut>
       <section className={classes.container}>
        <div>
          <h2>Hello</h2>
          <h2>Your shopping basket</h2>
          <hr />
          {
            basket?.length==0? (<p>Oops ! No item in your cart</p>): (
              basket?.map((item,i) => {
                return <ProductCard
                key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
              })
            )
          }
        </div>
      
          {basket?.length !==0&&(
            <div className={classes.subtotal}>
              <div>
                <p>Subtotal ({basket?.length} items)</p>
                <CurrencyFormat amount={total}/>
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>

              </span>
              <Link to="/payments">Continue to checkout</Link>
            </div>
          )}
    
       </section>
    </LayOut>
   
  )
}

export default Cart