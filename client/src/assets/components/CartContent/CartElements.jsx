import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import trashicon from '/public/imgs/trash-bin-icon.png';
import { Link } from 'react-router-dom';

const CartElements = () => {
  const { cart, setCart } = useContext(DataContext);
  const [total, setTotal] = useState(0);

  // Función para calcular el total
  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
      setTotal(newTotal);
    };

    calculateTotal(); // Calcula el total cuando cambia el carrito
  }, [cart]);

  // Función para eliminar un producto del carrito
  // const removeProduct = (productId, productSize) => {
  //   const updatedCart = cart.filter(
  //     item => !(item.id === productId && item.size.name === productSize)
  //   );
  //   setCart(updatedCart);
  // };

  // // Función para actualizar la cantidad de un producto
  // const updateQuantity = (productId, productSize, action) => {
  //   const updatedCart = cart.map((item) => {
  //     if (item.id === productId && item.size.name === productSize) {
  //       let newQuantity = item.quantity;
  //       if (action === 'increment') {
  //         newQuantity += 1;
  //       } else if (action === 'decrement' && newQuantity > 1) {
  //         newQuantity -= 1;
  //       }
  //       return { ...item, quantity: newQuantity };
  //     }
  //     return item;
  //   });
  //   setCart(updatedCart); // Actualizar el carrito con la nueva cantidad
  // };

  const removeProduct = (productId) => {
    const updatedCart = cart.filter(
      item => !(item.id === productId )
    );
    setCart(updatedCart);
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        let newQuantity = item.quantity;
        if (action === 'increment') {
          newQuantity += 1;
        } else if (action === 'decrement' && newQuantity > 1) {
          newQuantity -= 1;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart); // Actualizar el carrito con la nueva cantidad
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Función para generar el enlace de WhatsApp
  const generateWhatsAppLink = (cart, total) => {
    const baseUrl = 'https://api.whatsapp.com/send?phone=543585181780';
    let message = 'Hola!,quiero realizar el pedido de los siguentes productos:\n';

    cart.forEach((product) => {
      message += `- ${product.brand} ${product.model}, Precio por unidad: $${product.price.toLocaleString()},  Cantidad: ${product.quantity}\n`;
    });

    message += `\nTotal de la compra: $${total.toLocaleString()}`;

    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}&text=${encodedMessage}`;
  };

  const handleWhatsAppShare = () => {
    const link = generateWhatsAppLink(cart, total);
    window.open(link, '_blank');
  };

  return (
    <div>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {cart.map((product) => (
            // <div className='flex items-center justify-between mb-4' key={`${product.id}-${product.size.name}`}>
                <div className='flex items-center justify-between mb-4' key={`${product.id}`}>
              <img className='w-16' src={product.image} alt={product.model} />
              <div className="flex flex-col">
                <div className='flex'>
                  <h1 className='montserrat mx-1 text-xs'>{product.brand}</h1>
                  <p className='montserrat text-xs'>{product.model}</p>
                </div>
                <div className='flex'>
                  {/* <p className='montserrat text-xs mx-1'>Color: {typeof product.color === 'object' ? product.color.name : product.color}</p> */}
                  {/* <h4 className='montserrat text-xs'>Talle: {typeof product.size === 'object' ? product.size.name : product.size}</h4> */}
                </div>
                <div className="flex border w-20 rounded-xl items-center space-x-5">
                  <button
                    onClick={() => updateQuantity(product.id, 'decrement')}
                    className="text-gray-800 p-1 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <p className='montserrat'>{product.quantity}</p>
                  <button
                    onClick={() => updateQuantity(product.id, 'increment')}
                    className="text-gray-800 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className='p-2 rounded'
                >
                  <img src={trashicon} className='w-5' alt="" />
                </button>
                <h3 className='montserrat text-xs'>${(product.price * product.quantity).toLocaleString()}</h3>
              </div>
            </div>
          ))}

          {/* Mostrar el total del carrito */}
          <div className='mt-50 z-100'>
            <div className="border-t flex justify-between text-base font-medium text-gray-900">
              <p className='montserrat'>Subtotal</p>
              <p className='montserrat'>${total.toLocaleString()}</p> {/* Mostrar total sin descuento */}
            </div>
            <div className='flex flex-col w-36'>         
               <button
              onClick={clearCart}
              className='mt-4 bg-custom-blue montserrat text-white p-2 rounded'
            >
              Vaciar Carrito
            </button>
            <Link
               to='/cart'
              className='mt-4  montserrat text-custom-blue underline p-2 rounded'
            >
              <div className='flex'>
              Ir al Carrito   
              <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-custom-blue  mt-[.3rem] w-3 mx-1 md:w-4 md:mt-[.3rem] md:ml-[.2rem]">
                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>  
               </div>
            </Link>
            </div>
 
            {/* <button
              onClick={handleWhatsAppShare}
              className='mt-4 bg-green-600 montserrat text-white p-2 rounded'
            >
              Realizar pedido por Whatsapp
            </button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default CartElements;

