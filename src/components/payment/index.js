import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const Payment = ({ clientSecret }) => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
    appearance: {
      theme: 'night'
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

Payment.propTypes = {
  clientSecret: PropTypes.string
};

export default Payment;
