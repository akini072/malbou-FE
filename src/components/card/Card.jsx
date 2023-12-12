import PropTypes from 'prop-types';

import { ReactComponent as CloseIcon } from 'assets/images/closeIcon.svg';
import dayjs from 'dayjs';

export const Card = ({ item, isLogin }) => {
  return (
    <div className="w-[272px] h-96 rounded-2xl bg-slate-700 p-4 flex flex-col justify-between flex-none">
      <div className="flex gap-3 flex-col">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="flex flex-col justify-center w-8">
              <img src={item.picturePage} className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <p className="text-sm text-white">{item.namePage}</p>
              <p className="text-sm text-gray-300">
                {dayjs(item?.updatedAt).format('dddd of hh:mm A')}
              </p>
            </div>
          </div>
          <button className="flex justify-start" disabled={!isLogin}>
            <CloseIcon />
          </button>
        </div>
        <p className="text-sm text-white">{item.message}</p>
      </div>
      <div className="flex flex-col gap-4">
        <img src={item.images[0]} className="h-40 w-full rounded-lg" />
        <div className="flex gap-3">
          <button className="bg-white text-gray-700 px-3 py-0.5 rounded-2xl" disabled={!isLogin}>
            Post
          </button>
          <button
            className="bg-green-50 text-green-700 px-3 py-0.5 rounded-2xl"
            disabled={!isLogin}
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.any,
  isLogin: PropTypes.bool
};
