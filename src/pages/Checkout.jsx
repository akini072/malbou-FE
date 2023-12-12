import React from 'react';
import { useSelector } from 'react-redux';

import Payment from 'components/payment';

const Checkout = () => {
  // const dispatch = useDispatch();
  const { ticket } = useSelector((state) => state.ticketStore);
  const { clientSecret } = useSelector((state) => state.paymentStore);

  return (
    <div className="w-full px-4 py-6 sm:px-6">
      <h2 className="mb-8 text-3xl font-bold text-center">Checkout</h2>
      <div className="p-6 border rounded-lg shadow-lg">
        <h3 className="mb-6 text-2xl font-semibold text-center">Total: &pound;{ticket.price}</h3>
        <Payment clientSecret={clientSecret} />
      </div>
    </div>
  );
};

export default Checkout;
