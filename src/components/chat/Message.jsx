import React from 'react';
import PropTypes from 'prop-types';

import TailBlue from 'assets/images/tail-blue.svg';
import TailGray from 'assets/images/tail-gray.svg';

const Message = ({ me, type, children }) => {
  return (
    <div className={`flex ${me ? 'justify-end' : 'justify-start'} mb-3 text-white relative z-10`}>
      <div
        className={`rounded-xl ${me ? 'bg-[#1570EF]' : 'bg-[#364152]'} ${
          type === 'images' ? 'p-1' : 'px-3 py-[6px]'
        } font-normal text-base max-w-[70%] relative`}
      >
        {children}

        {me ? (
          <img className="absolute bottom-0 -right-1 -z-10" alt="" src={TailBlue} />
        ) : (
          <>
            <img className="absolute bottom-0 -left-1 -z-10" alt="" src={TailGray} />
          </>
        )}
      </div>
    </div>
  );
};

Message.propTypes = {
  me: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.string
};

export default Message;
