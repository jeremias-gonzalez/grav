// ProductDialog.jsx
import React, { useState, useContext } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DataContext } from '../Context/DataContext';
import classNames from 'classnames';
import talles from "/public/imgs/ARG.png";
import { motion } from 'framer-motion'; // Importa Framer Motion

const ProductDialog = ({ product, open, closeDialog }) => {
  const { cart, setCart, orderForm, setOrderForm } = useContext(DataContext);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta
  const [showModal, setShowModal] = useState(false); // Estado para mostrar u ocultar el modal

  const handleShowImage = () => {
    setShowModal(true); // Cambia el estado para mostrar el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cambia el estado para cerrar el modal
  };

  const addProduct = () => {
    const existingProduct = cart.find(item =>
      item.id === product.id &&
      item.size.name === selectedSize.name
    );
  
    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.id === product.id && item.size.name === selectedSize.name
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      const cartItem = {
        id: product.id,
        brand: product.brand,
        model: product.model,
        price: product.price,
        size: selectedSize,
        image: product.image,
        quantity: quantity,
      };
      setCart([...cart, cartItem]);
    }
  
    // También agregamos el producto al formulario de pedido
    setOrderForm(prevOrderForm => [...prevOrderForm, { ...product, size: selectedSize, quantity }]);
  
    // Mensaje de alerta
    setAlertMessage('¡Producto agregado al carrito y al formulario de pedido!');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 3000);
    closeDialog();
  };

  const handleAddToCart = () => {
    // if (!selectedSize) {
    //   setAlertMessage('Por favor, selecciona un color y un talle antes de agregar al carrito.');
    //   setShowAlert(true); // Muestra la alerta si falta información
    //   setTimeout(() => {
    //     setShowAlert(false); // Oculta la alerta después de 3 segundos
    //     setAlertMessage('');
    //   }, 3000);
    // } else {
      //addProduct();
    // }
    addProduct();
  };

  // Verifica si el producto está definido antes de acceder a sus propiedades
  if (!product) {
    return null; // O puedes retornar un mensaje de carga si prefieres
  }

  return (
    <Dialog open={open} onClose={closeDialog} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen text-center">
          {/* Animación usando Framer Motion */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}   // Estado inicial de la animación: abajo y oculto
            animate={{ opacity: 1, y: 0 }}     // Animación de entrada: opacidad al 100% y posición normal
            exit={{ opacity: 0, y: 100 }}      // Animación de salida: vuelve hacia abajo y desaparece
            transition={{ duration: 0.5, ease: 'easeInOut' }}  // Control de duración y suavidad de la animación
            className="relative w-full max-w-md p-6 mt-[15rem] overflow-hidden text-left bg-white shadow-xl rounded-2xl"
          >
            <button
              type="button"
              onClick={closeDialog}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>

            <div>
              <h2 className="text-2xl montserrat text-gray-900">
                {product.brand} - {product.model}
              </h2>
              <p className="text-2xl montserrat text-gray-900">${product.price}</p>

              {/* Selección de Color */}
              <fieldset aria-label="Choose a color" className="mt-4">
                <legend className="text-sm montserrat text-gray-900">Color</legend>
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                  {product.colors && product.colors.length > 0 ? (
                    product.colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        className={classNames(
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                          color === selectedColor ? `ring-2 ring-offset-2 ${color.selectedClass}` : ''
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </Radio>
                    ))
                  ) : (
                    <p>Modelo color de la imagen</p>
                  )}
                </RadioGroup>
              </fieldset>

              {/* Selección de Talle */}
              <fieldset aria-label="Choose a size" className="mt-4">
                <legend className="text-sm montserrat text-gray-900">Talles</legend>
                <p className="text-sm montserrat2 text-red-900">ATENCIÓN!, LEER LA GUÍA DE TALLES</p>
                <button
                  className="mt-4 montserrat text-custom-blue py-2 underline rounded"
                  onClick={handleShowImage}
                >
                  Guía de talles
                </button>

                {/* Modal con animación */}
                {showModal && (
                  <div className="fixed inset-0 flex items-center md:mt-10 justify-center z-50 bg-black bg-opacity-50">
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.8 }} // Estado inicial de la animación
                      animate={{ opacity: 1, y: 0, scale: 1 }}    // Animación al mostrarse
                      exit={{ opacity: 0, y: 50, scale: 0.8 }}    // Animación al desaparecer
                      transition={{ duration: 0.5, ease: 'easeInOut' }} // Control de duración y curva de animación
                      className="relative p-4 rounded-lg"
                    >
                      {/* Botón de cerrar */}
                      <button
                        onClick={handleCloseModal}
                        className="absolute mt-[-1.5rem] right-2 text-white"
                      >
                        ✕
                      </button>

                      {/* Imagen dentro del modal */}
                      <img src={talles} alt="Guía de talles" className="w-[64vw] md:w-64 rounded-xl h-auto" />
                    </motion.div>
                  </div>
                )}

                {/* RadioGroup para talles */}
                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="grid grid-cols-4 gap-4 mt-2">
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                          size === selectedSize ? 'ring-2 ring-offset-2 ring-custom-blue' : '',
                          'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium'
                        )}
                      >
                        <span className='montserrat'>{size.name}</span>
                      </Radio>
                    ))
                  ) : (
                    <p>No hay talles disponibles</p>
                  )}
                </RadioGroup>
                <p className='text-sm my-2 montserrat2 text-custom-blue'>TALLES EXPRESADOS EN BRASIL</p>
              </fieldset>

              {/* Cantidad */}
              <div className="mt-4 border border-gray-300 rounded-xl w-[30%] flex items-center justify-between">
                <div className="border-r border-gray-300 pr-2">
                  <button
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    className="text-custom-blue p-1 rounded-lg"
                  >
                    -
                  </button>
                </div>
                <p className="text-center">{quantity}</p>
                <div className="border-l border-gray-300 pl-2">
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="text-custom-blue p-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Mensaje de alerta */}
              {showAlert && (
                <div className="mt-2 text-red-500">
                  {alertMessage}
                </div>
              )}

              {/* Botón de agregar al carrito */}
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full py-2 text-white montserrat bg-custom-blue rounded "
              >
                Agregar al carrito
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDialog;
