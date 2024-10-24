import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import CartElements from './CartElements';

const CartContent = () => {
    const { cart } = useContext(DataContext);
  
    const generateWhatsAppLink = (cart, discountedTotal) => {
        const baseUrl = 'https://api.whatsapp.com/send?phone=543585181780';
        let message = 'Aquí están los productos en mi carrito:\n';
      
        // Sumar el total de los productos en el carrito
        const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
        
        cart.forEach((product) => {
            message += `- ${product.brand} ${product.model}, Precio: $${product.price}, Talle: ${product.size.name}, Cantidad: ${product.quantity}\n`;
        });
      
        // Agregar el total o el total con descuento al mensaje
        message += `\nTotal de la compra: $${discountedTotal.toFixed(2)}`;
      
        const encodedMessage = encodeURIComponent(message);
        return `${baseUrl}&text=${encodedMessage}`;
      };
      

      const handleWhatsAppShare = () => {
        const link = generateWhatsAppLink(cart, discountedTotal); // Pasa discountedTotal
        window.open(link, '_blank');
      };

    return cart.length > 0 ? (
        <div>
            <CartElements />
           
        </div>
    ) : (
        <h2 className='font-kelsi2 text-4xl text-center my-[25rem] md:my-[19rem] md:text-4xl'>Tu carrito esta vacio!</h2>
    );
};

export default CartContent;
