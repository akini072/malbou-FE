import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkPayment } from 'stores/payment';

import Background from 'assets/images/get-started.png';

const CheckoutStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const priceId = searchParams.get('price');
  const status = searchParams.get('status');
  const sessionId = localStorage.getItem('payment_session');
  const dispatch = useDispatch();
  const { transaction } = useSelector((state) => state.paymentStore);

  console.log('transaction: ', transaction);

  const handleContinue = () => {
    navigate('/home');
  };

  useEffect(() => {
    if (sessionId && priceId) {
      dispatch(
        checkPayment({
          sessionId,
          priceId
        })
      );
    }
  }, []);

  return (
    <div
      className="w-full !bg-contain h-[80vh] overflow-hidden"
      style={{
        background: `url(${Background}) no-repeat center top`
      }}
    >
      <div className="flex items-center w-full h-full">
        <div className="w-full mb-20">
          <div
            className={`flex justify-center mb-3 text-center text-${
              status === 'cancel' ? 'red' : 'green'
            }-500`}
          >
            {status === 'cancel' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-20 h-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-20 h-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <h2 className="mb-3 text-2xl font-semibold text-center dark:text-white">
            Payment {status === 'cancel' ? 'cancelled' : 'successfully'}
          </h2>

          <div className="absolute bottom-0 left-0 right-0 z-10 w-full px-6 pb-20">
            <button
              onClick={handleContinue}
              className="w-full bg-[#1570EF] rounded-full p-3 mt-12 text-white text-lg font-medium"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStatus;
