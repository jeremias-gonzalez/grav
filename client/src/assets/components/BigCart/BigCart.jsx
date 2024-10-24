import React, { useContext, useState, useMemo } from 'react';
import { DataContext } from '../Context/DataContext';
import './bigcart.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BankDetails from './BankDetails/BankDetails'; // Importar el componente BankDetails
import Confetti from 'react-confetti';

const PaymentMethod = ({ onSelectPayment }) => (
  <div className="payment-method-section">
      <div className='flex justify-center mb-2'>
                    <h1 className='font-kelsi2 text-4xl text-custom-blue '> <span className='montserrat'>2.</span> Pago</h1>
                  </div>
                  <hr className='mb-10 'style={{ boxShadow: '0 4px 10px rgba(0, 123, 255, 0.5)' }} />
    <h3 className='flex justify-center text-2xl montserrat2 mb-10 '>Método de Pago</h3>
    <div className='flex flex-col my-5'>
    <label >
      {/* <input
     
        type="radio"
        name="paymentMethod"
        value="efectivo"
        onChange={(e) => onSelectPayment(e.target.value)}
      /> */}
      {/* Efectivo */}
    </label>
    <label className='rounded-lg  flex border border-custom-blue md:w-full w-full  p-2 '>
      <input
       className='mx-2 hidden-radio '
        type="radio"
        name="paymentMethod"
        value="transferencia"
        onChange={(e) => onSelectPayment(e.target.value)}
      />
       <label htmlFor="domicilio" className="custom-radio"></label>
      <div className='flex gap-3'>
       <img className='w-10 h-10 my-4 md:my-4 md:h-16 md:w-16' src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/iconos-checkout/bank-payment-icon.png" alt="" />
     
     <div className='flex flex-col my-3 md:my-3'>
      <h1 className='montserrat2 text-sm md:text-lg md:mx-4'>Transferencia Bancaria</h1>
     <p className='montserrat text-xs md:text-sm md:mx-4'>Al finalizar, te mostraremos los datos bancarios para pagar</p>
     </div>
     </div>
    </label>
    </div>
  </div>
);

const BigCart = () => {
  const { cart, setCart } = useContext(DataContext);
  const [customerName, setCustomerName] = useState('');
  const [customerSurname, setCustomerSurname] = useState('');
  const [customerDNI, setCustomerDNI] = useState(''); 
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerTelefono, setCustomerTelefono] = useState('');
  const [shippingMethod, setShippingMethod] = useState('sucursal');
  const [address, setAddress] = useState({ street: '', number: '', piso: '', depto: '',city: '', province: '', postalCode: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false); // Estado para manejar la finalización del pedido
  const [showPaymentMethods, setShowPaymentMethods] = useState(true); // Nuevo estado para controlar la visibilidad de los métodos de pago

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const shippingCost = shippingMethod === 'sucursal' ? 6167 : 8000;
  const totalPrice = cartSubtotal + shippingCost;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderData = {
      customerName,
      customerSurname,
      customerEmail,
      customerDNI,
      customerTelefono,
      shippingMethod,
      address,
      paymentMethod,
      cartItems: cart,
      totalPrice
    };

    try {
      const response = await fetch('http://localhost:3001/api/add-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log('Pedido enviado con éxito');
        setOrderSubmitted(true); // Establecer estado para mostrar el mensaje de agradecimiento
        setShowPaymentMethods(false); // Ocultar métodos de pago al finalizar el pedido
      } else {
        console.error('Error al enviar el pedido:', response.statusText);
        alert('Hubo un error al realizar el pedido');
      }
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Hubo un error en la conexión al servidor');
    } finally {
      setIsProcessing(false);
    }
  };
  const generateWhatsAppLink = (cart, total) => {
    const baseUrl = 'https://api.whatsapp.com/send?phone=543585181780';
    let message = 'Hola!👟, realicé la compra de los siguientes productos y aqui va mi comprobante!:\n';

    cart.forEach((product) => {
      message += `- ${product.brand} ${product.model}, Precio por unidad: $${product.price.toLocaleString()}, Cantidad: ${product.quantity}\n`;
    });

    message += `\nTotal de la compra: $${total.toLocaleString()}`;

    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}&text=${encodedMessage}`;
  };

  const handleWhatsAppShare = () => {
    const link = generateWhatsAppLink(cart, totalPrice);
    window.open(link, '_blank');
  };
  return (
    <>
      <Navbar />
      <div className="bigcart-container">
        <form onSubmit={handleSubmitOrder} className={`order-form ${isProcessing ? 'disabled' : ''}`}>
          <div className="form-left">
            {!showPayment ? (
              <>
                {/* Formulario de Datos de Contacto */}
                <div className="section contact-info">
                <div className="section shipping-method">
                  <div className='flex justify-center mb-2'>
                    <h1 className='font-kelsi2 text-4xl text-custom-blue '> <span className='montserrat'>1.</span> Envio</h1>
                  </div>
                  <hr className='mb-10'style={{ boxShadow: '0 4px 10px rgba(90, 154, 119, 0.5)' }} />
                  <h3 className='montserrat uppercase my-5'>Medios de Envío</h3>
                  
                  <div className="input-group">
                    <label className='rounded-lg gap-3 p-2 flex border border-custom-blue w-25'>
                    <div className="shipping-option">
                    <input
                      className="hidden-radio"
                      type="radio"
                      id="sucursal"
                      name="shippingMethod"
                      value="sucursal"
                      checked={shippingMethod === 'sucursal'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <label htmlFor="sucursal" className="custom-radio">
                    
                    </label>
                  </div>

                      <div className='flex flex-col'>
                     <p className='montserrat2 uppercase'>Envío a Sucursal </p> 
                     <p className='montserrat'> Entre 3 a 6 dias habiles - $6,167</p> 
                     </div>
                    </label>
                    <label className='rounded-lg gap-3 p-2 flex border border-custom-blue w-25'>
                      <input
                      className='hidden-radio'
                        type="radio"
                         id="domicilio"
                        name="shippingMethod"
                        value="domicilio"
                        checked={shippingMethod === 'domicilio'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <label htmlFor="domicilio" className="custom-radio">
                    
                    </label>
                        <div className='flex flex-col'>
                     <p className='montserrat2 uppercase'>Envío a Domicilio </p> 
                     <p className='montserrat '> Entre 6 a 9 dias habiles - $8.000</p> 
                     </div>
                    </label>
                  </div>
                </div>
                  <h3 className='montserrat uppercase my-5'>Datos del Destinatario</h3>
                  <div className='grid grid-cols-2 grid-rows-1 gap-3'>
                  <div className="input-group">
                    <label 
                    className='montserrat2'
                     htmlFor="customerName">Nombre</label>
                    <input
                      type="text"
                      id="customerName"
                  
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="input-group">
                    <label className='montserrat2' htmlFor="customerSurname">Apellido</label>
                    <input
                      type="text"
                      id="customerSurname"
                      value={customerSurname}
                      onChange={(e) => setCustomerSurname(e.target.value)}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  
                  <div className="input-group">
                    <label className='montserrat2' htmlFor="customerEmail">Email</label>
                    <input
                      type="email"
                      id="customerEmail"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="input-group">
                      <label className='montserrat2' htmlFor="customerDNI">DNI</label>
                      <input
                        type="text"
                        id="customerDNI"
                        value={customerDNI}
                        onChange={(e) => setCustomerDNI(e.target.value)}
                        required
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="input-group">
                      <label className='montserrat2' htmlFor="customerTelefono">Telefono</label>
                      <input
                        type="text"
                        id="customerTelefono"
                        value={customerTelefono}
                        onChange={(e) => setCustomerTelefono(e.target.value)}
                        required
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </div>

                {/* Sección del Método de Envío */}
               

                {shippingMethod === 'domicilio' && (
                  <div className="section address-info">
                    <h3 className='montserrat uppercase my-5'>Dirección del Destinatario</h3>
                    <div className='grid grid-cols-2 grid-rows-2 gap-3'>
                    <div className="input-group">
                      <label
                      className='montserrat2'
                       htmlFor="street">Calle</label>
                      <input
                        type="text"
                        id="street"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        required
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="input-group">
                      <label
                      className='montserrat2'
                      htmlFor="number">Número</label>
                      <input
                        type="text"
                        id="number"
                        value={address.number}
                        onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        required
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="input-group">
                      <label
                      className='montserrat2'
                      htmlFor="piso">Piso(OPCIONAL)</label>
                      <input
                        type="text"
                        id="piso"
                        value={address.piso}
                        onChange={(e) => setAddress({ ...address, piso: e.target.value })}
                        required
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="input-group">
                      <label
                      className='montserrat2'
                      htmlFor="piso">Depto(OPCIONAL)</label>
                      <input
                        type="text"
                        id="depto"
                        value={address.depto}
                        onChange={(e) => setAddress({ ...address, depto: e.target.value })}
                        
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="input-group">
                      <label
                      className='montserrat2'
                      htmlFor="city">Ciudad</label>
                      <input
                        type="text"
                        id="city"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        required
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="input-group">
                      <label
                      className='montserrat2'
                      htmlFor="province">Provincia</label>
                      <input
                        type="text"
                        id="province"
                        value={address.province}
                        onChange={(e) => setAddress({ ...address, province: e.target.value })}
                        required
                        disabled={isProcessing}
                      />
                    </div>
                    </div>
                  </div>
                )}

              <button
                type="button"
                className="next-button montserrat2 bg-custom-blue text-white p-2 rounded-xl"
                onClick={() => {
                  if (
                    customerName &&
                    customerSurname &&
                    customerEmail &&
                    customerDNI &&
                    (shippingMethod === 'sucursal' || 
                    (
                      address.street && 
                      address.number && 
                      address.city && 
                      address.province && 
                      (
                        // Caso 1: piso y depto no están presentes
                        (!address.piso && !address.depto) || 
                        // Caso 2: ambos campos están presentes
                        (address.piso && address.depto)
                      )
                    ))
                  ) {
                    setShowPayment(true);
                  } else {
                    alert('Por favor, completa todos los campos requeridos antes de continuar.');
                  }
                }}
              >
                Siguiente
              </button>

              </>
            ) : (
              <>
                {showPaymentMethods && (
                  <>
                    <PaymentMethod onSelectPayment={setPaymentMethod} />
                    {paymentMethod && (
                      <button
                      className='montserrat2 bg-custom-blue text-white p-2 rounded-xl'
                        type="submit"
                        disabled={isProcessing}
                        style={{ display: orderSubmitted ? 'none' : 'block' }} // Ocultar el botón si el pedido fue enviado
                      >
                        Finalizar Pedido
                      </button>
                    )}
                  </>
                )}
                 {orderSubmitted && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

                {orderSubmitted && (
                  <div className="order-confirmation my-5 mx-5 md:mx-10 md:my-10">
                    <h3 className='font-kelsi2 text-custom-blue text-4xl'>¡Gracias por tu pedido!</h3>
                 
                    <BankDetails />
                    <button
                type="button"
                onClick={handleWhatsAppShare}
                className="montserrat2 bg-green-500 text-white p-2 rounded-xl mt-2"
              >
               Enviar Comprobante por WhatsApp
              </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="form-right">
            <div className="section order-summary flex flex-col">
              <h3 className='font-kelsi2 text-4xl mt-2 mb-4 flex justify-center'>Mi pedido</h3>
              <div className="order-items">
                {cart.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.model} className="item-image" />
                    <div className="item-details">
                      <div className='flex gap-1'>
                      <h3 className='montserrat'>{item.brand}</h3>
                      <h4 className='montserrat'>{item.model}</h4>
                      </div>
                      <p className='montserrat'>Precio: ${item.price.toLocaleString()}</p>
                      <p className='montserrat'> Cantidad: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col items-center mt-5'>
              <h4 className='montserrat text-sm my-1'>Subtotal: ${cartSubtotal.toLocaleString()}</h4>
              <h4 className='montserrat text-sm my-1'>Costo de Envío: ${shippingCost.toLocaleString()}</h4>
              <h4 className='montserrat text-sm my-1'>Total: ${totalPrice.toLocaleString()}</h4>
            </div>

            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BigCart;
