import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ImSpinner } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

import { getFacebookPages } from 'stores/facebook';

const FacebookPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pages, loading } = useSelector((state) => state.facebookStore);
  const [rowPage, setRowPage] = useState('');

  const onHandleNextPage = () => {
    dispatch(
      getFacebookPages({
        after: pages.paging.cursors.after,
        limit: rowPage === '' ? 10 : rowPage
      })
    );
  };

  const onHandlePreviousPage = () => {
    dispatch(
      getFacebookPages({
        before: pages.paging.cursors.before,
        limit: rowPage === '' ? 10 : rowPage
      })
    );
  };

  const onHandleRowPage = (e) => {
    setRowPage(e.target.value);
    dispatch(getFacebookPages({ limit: Number(e.target.value) }));
  };

  const onGotoFacebook = (id) => () => {
    navigate(`/facebook/${id}`);
  };

  useEffect(() => {
    dispatch(getFacebookPages({ limit: 10 }));
  }, []);

  return (
    <div className="mt-10 h-full mr-5 ml-5 justify-center items-center pt-10">
      <div className="mt-4 flex flex-col ">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 ">
          <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8 ">
            <div className="shadow border-b overflow-y-auto h-96 sm:rounded-lg bg-white">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold w-1/4"
                    >
                      <div className="flex items-center justify-between">
                        <span>Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold w-1/4"
                    >
                      <div className="flex items-center justify-between">
                        <span>Address</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold w-1/4"
                    >
                      <div className="flex items-center justify-between">
                        <span>Website</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold w-1/4"
                    >
                      <div className="flex items-center justify-between">
                        <span>Email</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                {!loading && pages.data.length > 0 && (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pages.data.map((item) => {
                      return (
                        <tr key={item.id} onClick={onGotoFacebook(item.id)}>
                          <td
                            className="px-3 py-4 whitespace-normal flex gap-4 items-center "
                            role="cell"
                          >
                            <img
                              src={item.picture.data.url}
                              alt="logo"
                              width="50"
                              height="50"
                              className="rounded-full"
                            />
                            <div className="text-sm text-gray-500 items-center">{item?.name}</div>
                          </td>
                          <td className="px-3 py-4 whitespace-normal" role="cell">
                            <div className="text-sm text-gray-500">
                              {item?.location?.street || '_'}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-normal" role="cell">
                            <div className="text-sm text-gray-500">
                              <a href={item.website} target="_blank" rel="noreferrer">
                                {item.website}
                              </a>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-normal" role="cell">
                            <div className="text-sm text-gray-500">{item.emails}</div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
              {!loading && pages.data.length === 0 && (
                <div className="h-3/4 w-full items-center justify-center flex">
                  <div className="text-sm text-gray-500">No Record</div>
                </div>
              )}
              {loading && (
                <div className="h-3/4 w-full items-center justify-center flex">
                  <div className="text-sm text-gray-500">
                    <ImSpinner className="loader ease-linear  mx-auto text-2xl" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-15 justify-between flex">
        <div className="mt-5 flex gap-5 items-center">
          <div>Items Per Page</div>
          <select
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-500 p-2"
            value={rowPage}
            onChange={onHandleRowPage}
          >
            <option value={''}>Select page</option>
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize} defaultValue>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5 flex gap-7">
          <button
            className="rounded-full border p-2"
            onClick={onHandlePreviousPage}
            disabled={!pages?.paging?.previous}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${
                !pages?.paging?.previous ? 'stroke-gray-500' : 'stroke-current'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="rounded-full border p-2"
            onClick={onHandleNextPage}
            disabled={!pages?.paging?.next}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`h-6 w-6 ${!pages?.paging?.next ? 'stroke-gray-500' : 'stroke-current'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacebookPage;
