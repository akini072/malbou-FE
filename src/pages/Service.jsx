import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'stores/user';
import { getTickets, selectedTicket } from 'stores/ticket';
import { createSessionPayment, resetPayment } from 'stores/payment';

const Service = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);
  const { tickets } = useSelector((state) => state.ticketStore);
  const { isCreatedSession, session } = useSelector((state) => state.paymentStore);

  const handleSelect = (ticket, type) => {
    dispatch(selectedTicket(ticket));
    dispatch(
      createSessionPayment({
        price: ticket.price_id,
        mode: type === 'purchase' ? 'payment' : 'subscription'
      })
    );
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
    if (!user) {
      dispatch(getProfile());
    } else if (user && !user.verify) {
      navigate('/welcome');
    }
  }, [user]);

  useEffect(() => {
    dispatch(getTickets());
  }, []);

  return (
    <div className="w-full">
      <div className="w-full px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
        <h3 className="max-w-xl mx-auto mb-6 text-3xl font-bold text-center lg:text-4xl lg:mb-10 ">
          Join using name, email <br />
          <span className="text-base font-normal text-gray-600">(authentication required)</span>
        </h3>
        <h4 className="mb-3 text-xl font-semibold text-center lg:text-2xl">
          20 (variable) free credits - 1 credit is 1 image or 1 poem etc.
        </h4>
        <h5 className="text-xl font-semibold text-center lg:text-2xl">Free trial - 7 days</h5>

        <div className="w-full mt-14">
          <div className="sm:grid sm:grid-cols-2 sm:gap-8 lg:gap-14">
            <div className="w-full p-6 mb-4 bg-white border shadow-lg dark:bg-gray-700 rounded-2xl sm:p-10 sm:mb-0">
              <h3 className="mb-6 text-xl font-bold text-center lg:mb-10 md:text-3xl lg:text-4xl">
                Purchase credit
              </h3>

              <ul>
                {tickets.purchase &&
                  tickets.purchase.length > 0 &&
                  tickets.purchase.map((item, i) => (
                    <li
                      className="flex items-center mb-4 cursor-pointer"
                      onClick={() => handleSelect(item, 'purchase')}
                      key={i}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>

                      <p className="ml-3 text-lg font-semibold md:text-xl lg:text-2xl">
                        £{item.price} ({item.credits} credits)
                      </p>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="w-full p-6 bg-white border shadow-lg dark:bg-gray-700 rounded-2xl sm:p-10">
              <h3 className="mb-6 text-xl font-bold text-center lg:mb-10 md:text-3xl lg:text-4xl">
                Subscription
              </h3>

              <ul>
                {tickets.subscription &&
                  tickets.subscription.length > 0 &&
                  tickets.subscription.map((item, i) => (
                    <li
                      className="flex items-center mb-4 cursor-pointer"
                      onClick={() => handleSelect(item, 'subscription')}
                      key={i}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>

                      <p className="ml-3 text-lg font-semibold md:text-xl lg:text-2xl">
                        £{item.price} ({item.credits} credits)
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
