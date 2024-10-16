import styles from "./filter.module.css";

const Filter = ({
  locationFilter,
  setLocationFilter,
  statusFilter,
  setStatusFilter,
  locations,
}) => {
  return (
    <div className={styles.filterContainer}>
      <div>
        <div className="filter-container">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
