import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import moment from 'moment';

const ChatItem = ({ title, id, type, isGeneral, onDelete, onEdit }) => {
  return (
    <div className="flex items-center w-full mt-2 mb-2">
      <div className="inline-flex items-center justify-center w-8 h-8 mr-3 overflow-hidden">
        {type === 'images' ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 21 20"
            fill="none"
            className="stroke-[#111] dark:stroke-[#e7e7e7]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.7 19H5.43138C4.82557 19 4.52266 19 4.38239 18.8802C4.26069 18.7763 4.1961 18.6203 4.20866 18.4608C4.22313 18.2769 4.43732 18.0627 4.8657 17.6343L13.3686 9.13137C13.7647 8.73536 13.9627 8.53735 14.191 8.46316C14.3918 8.3979 14.6082 8.3979 14.809 8.46316C15.0374 8.53735 15.2354 8.73535 15.6314 9.13137L19.5 13V14.2M14.7 19C16.3802 19 17.2202 19 17.862 18.673C18.4265 18.3854 18.8854 17.9265 19.173 17.362C19.5 16.7202 19.5 15.8802 19.5 14.2M14.7 19H6.30001C4.61985 19 3.77978 19 3.13804 18.673C2.57355 18.3854 2.11461 17.9265 1.82699 17.362C1.50001 16.7202 1.50001 15.8802 1.50001 14.2V5.8C1.50001 4.11984 1.50001 3.27976 1.82699 2.63803C2.11461 2.07354 2.57355 1.6146 3.13804 1.32698C3.77978 1 4.61985 1 6.30001 1H14.7C16.3802 1 17.2202 1 17.862 1.32698C18.4265 1.6146 18.8854 2.07354 19.173 2.63803C19.5 3.27976 19.5 4.11984 19.5 5.8V14.2M9.00001 6.5C9.00001 7.60457 8.10458 8.5 7.00001 8.5C5.89544 8.5 5.00001 7.60457 5.00001 6.5C5.00001 5.39543 5.89544 4.5 7.00001 4.5C8.10458 4.5 9.00001 5.39543 9.00001 6.5Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 21 20"
            fill="none"
            className="stroke-[#111] dark:stroke-[#e7e7e7]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.16667 6.5H10.1667M5.16667 10H13.1667M5.16667 16V18.3355C5.16667 18.8684 5.16667 19.1348 5.2759 19.2716C5.37089 19.3906 5.51494 19.4599 5.66721 19.4597C5.8423 19.4595 6.05034 19.2931 6.46643 18.9602L8.85188 17.0518C9.33919 16.662 9.58284 16.4671 9.85416 16.3285C10.0949 16.2055 10.3511 16.1156 10.6159 16.0613C10.9143 16 11.2264 16 11.8504 16H14.3667C16.0468 16 16.8869 16 17.5286 15.673C18.0931 15.3854 18.5521 14.9265 18.8397 14.362C19.1667 13.7202 19.1667 12.8802 19.1667 11.2V5.8C19.1667 4.11984 19.1667 3.27976 18.8397 2.63803C18.5521 2.07354 18.0931 1.6146 17.5286 1.32698C16.8869 1 16.0468 1 14.3667 1H5.96667C4.28651 1 3.44644 1 2.8047 1.32698C2.24021 1.6146 1.78127 2.07354 1.49365 2.63803C1.16667 3.27976 1.16667 4.11984 1.16667 5.8V12C1.16667 12.93 1.16667 13.395 1.26889 13.7765C1.5463 14.8117 2.35494 15.6204 3.39021 15.8978C3.77171 16 4.2367 16 5.16667 16Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          // <svg
          //   viewBox="0 0 21 21"
          //   fill="none"
          //   stroke="currentColor"
          //   xmlns="http://www.w3.org/2000/svg"
          //   className="text-black"
          // >
          //   <path
          //     d="M5.16667 6.5H10.1667M5.16667 10H13.1667M5.16667 16V18.3355C5.16667 18.8684 5.16667 19.1348 5.2759 19.2716C5.37089 19.3906 5.51494 19.4599 5.66721 19.4597C5.8423 19.4595 6.05034 19.2931 6.46643 18.9602L8.85188 17.0518C9.33919 16.662 9.58284 16.4671 9.85416 16.3285C10.0949 16.2055 10.3511 16.1156 10.6159 16.0613C10.9143 16 11.2264 16 11.8504 16H14.3667C16.0468 16 16.8869 16 17.5286 15.673C18.0931 15.3854 18.5521 14.9265 18.8397 14.362C19.1667 13.7202 19.1667 12.8802 19.1667 11.2V5.8C19.1667 4.11984 19.1667 3.27976 18.8397 2.63803C18.5521 2.07354 18.0931 1.6146 17.5286 1.32698C16.8869 1 16.0468 1 14.3667 1H5.96667C4.28651 1 3.44644 1 2.8047 1.32698C2.24021 1.6146 1.78127 2.07354 1.49365 2.63803C1.16667 3.27976 1.16667 4.11984 1.16667 5.8V12C1.16667 12.93 1.16667 13.395 1.26889 13.7765C1.5463 14.8117 2.35494 15.6204 3.39021 15.8978C3.77171 16 4.2367 16 5.16667 16Z"
          //     strokeWidth="2"
          //     strokeLinecap="round"
          //     strokeLinejoin="round"
          //   />
          // </svg>
        )}
      </div>

      <div
        className="w-full"
        style={{
          width: `calc(100% - ${isGeneral ? '0px' : '40px'})`
        }}
      >
        <div className="flex items-center pb-1">
          <div
            style={{
              width: `calc(100% - ${isGeneral ? '0px' : '48px'})`
            }}
          >
            <Link
              to={`/chats/${id}?type=${type}`}
              className="inline-block w-[95%] overflow-hidden text-base font-semibold text-black truncate cursor-pointer dark:text-white whitespace-nowrap"
            >
              {title}
            </Link>
            {/* <p className="text-[12px] text-gray-600 dark:text-[#9AA4B2] font-normal">
              {message.prompt}
            </p> */}
          </div>

          {!isGeneral && (
            <div className="w-12 ml-auto text-right">
              {/* <p className="text-[12px] text-[#53B1FD] mb-1">{moment(updatedAt).fromNow()}</p>
            <p className="w-[18px] h-[18px] rounded-full overflow-hidden bg-[#175CD3] text-[12px] text-[#D1E9FF] font-bold inline-flex justify-center items-center">
              {total}
            </p> */}
              <div className="">
                <button onClick={onEdit}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button className="ml-1" onClick={onDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ChatItem.propTypes = {
  id: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.object,
  total: PropTypes.number,
  onDelete: PropTypes.function | null,
  onEdit: PropTypes.function | null,
  updatedAt: PropTypes.any,
  isGeneral: PropTypes.bool,
  type: PropTypes.string | PropTypes.any
};

export default ChatItem;
