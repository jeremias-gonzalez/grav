import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';


const CartTotal = () => {
    const{cart} = useContext(DataContext)
    const total = cart.reduce((acc ,el) => acc + el.price,0); 
  return (
    <div>
        <h1>${total}</h1>
    </div>
  )
}

export default CartTotal