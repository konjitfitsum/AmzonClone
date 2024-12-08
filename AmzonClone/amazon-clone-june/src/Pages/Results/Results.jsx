import React, { useState,useEffect } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from './Results.module.css'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../Api/endPoints';
import axios from 'axios';
import Product from '../../Components/Product/Product';
import ProductCard from '../../Components/Product/ProductCard';
function Results() {
  const [results, setResults] =useState([]);
  const {categoryName} =useParams()
  console.log(categoryName);
  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
      setResults(res.data)
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <LayOut>
        <section>
          <h1 style={{padding:"30px"}}>Results</h1>
          <p style={{padding:"30px"}}>Category / {categoryName}</p>
          <hr />
          <div className={classes.product_container}>
            {results?.map((product) => (
              <ProductCard
              key={Product.id}
              product={product}
              />
            ))}
          </div>
        </section>
    </LayOut>

  )
}

export default Results