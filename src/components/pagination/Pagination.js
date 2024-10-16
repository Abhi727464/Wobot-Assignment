import React from "react";
import styles from "./pagination.module.css";
const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setCamerasPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Helper function for navigating pages
  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () =>
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  const goToNextPage = () =>
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
  const goToLastPage = () => setCurrentPage(totalPages);

  // Calculate the range of items currently shown
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  return (
    <div className={styles.Pagination}>
      <div className={styles.ItemsPerPage}>
        <select
          value={itemsPerPage}
          onChange={(e) => setCamerasPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className={styles.PaginationControls}>
        <button onClick={goToFirstPage} disabled={currentPage === 1}>
          &laquo;&laquo;
        </button>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          &laquo;
        </button>
        <span>
          {startItem}-{endItem} of {totalItems}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          &raquo;
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>
          &raquo;&raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
