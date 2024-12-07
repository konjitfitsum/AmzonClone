import React from 'react'
import {categoryInfos} from './CategoryFullInfos'
import CategoryCard from './CatagoryCard'
import classes from './Category.module.css'
function Category() {
  return (
    <div >
        <section className={classes.category_container}>
            {
                categoryInfos.map((infos) => (
                    <CategoryCard data = {infos}/>
                ))
            }
        </section>
    </div>
  )
}

export default Category