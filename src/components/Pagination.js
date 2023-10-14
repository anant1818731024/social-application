import React, { useState } from 'react';
import '../styles/pagination.css';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if(page <= 0){
        return;
    }
    console.log("page: ", page);
    setCurrentPage(page);
    onPageChange(page);
  };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     const maxVisiblePages = 5;

//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (totalPages <= maxVisiblePages) {
//       startPage = 1;
//       endPage = totalPages;
//     } else {
//       if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
//         startPage = 1;
//         endPage = maxVisiblePages;
//       } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
//         startPage = totalPages - maxVisiblePages + 1;
//         endPage = totalPages;
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <li
//           key={i}
//           className={i === currentPage ? 'active' : ''}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </li>
//       );
//     }

//     return pageNumbers;
//   };

  return (
    <div className="pagination">
      <ul>
        <li
          className={currentPage === 1 ? 'disabled' : ''}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </li>
        {/* {renderPageNumbers()} */}
        <li
          className={currentPage === totalPages ? 'disabled' : ''}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
