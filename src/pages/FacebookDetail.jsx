import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { getFacebookFeed, deleteFacebookFeet, publishFacebookFeed } from 'stores/facebook';
import { CreatePost } from './CreatePost';

import { ReactComponent as EditIcon } from 'assets/images/editIcon.svg';
import { ReactComponent as TrashIcon } from 'assets/images/trashIcon.svg';
import { ReactComponent as CopyIcon } from 'assets/images/copyIcon.svg';
import { ReactComponent as PlusIcon } from 'assets/images/plusIcon.svg';
import { ReactComponent as ArrowUp } from 'assets/images/arrowUp.svg';

const FacebookDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { feeds, loading, pages } = useSelector((state) => state.facebookStore);
  const currentData = feeds?.totalData - (feeds.page + 1) * feeds.perPage;
  const pageToken = pages.data.find((item) => item.id === id);

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataPost, setDataPost] = useState(null);
  const [page, setPage] = useState({
    page: 0,
    pageSize: 10
  });

  const onHandleNextPage = () => {
    setPage({
      page: page.page + 1,
      pageSize: page.pageSize
    });
  };

  const onHandlePreviousPage = () => {
    setPage({
      page: page.page - 1,
      pageSize: page.pageSize
    });
  };

  const onHandleRowPage = (e) => {
    setPage({
      page: page.page,
      pageSize: +e.target.value
    });
  };

  const onHandleModal = () => {
    setIsEdit(false);
    setModal(!modal);
  };

  const onEditPost = (item) => () => {
    setIsEdit(true);
    setDataPost(item);
    setModal(!modal);
  };

  const onCopyPost = (item) => () => {
    setIsEdit(false);
    setDataPost(item);
    setModal(!modal);
  };

  const onDeletePost = (item) => () => {
    dispatch(
      deleteFacebookFeet({
        feedId: item._id,
        data: {
          pageAccessToken: pageToken?.access_token
        },
        callback: () => {
          dispatch(
            getFacebookFeed({
              page: page.page,
              perPage: page.pageSize,
              pageId: id
            })
          );
        }
      })
    );
  };

  const onPublishPost = (item) => () => {
    dispatch(
      publishFacebookFeed({
        feedId: item._id,
        data: {
          pageAccessToken: pageToken?.access_token
        },
        callback: () => {
          toast.success('Publish successfully');
          dispatch(
            getFacebookFeed({
              page: page.page,
              perPage: page.pageSize,
              pageId: id
            })
          );
        }
      })
    );
  };

  useEffect(() => {
    dispatch(
      getFacebookFeed({
        page: page.page,
        perPage: page.pageSize,
        pageId: id
      })
    );
  }, [page]);

  const renderTh = (label, className = '') => (
    <th
      scope="col"
      className={`group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold ${className}`}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
      </div>
    </th>
  );

  const renderItem = (item) => (
    <tr key={item._id}>
      <td className="px-3 py-4 whitespace-normal capitalize" role="cell">
        <div className="text-sm text-gray-500">{item.message}</div>
      </td>
      <td className="px-3 py-4 whitespace-normal" role="cell">
        <div className="flex gap-1">
          {item.images.map((image, index) => (
            <img key={index} src={image} alt="image" width="50" height="50" />
          ))}
        </div>
      </td>
      <td className="px-3 py-4 whitespace-normal" role="cell">
        <div className="text-sm text-gray-500">
          <a href={item.link} target="_blank" rel="noreferrer">
            {item.link}
          </a>
        </div>
      </td>
      <td className="px-3 py-4 whitespace-normal" role="cell">
        <div className="text-sm text-gray-500">{dayjs(item.createAt).format('DD-MM-YYYY')}</div>
      </td>
      <td className="px-3 py-4 whitespace-normal" role="cell">
        <div className="text-sm text-gray-500">{dayjs(item.updateAt).format('DD-MM-YYYY')}</div>
      </td>
      <td className="px-3 py-4 whitespace-normal capitalize" role="cell">
        <div className="text-sm text-gray-500">{item.isPublished.toString()}</div>
      </td>
      <td className="px-3 py-4 whitespace-normal" role="cell">
        <div className="text-sm text-gray-500 flex gap-2">
          <button onClick={onEditPost(item)}>
            <EditIcon />
          </button>
          <button onClick={onDeletePost(item)}>
            <TrashIcon />
          </button>
          <button onClick={onCopyPost(item)}>
            <CopyIcon />
          </button>
          <button onClick={onPublishPost(item)}>
            <ArrowUp />
          </button>
        </div>
      </td>
    </tr>
  );

  const renderTRowStatus = (status) => (
    <tr className="h-full">
      <td colSpan={6}>
        <div className="text-sm text-gray-500 text-center">
          {status === 'Loading' ? (
            <ImSpinner className="loader ease-linear  mx-auto text-2xl" />
          ) : (
            status
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="mt-10 h-full mr-5 ml-5 justify-center items-center pt-10">
      <div>
        <button
          className="rounded-full border px-4 py-2 flex gap-1 items-center"
          onClick={onHandleModal}
        >
          <PlusIcon />
          Create Post
        </button>
      </div>
      <CreatePost
        modal={modal}
        onClose={onHandleModal}
        title={isEdit ? 'Edit post' : 'Create post'}
        pageId={id}
        dataPost={dataPost}
        page={page.page}
        pageSize={page.pageSize}
        isEdit={isEdit}
        pageAccessToken={pageToken?.access_token}
      />
      <div className="mt-4 flex flex-col ">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 ">
          <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8 ">
            <div className="shadow border-b overflow-y-auto h-96 sm:rounded-lg bg-white">
              <table className="min-w-full divide-y h-full">
                <thead className="bg-gray-50">
                  <tr>
                    {renderTh('Message', 'w-2/12')}
                    {renderTh('Image', 'w-2/12')}
                    {renderTh('Link', 'w-2/12')}
                    {renderTh('Create at')}
                    {renderTh('Update at')}
                    {renderTh('Publish')}
                    {renderTh('Action')}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    renderTRowStatus('Loading')
                  ) : (
                    <>
                      {feeds.data.length > 0
                        ? feeds.data.map(renderItem)
                        : renderTRowStatus('No record')}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="h-15 justify-between flex">
        <div className="mt-5 flex gap-5 items-center">
          <div>Page {page.page + 1}</div>
          <select
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-500 p-2"
            value={page.pageSize}
            onChange={onHandleRowPage}
          >
            <option value={''}>Select page</option>
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize} defaultValue>
                Show {pageSize}
              </option>
            ))}
          </select>
          <div>Total item: {feeds?.totalData}</div>
        </div>
        <div className="mt-5 flex gap-7">
          <button
            className="rounded-full border p-2"
            onClick={onHandlePreviousPage}
            disabled={page.page === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${page.page === 0 ? 'stroke-gray-500' : 'stroke-current'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="rounded-full border p-2"
            onClick={onHandleNextPage}
            disabled={currentData <= 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`h-6 w-6 ${currentData <= 0 ? 'stroke-gray-500' : 'stroke-current'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacebookDetail;
