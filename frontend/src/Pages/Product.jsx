import React from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';

const Product = () => {
    const {all_product} = React.useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div className='mt-28'>
        {productId}
    </div>
  )
}

export default Product