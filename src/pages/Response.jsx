import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'stores/user';
import { getResponse } from 'stores/ai';

import { Modal } from 'common';

const Response = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);
  const { response } = useSelector((state) => state.aiStore);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getResponse());
  }, []);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else if (user && !user.verify) {
      navigate('/welcome');
    }
  }, [user]);

  const handleToggleModal = () => {
    setOpen(!open);
  };

  const handleView = () => {
    navigate('/response');
  };

  return (
    <div className="w-full">
      <div className="w-full px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
        <div className="w-full">
          {response.length > 0 &&
            response.map((item, i) => {
              const type = item.type;
              const data = type === 'images' ? item.data.data : item.data.choices;
              return (
                <div className="w-full mb-8" key={i}>
                  <div className="mb-3">
                    <p className="w-full mb-2 text-base">You asked:</p>
                    <div className="inline-flex w-auto max-w-3xl px-4 py-2 text-base font-medium bg-gray-100 border shadow-sm rounded-3xl">
                      {item.asked || ''}
                    </div>
                  </div>
                  <div className="mb-3 text-right">
                    <p className="w-full mb-2 text-base text-right">Responded:</p>
                    {data.length > 0 &&
                      data.map((choice, t) => {
                        if (type === 'images') {
                          return (
                            <div
                              className="inline-block w-full max-w-lg overflow-hidden border shadow-sm rounded-xl"
                              key={t}
                            >
                              <img alt="" src={choice.url} className="w-full" />
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="inline-flex w-auto max-w-3xl px-4 py-2 text-base font-medium text-left whitespace-pre-line bg-green-100 border shadow-sm rounded-xl"
                              key={t}
                            >
                              {choice.text}
                            </div>
                          );
                        }
                      })}
                    {/* {item.data &&
                      item.data.choices &&
                      item.data.choices.length > 0 &&
                      item.data.choices.map((choice, t) => (
                        <div
                          className="inline-flex w-auto px-4 py-2 text-base font-medium bg-green-100 border rounded-md shadow-sm"
                          key={t}>
                          {choice.text}
                        </div>
                      ))} */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleToggleModal}
        title="Create more for free."
        content={
          <div className="w-full text-center">
            <button
              onClick={handleView}
              className="w-auto px-4 py-2 mx-auto mt-4 mb-2 text-white bg-green-600 border-none rounded-md"
            >
              Get your own myMarvin
            </button>
          </div>
        }
      />
    </div>
  );
};

export default Response;
