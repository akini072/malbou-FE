import React from 'react';
import { Link } from 'react-router-dom';
// import FeedImg from 'assets/images/paint.png';
//import User from 'assets/images/user.svg';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const ListItem = ({ item, tags }) => {
  return (
    <div className="flex items-center w-full mb-4">
      <Link
        to={`/saved/${item._id}`}
        className="my-2 inline-block font-semibold text-[14px] text-black dark:text-white"
      >
        {item && (item.type === 'text' || item.type === 'chat') ? (
          <div className="w-[90px] h-[90px] rounded-lg overflow-hidden mr-3 p-2 border border-gray-400 dark:border-gray-50  bg-gray-50 dark:bg-[#202939] text-[12px]">
            <p>{item.value}</p>
          </div>
        ) : (
          <div className="w-[90px] h-[90px] rounded-lg overflow-hidden mr-3">
            <img alt="" src={(item && item.value) || ''} className="w-full h-full" />
          </div>
        )}
      </Link>
      <div>
        <Link
          to={`/saved/${item._id}`}
          className="my-2 inline-block font-semibold text-[14px] text-black dark:text-white"
        >
          {item.prompt ? item.prompt : 'unknown title'}
        </Link>
        <div className="flex items-center mb-1 flex-wrap">
          {/*<img className="w-4 h-4 mr-1" alt="" src={User} />*/}
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
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.any,
  tags: PropTypes.any
};

export default ListItem;
