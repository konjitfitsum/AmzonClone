import React from 'react'
import classes from './Header.module.css'
import { SlLocationPin } from 'react-icons/sl'
import {BsSearch} from "react-icons/bs"
import { BiCart } from "react-icons/bi"
import LowerHeader from './LowerHeader'
import { Link } from 'react-router-dom'


const Header = ()=>{
    return(
        <>
        <section>
            <div className={classes.header_container}>
                {/* logo section */}
                <div className={classes.logo_container}>
                    <Link to="/">
                        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
                    </Link>
                    <div className={classes.delivery}>
                        <span>
                            <SlLocationPin />
                        </span>
                        <div>
                            <p>Deliver to</p>
                            <span>Usa</span>
                        </div>
                    </div>
                </div>
                {/* search section */}
                <div className={classes.search}>
                    <select name="" id="">
                        <option value="">All</option>
                    </select>
                    <input type="text" />
                    <BsSearch size={25}/>
                </div>
                {/* other section */}
                <div className={classes.order_container}>
                    <Link to="" className={classes.language}>
                        <img src="https://pngimg.com/uploads/flags/flags_PNG14655.png" alt="" />
                        <select name="" id="">
                            <option value="">EN</option>
                        </select>
                    </Link>
                    <Link to ="">
                        <p>Sign In</p>
                        <span>Account & Lists</span>
                    </Link>
                    <Link to ="/orders">
                        <p>returns</p>
                        <span>& Orders</span>
                    </Link>
                    <Link to="/cart" className={classes.cart}>
                        <BiCart size={35} />
                        <span>0</span>
                    </Link>
                </div>
            </div>
        </section>
        <LowerHeader/>
  </>
    )
}
export default Header;


// const Header = () => {
//     return (
//       <>
//         <section>
//           <div className={classes.header_container}>
//             {/* Logo Section */}
//             <div className={classes.logo_container}>
//               <Link to="/">
//                 <img
//                   src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
//                   alt="Amazon logo"
//                 />
//               </Link>
//               <div className={classes.delivery}>
//                 <span>
//                   <SlLocationPin />
//                 </span>
//                 <div>
//                   <p>Deliver to</p>
//                   <span>USA</span>
//                 </div>
//               </div>
//             </div>
//             {/* Search Section */}
//             <div className={classes.search}>
//               <select name="categories" id="categories">
//                 <option value="all">All</option>
//               </select>
//               <input type="text" placeholder="Search..." />
//               <BsSearch size={25} />
//             </div>
//             {/* Other Sections */}
//             <div className={classes.order_container}>
//               {/* Language Selector */}
//               <Link to="#" className={classes.language}>
//                 <img
//                   src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
//                   alt="US flag"
//                 />
//                 <select name="language" id="language">
//                   <option value="en">EN</option>
//                 </select>
//               </Link>
//               {/* Account Section */}
//               <Link to="#">
//                 <p>Sign In</p>
//                 <span>Account & Lists</span>
//               </Link>
//               {/* Orders Section */}
//               <Link to ="/orders">
//                 <p>Returns</p>
//                 <span>& Orders</span>
//               </Link>
//               {/* Cart Section */}
//               <Link to="/cart" className={classes.cart}>
//                 <BiCart size={35} />
//                 <span>0</span>
//               </Link>
//             </div>
//           </div>
//         </section>
//         {/* Lower Header Section */}
//         <LowerHeader />
//       </>
//     );
//   };
  
//   export default Header;