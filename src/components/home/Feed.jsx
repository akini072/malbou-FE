import React from 'react';
import { useWindowSize } from 'hooks/useWindowSize';

import { BsThreeDots, BsHeart } from 'react-icons/bs';
import { BiUpload } from 'react-icons/bi';

import User from 'assets/images/user.svg';
import PaintImg from 'assets/images/paint.png';

const Feed = () => {
  const [width] = useWindowSize();

  return (
    <div className="flex items-start w-full mb-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 overflow-hidden rounded-full">
        <img alt="avt" src={User} className="w-full" />
      </div>
      <div
        className="w-full border-b border-gray-300 dark:border-gray-50"
        style={{ maxWidth: `calc(100% - ${width > 320 ? 60 : 52}px)` }}
      >
        <div className="flex items-center">
          <p className="text-[12px] font-medium mr-[6px]">Lara Smith</p>
          <p className="text-[12px] text-[#9AA4B2] font-normal">mymarvinai &sdot; 4h</p>

          <button className="ml-auto">
            <BsThreeDots />
          </button>
        </div>
        <div className="w-full">
          <p className="mb-1 font-semibold text-black dark:text-white">
            Painting of a car in the style of Monet
          </p>
          <div className="w-full">
            <img alt="" src={PaintImg} className="w-full" />
          </div>
        </div>
        <div className="flex items-center w-full my-4">
          <button className="inline-flex items-center">
            <BsHeart />{' '}
            <span className="text-[12px] text-gray-600 dark:text-[#9AA4B2] ml-[7px]">7</span>
          </button>
          <button className="ml-auto">
            <BiUpload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
