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

  // Generate the page options dynamically
  const generatePageOptions = () => {
    const options = [10];
    for (let i = 2; i <= Math.ceil(totalItems / 10); i++) {
      options.push(i * 10);
    }
    return options;
  };

  // Handle changing the items per page
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number(e.target.value);

    // Adjust current page to maintain position based on the new page size
    const newCurrentPage =
      Math.floor(((currentPage - 1) * itemsPerPage) / newItemsPerPage) + 1;

    setCamerasPerPage(newItemsPerPage);
    setCurrentPage(newCurrentPage);
  };

  return (
    <div className={styles.Pagination}>
      <div className={styles.ItemsPerPage}>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {generatePageOptions().map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
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
