import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedDetail, resetSaved } from 'stores/saved';
import { createShared } from 'stores/share';

import Background from 'assets/images/get-started.png';
import { useWindowSize } from 'hooks/useWindowSize';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { copyImageToClipboard } from 'copy-image-clipboard';
import { ReactComponent as CopyIcon } from '../assets/images/copy-icon.svg';

const FeedDetail = () => {
  const navigate = useNavigate();
  const [width] = useWindowSize();
  const { savedId } = useParams();
  const dispatch = useDispatch();
  const { saved } = useSelector((state) => state.savedStore);
  const [linkShare, setLinkShare] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getSavedDetail(savedId));
    createLinkShare();

    return () => {
      dispatch(resetSaved());
    };
  }, []);

  const createLinkShare = async () => {
    const shared = await dispatch(createShared({ id: savedId, type: 'saved' }));
    console.log(shared.payload);

    if (shared.payload._id) {
      const text = `${process.env.REACT_APP_BUSINESS_URL}/shared/${shared.payload._id}`;
      console.log('text');
      setLinkShare(text);
    }
  };

  const shareMessage = async () => {
    navigator.clipboard.writeText(linkShare);
    toast.success(linkShare);
  };

  const contentCopy = async () => {
    if (saved.type == 'images') {
      //const img = await fetch(saved.value);
      //const imgBlob = await img.blob();
      console.log('der: ', saved);

      // const data = await fetch(saved.value);
      // const blob = await data.blob();
      // console.log('blob: ', blob);
      // await navigator.clipboard.write([
      //   new ClipboardItem({
      //     [blob.type]: blob
      //   })
      // ]);
      // console.log('Image copied!');
      // toast.success('The Image is copied!');

      copyImageToClipboard(saved.value)
        .then(() => {
          toast.success('The Image is copied!');
        })
        .catch((e) => {
          console.log('Error: ', e.message);
        });
    } else {
      navigator.clipboard.writeText(saved?.value);
      toast.success('The chat is copied!');
    }
  };

  return (
    <div
      className="w-full relative !bg-cover overflow-auto"
      style={{
        background: `url(${Background}) no-repeat center bottom`,
        height: `calc(100vh - ${width > 640 ? '117px' : '69px'})`
      }}
    >
      <div className="flex items-center justify-center p-6">
        <button onClick={handleBack} className="w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <h3 className="font-bold text-sm text-black dark:text-[#F9F5FF] mx-auto max-w-[150px] overflow-hidden whitespace-nowrap truncate">
          {saved?.prompt || 'unknown title'}
        </h3>

        <button onClick={() => shareMessage()}>
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </button>
      </div>

      <div className="px-4 sm:px-6">
        {saved && (saved.type === 'text' || saved.type === 'chat') ? (
          <div className="w-full overflow-hidden rounded-lg p-4 border border-gray-400 dark:border-gray-50 h-[200px] overflow-y-auto bg-gray-50 dark:bg-[#202939]">
            <p>{saved?.value || ''}</p>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg">
            <img alt="dser" src={saved?.value || ''} className="w-full" />
          </div>
        )}

        <h3 className="mt-3 mb-2 text-2xl font-semibold">{saved?.prompt || 'unknown title'}</h3>
        <div className="flex justify-between">
          <p className="text-[12px] text-gray-600 dark:text-[#9AA4B2]">
            {saved?.type || ''} &sdot;{' '}
            {formatDistanceToNow(
              saved?.createdAt ? new Date(saved?.createdAt) : new Date()
            ).toString()}
          </p>
          <button className="text-white" onClick={() => contentCopy()}>
            <CopyIcon className="w-5 h-5 text-white dark:fill-white" />
          </button>
        </div>
        <p className="text-base text-black dark:text-[#EEF2F6] my-6">{saved?.roomId?.title}</p>

        {/* <div className="flex items-center mb-2">
          <h4 className="text-lg font-semibold">Ideas</h4>
          <button className="font-semibold text-sm text-[#53B1FD] ml-auto inline-flex items-center">
            <FaDiceFive className="mr-2 text-lg" /> Randomise
          </button>
        </div>

        <div className="grid w-full grid-cols-2 gap-4">
          <div>
            <div className="w-full overflow-hidden rounded-lg">
              <img alt="" src={Feed2} className="w-full" />
            </div>
            <h4 className="my-2 text-sm font-semibold">Order a gift card</h4>
            <p className="text-[12px] text-gray-600 dark:text-[#9AA4B2]">£4.99 &sdot; Moonpig</p>
          </div>
          <div>
            <div className="w-full overflow-hidden rounded-lg">
              <img alt="" src={Feed3} className="w-full" />
            </div>
            <h4 className="my-2 text-sm font-semibold">Order a print</h4>
            <p className="text-[12px] text-[#9AA4B2]">£4.99 &sdot; Vistaprint</p>
          </div>
        </div> */}

        <div>
          <button
            type="submit"
            className="w-full bg-[#1570EF] rounded-full overflow-hidden p-3 mt-6 text-white text-lg font-medium"
            onClick={() => shareMessage()}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
