/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { listProject } from "../../../store/actions/fetchData/v2/listProject";
import useListPropertyHooksV2 from "../../../hooks/v2/useListPropertyHooks";
import { useDispatch, useSelector } from "react-redux";

const Component = ({
  bodyListOfUser,
  setBodyListOfUser,
  data,
  metaData,
  handleNextPage,
  handlePrevPage,
}) => {
  const pagination = useSelector((state) => state.paginationReducer);

  // const [page, setPage] = useState();
  // useEffect(() => {
  //     console.log("DEBUG PAGINATION METADATA", metaData);
  //     setPage({
  //         ...metaData,
  //         totalPage: Math.ceil((data || []).length / 10),
  //     });
  // }, [data]);
  //
  // // useEffect(() => {
  // //     setBodyListOfUser({
  // //         ...bodyListOfUser,
  // //         pageStart: page?.currentPage || 1,
  // //     });
  // // }, [page]);
  //
  // console.log("DEBUG PAGINATION BODY LIST OF USER", bodyListOfUser)
  // console.log("DEBUG PAGINATION PAGE", page);
  //
  // const itemsToShow = Array.from(
  //     {length: Math.ceil((data || []).length / 10) || 0},
  //     (_, i) => i + 1
  // );
  //
  // const handlePage = (item) => {
  //     console.log("DEBUG PAGINATION COMPONENT ITEM", item)
  //     setBodyListOfUser({
  //         ...bodyListOfUser,
  //         pageStart: item,
  //     });
  // };

  return (
    <>
      <div className="pagination__wrapper">
        <div className="pagination__mobile-wrap">
          <button
            disabled={pagination.currentPage === 0}
            onClick={handlePrevPage}
            className={`pagination__prev-m ${
              pagination.currentPage === 0 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Previous
          </button>
          <button
            // disabled={page?.currentPage === itemsToShow.length}
            onClick={handleNextPage}
            disabled={pagination?.nextData?.responseData?.length === 0}
            className={`pagination__next-m ${
              pagination?.nextData?.responseData?.length === 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
        <div className="pagination__large-wrap">
          <div>
            <nav className="pagination__prev-wrap" aria-label="Pagination">
              <button
                onClick={handlePrevPage}
                className={`pagination__prev ${
                  pagination.currentPage === 0 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={pagination.currentPage === 0}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <a
                href="#"
                className={
                  pagination.currentPage ? "pagination__page-num-select" : "pagination__page-num"
                }
              >
                {pagination.currentPage + 1}
              </a>
              <button
                // disabled={page?.currentPage === itemsToShow.length}
                onClick={handleNextPage}
                className={`pagination__next ${
                  pagination?.nextData?.responseData?.length === 0
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                disabled={pagination?.nextData?.responseData?.length === 0}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
