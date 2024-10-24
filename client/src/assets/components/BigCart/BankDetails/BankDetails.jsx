import React from 'react';

const BankDetails = () => {
  return (
    <div className="bank-details text-xl mx-auto my-10">
      <h3 className='montserrat2'>Detalles de la Cuenta Bancaria</h3>
      <p className='montserrat'>Banco: Banco Ficticio</p>
      <p className='montserrat'>Nombre del Titular: Juan Pérez</p>
      <p className='montserrat'>Número de Cuenta: 123-456-789</p>
      <p className='montserrat'>CBU: 1234567890123456789012</p>
      <p className='montserrat'>Tipo de Cuenta: Caja de Ahorro</p>
      <p className='montserrat'>Por favor, realiza la transferencia y envíanos el comprobante.</p>
    </div>
  );
};

export default BankDetails;