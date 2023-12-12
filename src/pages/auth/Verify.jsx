import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // check token and verify account
    }
  }, [token]);

  return (
    <div className="w-full">
      <div className="w-full px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl p-10 mx-auto text-center border rounded-lg shadow-lg">
          <h3 className="mb-6 text-4xl font-bold">Your account has been verified!</h3>
          <p className="mb-6 text-lg font-medium">Start exploring with us</p>
          <div>
            <Link
              to="/home"
              className="inline-flex px-6 py-2 text-base font-medium text-white bg-green-500 rounded-md"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
