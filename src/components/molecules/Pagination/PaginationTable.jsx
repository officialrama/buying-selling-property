/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";

const Component = ({ bodyListOfUser, setBodyListOfUser, data, metaData }) => {
  const [page, setPage] = useState();

  useEffect(() => {
    setPage({
      ...metaData,
      totalPage: Math.ceil(metaData?.totalData / 10),
      currentPage: metaData?.currentPage,
    });
  }, [data]);

  // useEffect(() => {
  //   setBodyListOfUser({
  //     ...bodyListOfUser,
  //     pageStart: page?.currentPage || 1,
  //   });
  // }, [page]);


  const itemsToShow = Array.from(
    { length: Math.ceil(metaData?.totalData / 10) || 0 },
    (_, i) => i + 1
  );

  const handlePage = (item) => {
    setBodyListOfUser({
      ...bodyListOfUser,
      pageStart: item - 1,
    });
  };

  const handlePrevPage = () => {
    setBodyListOfUser({
      ...bodyListOfUser,
      pageStart: page.currentPage - 1,
    });
  };

  const handleNextPage = () => {
    setBodyListOfUser({
      ...bodyListOfUser,
      pageStart: page.currentPage + 1,
    });
  };

  return (
    <div className="pagination__wrapper">
      <div className="pagination__mobile-wrap">
        <button
          disabled={page?.currentPage === 1}
          onClick={handlePrevPage}
          className={`pagination__prev-m ${
            page?.currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Previous
        </button>
        <button
          disabled={page?.currentPage === itemsToShow.length}
          onClick={handleNextPage}
          className={`pagination__next-m ${
            page?.currentPage === itemsToShow.length
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
              disabled={page?.currentPage === 1}
              onClick={handlePrevPage}
              className={`pagination__prev ${
                page?.currentPage === 1
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
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
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            {itemsToShow &&
              (itemsToShow || []).map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-current="page"
                  onClick={() => handlePage(item)}
                  className={
                    page?.currentPage+1 === item
                      ? "pagination__page-num-select"
                      : "pagination__page-num"
                  }
                >
                  {item}
                </a>
              ))}
            <button
              disabled={page?.currentPage === itemsToShow.length}
              onClick={handleNextPage}
              className={`pagination__next ${
                page?.currentPage === itemsToShow.length
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
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
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Component;
