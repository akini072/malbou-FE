import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getRooms,
  resetRoom,
  updateTitleOfRoom,
  deleteRoom,
  getRoomsGeneral,
  createRoom
  //createRoom
} from 'stores/room';
import { getProfile } from 'stores/user';
import { Modal, Input } from 'common';
import ChatItem from 'components/chat/ChatItem';
import { toast } from 'react-toastify';
import { useWindowSize } from 'hooks/useWindowSize';
//import { Tab } from '@headlessui/react';
//import Room from './Room';

// import Avatar from 'assets/images/avatar.svg';
// import User from 'assets/images/user.svg';
// import User1 from 'assets/images/user1.svg';
import Background from 'assets/images/get-started.png';

const ChatLists = () => {
  const navigate = useNavigate();
  const [width] = useWindowSize();
  //const [searchParams, setSearchParams] = useSearchParams();
  // const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [openNew, setOpenNew] = useState(false);
  const dispatch = useDispatch();
  const { rooms, isUpdated, isDeleted, isCreated, newRoom } = useSelector(
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
    dispatch(getRooms());
    dispatch(resetRoom());
  }, []);

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

  const handleToggleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSaveTitle = () => {
    dispatch(updateTitleOfRoom({ roomId: idEdit, title }));
    handleToggleEdit();
  };

  const handleEdit = (id, title) => {
    setOpenEdit(true);
    setIdEdit(id);
    setTitle(title);
  };

  const handleToggleModal = () => {
    setOpen(!open);
  };

  const handleDelete = (id) => {
    setSelected(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    setOpen(false);
    dispatch(deleteRoom(selected));
  };

  const handleToggleCreate = () => {
    // navigate('/chats/new')
    console.log(openNew);
    setOpenNew(!openNew);
  };

  const handleNew = (type) => {
    // navigate(`/chats/new?type=${type}`);
    dispatch(createRoom(type));
  };

  //const handleChangeTab = (tab) => {
  //  setTab(tab);
  //  if (tab === 2) {
  //  } else {
  //    if (searchParams.has('tab')) {
  //      searchParams.delete('tab');
  //      setSearchParams(searchParams);
  //    }
  //  }
  //};

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
            <h3 className="ml-2 text-2xl font-semibold text-black dark:text-white">Chat Lists</h3>
          </div>
        </div>
        <div className="w-full" style={{ height: 'calc(100% - 48px)' }}>
          <div className="px-4 overflow-auto sm:px-6 mt-8">
            {rooms && rooms.length > 0 ? (
              rooms.map(({ _id, title, type, messages, updatedAt }, i) => (
                <ChatItem
                  id={_id}
                  key={i}
                  type={type || 'text'}
                  updatedAt={updatedAt}
                  title={title}
                  // total={messages.length}
                  message={messages[0]}
                  onDelete={() => handleDelete(_id)}
                  onEdit={() => handleEdit(_id, title)}
                />
              ))
            ) : (
              <p className="py-8 max-w-[300px] text-center mx-auto">{`To create a topic specific chat or image please select "New topic" below`}</p>
            )}
          </div>
          <div
            className={`mt-auto fixed z-40 left-0 right-0 px-4 pb-6 ${
              width > 768 ? 'bottom-6' : width > 640 ? 'bottom-[117px]' : 'bottom-[69px]'
            } sm:px-6 bg-[#12192603] py-2`}
          >
            <button
              onClick={handleToggleCreate}
              className="w-full bg-[#1570EF] rounded-full overflow-hidden p-3 text-white text-lg font-medium"
            >
              New Topic
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={openEdit}
        onClose={handleToggleEdit}
        onSave={handleSaveTitle}
        title="Update Title"
        content={
          <div className="">
            <Input
              className="px-2 text-black dark:text-white"
              name="title"
              value={title}
              onChange={handleChangeTitle}
              placeholder="Subject"
            />
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={handleToggleEdit}
                className="box-border px-4 py-2 text-red-600 bg-white rounded-md"
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 rounded-md bg-[#1570EF] text-white font-medium ml-4"
                onClick={handleSaveTitle}
              >
                Save
              </button>
            </div>
          </div>
        }
        actions={null}
      />

      <Modal
        open={open}
        onClose={handleToggleModal}
        onSave={handleToggleModal}
        title="Are you sure?"
        content={
          <div className="flex items-center justify-center">
            <button
              className="px-4 py-2 mr-4 font-medium text-white bg-red-600 rounded-md"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
            <button
              onClick={handleToggleModal}
              className="box-border px-4 py-2 text-red-600 bg-white rounded-md"
            >
              Cancel
            </button>
          </div>
        }
        actions={null}
      />

      <Modal
        open={openNew}
        onClose={handleToggleCreate}
        onSave={handleToggleCreate}
        title="Select option"
        content={
          <div className="flex items-center justify-center">
            <button
              className="w-24 px-4 py-2 mr-4 font-medium text-green-600 border border-green-600 rounded-md bg-none"
              onClick={() => handleNew('text')}
            >
              Chat
            </button>
            <button
              className="w-24 px-4 py-2 font-medium text-green-600 border border-green-600 rounded-md bg-none"
              onClick={() => handleNew('images')}
            >
              Images
            </button>
          </div>
        }
        actions={null}
      />
    </div>
  );
};

export default ChatLists;
