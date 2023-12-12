import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'stores/user';
// import { ComingSoon } from 'common';
import { useWindowSize } from 'hooks/useWindowSize';

import GridItem from 'components/saved/GridItem';
import ListItem from 'components/saved/ListItem';

import Background from 'assets/images/get-started.png';
import { getAllSaved, getSavedByFilter, getSavedByPage } from 'stores/saved';
import { getAllTags } from 'stores/tag';

const Saved = () => {
  const navigate = useNavigate();
  const [width] = useWindowSize();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);
  const [isGrid, setIsGrid] = useState(true);
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [active, setActive] = useState(false);
  const [recent, setRecent] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (pageNum) => {
    const res = await dispatch(getSavedByPage({ pageNum }));
    setData([...data, ...res.payload]);
  };

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else {
      fetchData(page);
      if (!user.verify) {
        return navigate('/welcome');
      }
    }
  }, [user]);

  const infiniteScroll = (e) => {
    // End of the document reached?
    if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
      let newPage = page;
      newPage++;
      setPage(newPage);
      fetchData(newPage);
    }
  };

  useEffect(() => {
    const getTagsFun = async () => {
      const res = await dispatch(getAllTags());
      setTags(res.payload);
    };
    getTagsFun();
  }, []);

  const handleToggleView = () => {
    setIsGrid(!isGrid);
  };

  const Filter = async (value) => {
    if (activeTag == value) {
      const res = await dispatch(getAllSaved());
      setData(res.payload);
      setActive(false);
    } else {
      const res = await dispatch(getSavedByFilter({ tag: value }));
      setData(res.payload);
      setActive(true);
    }
    setActiveTag(value);
  };

  const sortRecent = async () => {
    var x = data;
    var y = [...x].reverse();
    setData(y);
    setRecent(!recent);
  };

  return (
    <div
      className="w-full px-4 sm:px-6 py-10 !bg-contain overflow-auto"
      style={{
        background: `url(${Background}) no-repeat center 140%`,
        height: `calc(100vh - ${width > 640 ? '117px' : '69px'})`
      }}
      onScroll={(e) => infiniteScroll(e)}
    >
      <div className="flex items-center mb-4">
        {user && user.avatar ? (
          <img
            alt="avatar"
            src={user.avatar.Location}
            className="object-cover w-8 h-8 overflow-hidden rounded-full"
          />
        ) : (
          <img
            alt="avatar"
            src="https://mymarvin-storage.s3.amazonaws.com/ai_profile/default_logo.png"
            className="object-contain w-8 h-8 overflow-hidden"
          />
        )}
        <h3 className="ml-2 text-2xl font-semibold text-black dark:text-white">Saved</h3>
        <button className="ml-auto">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg> */}
        </button>
      </div>
      {/* filters */}
      <div className="flex items-center w-full flex-wrap">
        {tags.map((item, i) => (
          <p
            key={i}
            className={`inline-flex items-center mb-1 justify-center mr-2 rounded-3xl py-[2px] px-2 sm:px-[10px] font-medium heading-[20px] text-sm hover:cursor-pointer ${
              item.value === activeTag && active
                ? 'text-[#FFFFFF] bg-[#1570EF]'
                : 'text-[#CDD5DF] bg-[#364152]'
            }`}
            onClick={() => Filter(item.value)}
          >
            {item.label}
          </p>
        ))}
      </div>

      {/* actions */}
      <div className="flex items-center w-full my-5">
        <p className="text-[12px] font-medium inline-flex items-center" onClick={sortRecent}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
          Sort
        </p>

        <button className="ml-auto" onClick={handleToggleView}>
          {isGrid ? (
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
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          ) : (
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
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* view grid/list */}
      <div className="w-full">
        {isGrid ? (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {data !== [] && data.map((item, i) => <GridItem item={item} tags={tags} key={i} />)}
          </div>
        ) : (
          <div className="w-full">
            {data !== [] && data.map((item, i) => <ListItem item={item} tags={tags} key={i} />)}
          </div>
        )}
      </div>

      {/* <ComingSoon /> */}
    </div>
  );
};

export default Saved;
