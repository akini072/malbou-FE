import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'stores/user';
import { getAccountTickets } from 'stores/ticket';
import { createSessionPayment, resetPayment } from 'stores/payment';
import { toast } from 'react-toastify';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);
  const { accountPlans } = useSelector((state) => state.ticketStore);
  const { isCreatedSession, session, isCancelled } = useSelector((state) => state.paymentStore);

  // const handleBuy = (type) => {
  //   console.log(type);
  //   const priceId = type === 'purchase' ? accountPlans[1].price_id : accountPlans[0].price_id;
  //   dispatch(
  //     createSessionPayment({
  //       price: priceId,
  //       mode: type === 'purchase' ? 'payment' : 'subscription'
  //     })
  //   );
  // };

  const handleBuyNow = (priceId) => {
    dispatch(
      createSessionPayment({
        price: priceId,
        mode: 'payment'
      })
    );
  };

  // const handleCancel = () => {
  //   dispatch(
  //     cancelSubscription({
  //       session_id: user.session_id
  //     })
  //   );
  // };

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
    if (isCancelled) {
      toast.success('You have successfully unsubscribed from the plan');
      dispatch(getProfile());
    }

    return () => {
      dispatch(resetPayment());
    };
  }, [isCancelled]);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else {
      if (!user.verify) {
        return navigate('/welcome');
      }
    }
  }, [user]);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getAccountTickets());
  }, []);

  return (
    <div className="w-full">
      <div className="w-full px-4 py-10 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
        <div className="w-full max-w-4xl mx-auto rounded-xl">
          <h3 className="pb-2 mb-4 text-xl font-semibold text-center md:text-3xl">Account</h3>

          <p className="font-medium text-center text-md mb-14">
            Credit: <strong>{(user && user.balance) || 0}</strong>
          </p>

          <div>
            {accountPlans.length > 0 &&
              accountPlans.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center font-semibold text-base mb-3 border-b pb-3"
                >
                  <p>
                    £{item.price} ({item.credits} credits)
                  </p>
                  <button
                    className="px-4 py-2 font-medium text-white bg-green-600 rounded-md text-md ml-auto"
                    onClick={() => handleBuyNow(item.price_id)}
                  >
                    Buy Now
                  </button>
                </div>
              ))}
          </div>

          {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="p-5 text-center border rounded-lg shadow-md">
              <h4 className="mb-2 text-lg font-semibold">Buy credits:</h4>
              <p className="mb-4 text-sm font-medium">
                £{(accountPlans.length > 0 && accountPlans[1].price.toFixed(2)) || 0} (
                {(accountPlans.length > 0 && accountPlans[1].credits) || 0} credits)
              </p>
              <button
                className="px-4 py-2 font-medium text-white bg-green-600 rounded-md text-md"
                onClick={() => handleBuy('purchase')}
              >
                Buy now
              </button>
            </div>
            <div className="p-5 text-center border rounded-lg shadow-md">
              <h4 className="mb-2 text-lg font-semibold">Subscription:</h4>
              <p className="mb-4 text-sm font-medium">
                £{(accountPlans.length > 0 && accountPlans[0].price.toFixed(2)) || 0}/month (
                {(accountPlans.length > 0 && accountPlans[0].credits) || 0}
                credits)
              </p>
              {accountPlans[0] && accountPlans[0].price_id === user.plan_id ? (
                <button
                  className="px-4 py-2 font-medium text-white bg-red-600 rounded-md text-md disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="px-4 py-2 font-medium text-white bg-green-600 rounded-md text-md disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => handleBuy('subscription')}
                >
                  Subscript now
                </button>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Account;
