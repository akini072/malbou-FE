import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import FeedImg from 'assets/images/paint.png';
//import User from 'assets/images/user.svg';
import { formatDistanceToNow } from 'date-fns';

const GridItem = ({ item, tags }) => {
  return (
    <div className="w-full">
      <Link
        to={`/saved/${item._id}`}
        className="my-2 inline-block font-semibold text-[14px] text-black dark:text-white w-full"
      >
        {item && (item.type === 'text' || item.type == 'chat') ? (
          <div
            style={{
              boxShadow: '0px -22px 5px 0px rgba(140,140,140,0.34) inset'
            }}
            className="w-full overflow-hidden rounded-lg p-4 border border-gray-400 dark:border-gray-50 h-[160px] bg-gray-50 dark:bg-[#202939]"
          >
            <p>{item.value}</p>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg h-[160px]">
            <img alt="" src={(item && item.value) || ''} className="w-full h-full" />
          </div>
        )}
      </Link>
      <Link
        to={`/saved/${item._id}`}
        className="my-2 inline-block font-semibold text-[14px] text-black dark:text-white"
      >
        {item.prompt ? item.prompt : 'unknown title'}
      </Link>
      <div className="flex flex-wrap items-center mb-1">
        {/*<img className="w-4 h-4 mr-1" alt="" src={User} />
        <p className="font-medium text-[12px]">mypersonalai</p>*/}
        <>
          {item.tags.map(
            (tag, ind) =>
              tags.filter((t) => t._id == tag)[0] && (
                <p
                  key={ind}
                  className="inline-flex items-center justify-center mr-2 rounded-3xl py-[2px] px-2 sm:px-[10px] font-medium heading-[20px] text-sm text-[#CDD5DF] bg-[#364152]"
                >
                  {tags.filter((t) => t._id == tag)[0]
                    ? tags.filter((t) => t._id == tag)[0]['label']
                    : ''}
                </p>
              )
          )}
        </>
      </div>
      <p className="text-[12px] text-[#9AA4B2]">
        {item.type} &sdot; {formatDistanceToNow(new Date(item.createdAt)).toString()}
      </p>
    </div>
  );
};

GridItem.propTypes = {
  item: PropTypes.any,
  tags: PropTypes.any
};

export default GridItem;
