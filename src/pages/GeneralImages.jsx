import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms, resetRoom, getRoomsGeneral } from 'stores/room';
import { getProfile } from 'stores/user';
import { toast } from 'react-toastify';
import { useWindowSize } from 'hooks/useWindowSize';
import Room from './Room';

// import Avatar from 'assets/images/avatar.svg';
// import User from 'assets/images/user.svg';
// import User1 from 'assets/images/user1.svg';
import Background from 'assets/images/get-started.png';

const GeneralImages = () => {
  const navigate = useNavigate();
  const [width] = useWindowSize();
  const dispatch = useDispatch();
  const { roomsGeneral, isUpdated, isDeleted, isCreated, newRoom } = useSelector(
    (state) => state.roomStore
  );

  const { user } = useSelector((state) => state.userStore);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else {
      if (!user.verify) {
        return navigate('/welcome');
      }
    }
  }, [user]);

  useEffect(() => {
    if (isCreated) {
      // toast.success('Created new room');
      navigate(`/chats/${newRoom._id}`);
    }
    return () => {
      dispatch(resetRoom());
    };
  }, [isCreated]);

  useEffect(() => {
    dispatch(getRoomsGeneral());
    return () => {
      dispatch(resetRoom());
    };
  }, []);

  useEffect(() => {
    if (isUpdated) {
      toast.success('Updated title successfully');
      dispatch(getRooms());
    }
    return () => {
      dispatch(resetRoom());
    };
  }, [isUpdated]);

  useEffect(() => {
    if (isDeleted) {
      toast.success('Deleted successfully');
      dispatch(getRooms());
    }
    return () => {
      dispatch(resetRoom());
    };
  }, [isDeleted]);

  return (
    <div
      className="w-full flex flex-col pt-8 !bg-cover relative"
      style={{
        background: `url(${Background}) no-repeat center bottom`,
        height: `calc(100vh - ${width > 768 ? '64px' : width > 640 ? '117px' : '69px'})`
      }}
    >
      {/* <div className="flex items-center mb-4">
        <img alt="avatar" src={Avatar} className="w-8 h-8 overflow-hidden rounded-full" />
        <h3 className="ml-2 text-2xl font-semibold text-white">Chats</h3>
      </div> */}
      <div className="h-full">
        <div className="flex items-start px-3 mb-2">
          <div className="flex items-center mr-6 text-center">
            {user && user.avatar ? (
              <img
                alt="avatar"
                src={user.avatar.Location}
                className={`w-10 h-10 sm:w-16 sm:h-16 mx-auto border-2 p-[1px] object-cover overflow-hidden border-transparent cursor-pointer rounded-full border-green-500`}
              />
            ) : (
              <img
                alt="avatar"
                src="https://mymarvin-storage.s3.amazonaws.com/ai_profile/default_logo.png"
                className={`w-10 h-10 sm:w-16 sm:h-16 mx-auto border-2 p-[1px] object-contain overflow-hidden border-transparent cursor-pointer`}
              />
            )}
            <h3 className="ml-2 text-2xl font-semibold text-black dark:text-white">Images</h3>
          </div>
        </div>
        <div className="w-full" style={{ height: 'calc(100% - 48px)' }}>
          {roomsGeneral.length > 0 && <Room type="images" id={roomsGeneral[1]._id} />}
        </div>
      </div>
    </div>
  );
};

export default GeneralImages;
