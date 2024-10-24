import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import { DataContext } from '../Context/DataContext';
import carticon from '/public/imgs/shopping-cart.png'; // Asegúrate de tener la ruta correcta para el ícono
import Loader from '../ui/loader'; // Importa tu componente Loader

// Lazy load del componente CartContent
const CartContent = lazy(() => import('../CartContent/CartContent')); // Cambia la ruta según tu estructura de carpetas

const Cart = () => {
  const { cart } = useContext(DataContext);
  const [active, setActive] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true); // Estado para controlar el loading

  useEffect(() => {
    const calculateTotalItems = () => {
      const total = cart.reduce((acc, product) => acc + product.quantity, 0);
      setTotalItems(total);
    };

    calculateTotalItems();
  }, [cart]);

  useEffect(() => {
    // Simula un delay de 2 segundos para mostrar el loader
    if (active) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
    }
  }, [active, cart]);

  return (
    <header>
      <div className="container-icon relative">
        <div
          className="container-cart-icon"
          onClick={() => setActive(!active)} // Alterna el estado de apertura del carrito
        >
          <svg className="ml-28 w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.0004 9V6C16.0004 3.79086 14.2095 2 12.0004 2C9.79123 2 8.00037 3.79086 8.00037 6V9M3.59237 10.352L2.99237 16.752C2.82178 18.5717 2.73648 19.4815 3.03842 20.1843C3.30367 20.8016 3.76849 21.3121 4.35839 21.6338C5.0299 22 5.94374 22 7.77142 22H16.2293C18.057 22 18.9708 22 19.6423 21.6338C20.2322 21.3121 20.6971 20.8016 20.9623 20.1843C21.2643 19.4815 21.179 18.5717 21.0084 16.752L20.4084 10.352C20.2643 8.81535 20.1923 8.04704 19.8467 7.46616C19.5424 6.95458 19.0927 6.54511 18.555 6.28984C17.9444 6 17.1727 6 15.6293 6L8.37142 6C6.82806 6 6.05638 6 5.44579 6.28984C4.90803 6.54511 4.45838 6.95458 4.15403 7.46616C3.80846 8.04704 3.73643 8.81534 3.59237 10.352Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {totalItems > 0 && (
            <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-custom-blue text-white flex items-center justify-center text-xs">
              {totalItems}
            </div>
          )}
        </div>

        {/* Slide-over con CartContent o Loader */}
        <div
          className={`fixed inset-0 overflow-hidden z-10 transition-transform duration-500 ${
            active ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setActive(false)} />
            <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between mb-7">
                      <h2 className="text-lg md:text-2xl font-kelsi text-gray-900 mx-auto">Mis Productos</h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setActive(false)}
                        >
                          <span className="sr-only">Cerrar panel</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Cargando el contenido del carrito o mostrando el Loader */}
                    {loading ? (
                      <div className='flex justify-center my-[25rem] md:my-[12rem]'>
                      <Loader />
                      </div> // Muestra el Loader mientras se carga
                    ) : (
                      <Suspense fallback={<div className='flex justify-center'> <Loader /> </div>}>
                        <CartContent />
                      </Suspense>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Cart;


   {/* {Array.isArray(allProducts) && allProducts.length ? ( // Verifica si es un array y tiene elementos
                        <>
                            <div className='row-product'>
                                {allProducts.map(product => (
                                    <div className='cart-product' key={product.id}>
                                        <div className='info-cart-product'>
                                            <span className='cantidad-producto-carrito'>
                                                {product.quantity}
                                            </span>
                                            <p className='titulo-producto-carrito'>
                                                {product.nameProduct}
                                            </p>
                                            <span className='precio-producto-carrito'>
                                                ${product.price}
                                            </span>
                                        </div>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth='1.5'
                                            stroke='currentColor'
                                            className='icon-close'
                                            onClick={() => onDeleteProduct(product)}
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M6 18L18 6M6 6l12 12'
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>

                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>

                            <button className='btn-clear-all' onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )} */}