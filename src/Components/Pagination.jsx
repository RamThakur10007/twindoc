import React, { useState } from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  const renderPageNumbers = () => {
    let startPage, endPage;
    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfMaxVisiblePages) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + halfMaxVisiblePages >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfMaxVisiblePages;
      endPage = currentPage + halfMaxVisiblePages;
    }

    return pageNumbers.slice(startPage - 1, endPage);
  };

  return (
    <nav style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <ul className="pagination" style={{ display: "flex", listStyle: "none", gap: "10px" }}>
        <li className="page-item">
          <a
            onClick={() => handlePageChange(currentPage - 1)}
            className="page-link"
            style={{ borderRadius: "5px", cursor: "pointer" }}
            disabled={currentPage === 1}
          >
            Prev
          </a>
        </li>
        {renderPageNumbers().map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => handlePageChange(number)}
              className={`page-link ${currentPage === number ? "active" : ""}`}
              style={{ borderRadius: "5px", cursor: "pointer" }}
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            onClick={() => handlePageChange(currentPage + 1)}
            className="page-link"
            style={{ borderRadius: "5px", cursor: "pointer" }}
            disabled={currentPage === totalPages}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
