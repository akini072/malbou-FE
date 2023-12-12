import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { getSavedDetail } from 'stores/saved';
import { getMessage } from 'stores/room';

import Background from 'assets/images/get-started.png';
import { useWindowSize } from 'hooks/useWindowSize';
import { formatDistanceToNow } from 'date-fns';

const SharedDetail = () => {
  const navigate = useNavigate();
  const [width] = useWindowSize();
  const { id } = useParams();
  const dispatch = useDispatch();
  //const { saved } = useSelector((state) => state.savedStore);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(0);
  const shareId = id;

  useEffect(() => {
    const getData = async () => {
      //if (type == 'saved') {
      //  const res = await dispatch(getSavedDetail(shareId));
      //  console.log(res.payload, '---');
      //  setData(res.payload);
      //} else if (type == 'message') {

      //}
      const res = await dispatch(getMessage({ id: shareId }));
      setIsLoading(1);
      setData(res.payload);
      console.log(res.payload.response?.choices[0].text);
    };
    getData();
  }, []);

  console.log(data);

  return (
    <div
      className="w-full relative !bg-cover overflow-auto"
      style={{
        background: `url(${Background}) no-repeat center bottom`,
        height: `calc(100vh - ${width > 640 ? '117px' : '69px'})`
      }}
    >
      {isLoading == 0 ? (
        <>
          <div className="flex items-center justify-center p-6">
            <h1>Loading...</h1>
          </div>
        </>
      ) : (
        <>
          {data && data.shared ? (
            <>
              <div className="flex items-center justify-center p-6">
                <h3 className="mt-5 font-bold text-sm text-black dark:text-[#F9F5FF] mx-auto max-w-[150px] overflow-hidden whitespace-nowrap truncate">
                  {data?.prompt || 'unknown title'}
                </h3>
              </div>

              <div className="px-4 sm:px-6">
                {data && (data.type === 'text' || data.type === 'chat') ? (
                  <div className="w-full overflow-hidden rounded-lg p-4 border border-gray-400 dark:border-gray-50 h-[200px] overflow-y-auto bg-gray-50 dark:bg-[#202939]">
                    {data?.value ? (
                      <p>{data?.value || ''}</p>
                    ) : (
                      <p>{data?.response?.choices[0].text || ''}</p>
                    )}
                  </div>
                ) : (
                  <div className="w-full overflow-hidden rounded-lg">
                    <img
                      alt=""
                      src={
                        data?.value
                          ? data?.value
                          : data?.image
                          ? `${process.env.REACT_APP_CLOUNDFRONT_AWS}${data?.image.Key}`
                          : ''
                      }
                      className="w-full"
                    />
                  </div>
                )}

                <h3 className="mt-3 mb-2 text-2xl font-semibold">
                  {data?.prompt || 'unknown title'}
                </h3>
                <p className="text-[12px] text-gray-600 dark:text-[#9AA4B2]">
                  {data?.type || ''} &sdot;{' '}
                  {formatDistanceToNow(
                    data?.createdAt ? new Date(data?.createdAt) : new Date()
                  ).toString()}
                </p>
                {data?.roomId && (
                  <p className="text-base text-black dark:text-[#EEF2F6] my-6">
                    {data?.roomId?.title}
                  </p>
                )}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#1570EF] rounded-full overflow-hidden p-3 mt-6 text-white text-lg font-medium"
                    onClick={() => navigate('/')}
                  >
                    Get your own myMarvin account
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center p-6">
                <h1>You can not see this message</h1>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SharedDetail;
