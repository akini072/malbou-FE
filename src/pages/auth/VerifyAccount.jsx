import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getVerifyTickets } from 'stores/ticket';
import { createSessionPayment, resetPayment } from 'stores/payment';

import Background from 'assets/images/get-started.png';

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useDispatch();
  const { verifyPlans } = useSelector((state) => state.ticketStore);
  const { isCreatedSession, session } = useSelector((state) => state.paymentStore);

  const [active, setActive] = useState(0);

  const handelChange = (index) => {
    setActive(index);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleVerify = () => {
    // navigate('/auth/verified');
    if (verifyPlans.length > 0) {
      const ticket = verifyPlans[active];
      dispatch(
        createSessionPayment({
          price: ticket.price_id,
          mode: ticket.type === 'purchase' ? 'payment' : 'subscription',
          token
        })
      );
    }
  };

  useEffect(() => {
    if (isCreatedSession) {
      localStorage.setItem('payment_session', session.id);
      window.location.href = session.url;
    }

    return () => {
      dispatch(resetPayment());
    };
  }, [isCreatedSession]);

  useEffect(() => {
    dispatch(getVerifyTickets());
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('mymarvin_token', token);
      localStorage.setItem('mymarvin_logged', true);
    }
  }, [token]);

  return (
    <div
      className="w-full min-h-screen py-6 !bg-contain"
      style={{
        background: `url(${Background}) no-repeat center 140%`
      }}
    >
      <div className="w-full">
        <div className="w-full">
          <div className="w-full px-6 mb-6">
            <button onClick={handleBack} className="w-8 h-8">
              <BsChevronLeft />
            </button>
          </div>

          <div className="w-full">
            <h2 className="mb-3 text-3xl font-semibold text-center dark:text-white">
              Verify your account
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#CDD5DF] text-center mx-auto max-w-[270px] mb-20">
              To prevent spam we require all users to verify their identity with their debit card.
            </p>

            <div
              className={`flex items-center bg-gray-100 border-b border-gray-50 dark:bg-[#202939] py-3 px-4 pb-0 cursor-pointer hover:opacity-60 ${
                active === 0 ? 'opacity-50' : ''
              }`}
              onClick={() => handelChange(0)}
            >
              {/* <input
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-[#53B1FD] bg-black border-black focus:ring-[#53B1FD] dark:focus:ring-[#53B1FD] dark:ring-offset-gray-800 focus:ring-2 dark:bg-black dark:border-black"
              /> */}
              <label
                htmlFor="default-radio-1"
                className="w-full pb-3 ml-2 text-base font-medium text-gray-900  dark:text-white cursor-pointer"
              >
                £{(verifyPlans.length > 0 && verifyPlans[0].price.toFixed(2)) || 0} <br />
                <span className="text-sm text-gray-600 dark:text-[#CDD5DF]">
                  Authenticate You (and get 10 credits)
                </span>
              </label>

              {active === 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-600 ml-auto"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </div>
            <div
              className={`flex items-center bg-gray-100 dark:bg-[#202939] py-3 px-4  cursor-pointer hover:opacity-60 ${
                active === 1 ? 'opacity-50' : ''
              } `}
              onClick={() => handelChange(1)}
            >
              {/* <input
                checked
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-[#53B1FD] bg-black border-black focus:ring-[#53B1FD] dark:focus:ring-[#53B1FD] dark:ring-offset-gray-800 focus:ring-2 dark:bg-black dark:border-black"
              /> */}
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-base font-medium text-gray-900 dark:text-white cursor-pointer"
              >
                £{(verifyPlans.length > 0 && verifyPlans[1].price.toFixed(2)) || 0}
                <br />
                <span className="text-sm text-gray-600 dark:text-[#CDD5DF] inline-block">
                  {/* Buy £{(verifyPlans.length > 0 && verifyPlans[1].price.toFixed(2)) || 0}/month and
                  get 500 credits - cancel anytime */}
                  Authenticate You (and get 100 credits)
                </span>
              </label>

              {active === 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-600 ml-auto"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 w-full px-6 pb-20">
              <button
                onClick={handleVerify}
                className="w-full bg-[#1570EF] rounded-full p-3 mt-12 text-white text-lg font-medium"
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
