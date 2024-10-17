import React, { useState, useEffect } from "react";
import { fetchCameras, updateCameraStatus } from "../../api/Api";
import CameraRow from "../camera-row/CameraRow";
import Pagination from "../pagination/Pagination";
import styles from "./cameraTable.module.css";
import CameraHeader from "../header/CameraHeader";
import Filter from "../filter/Filter";

const CameraTable = () => {
  const [cameras, setCameras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [camerasPerPage, setCamerasPerPage] = useState(10);
  const [locationFilter, setLocationFilter] = useState(""); // Location filter state
  const [statusFilter, setStatusFilter] = useState(""); // Status filter state
  const [locations, setLocations] = useState([]);
  const [dataFetching, setDataFetching] = useState(false);
  const [selectedCameras, setSelectedCameras] = useState([]); // State to track selected cameras
  const [selectAll, setSelectAll] = useState(false);

  //getting all cameras data
  useEffect(() => {
    const getCameras = async () => {
      setDataFetching(true);
      const data = await fetchCameras();
      setDataFetching(false);
      const allLocations = [...new Set(data.map((camera) => camera.location))];
      setCameras(data);
      setLocations(allLocations);
    };
    getCameras();
  }, []);

  //filter secotion
  useEffect(() => {
    let filtered = cameras;

    if (locationFilter) {
      filtered = filtered.filter(
        (camera) => camera.location === locationFilter
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((camera) => camera.status === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter((camera) =>
        camera.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredCameras(filtered);
  }, [locationFilter, statusFilter, cameras, searchTerm]);

  // update status of a camera
  const handleStatusUpdate = async (id, status) => {
    const success = await updateCameraStatus(id, status);
    if (success) {
      setCameras(
        cameras.map((cam) => (cam.id === id ? { ...cam, status } : cam))
      );
    }
  };

  // delete a camera row
  const handleDelete = (id) => {
    setCameras(cameras.filter((cam) => cam.id !== id));
  };

  //pagination
  const indexOfLastCamera = currentPage * camerasPerPage;
  const indexOfFirstCamera = indexOfLastCamera - camerasPerPage;
  const currentCameras = filteredCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera
  );

  // Handle select all checkbox change
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allCameraIds = currentCameras.map((camera) => camera.id);
      setSelectedCameras(allCameraIds);
    } else {
      setSelectedCameras([]);
    }
  };
  return (
    <div className={styles.CameraContainer}>
      <CameraHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Filter
        locations={locations}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className={styles.tableContainer}>
        <table>
          <thead className={styles.tableHeader}>
            <tr>
              <th style={{ textAlign: "left", paddingLeft: "20px" }}>
                <input
                  type="checkbox"
                  style={{ marginRight: "10px" }}
                  onChange={handleSelectAll}
                  checked={selectAll}
                />
                Name
              </th>
              <th>Health</th>
              <th>Location</th>
              <th>Recorder</th>
              <th>Tasks</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataFetching ? (
              <tr>
                <td colSpan={7}>Loading Data...</td>
              </tr>
            ) : currentCameras.length === 0 ? (
              <tr>
                <td colSpan={7}>No Data Available</td>
              </tr>
            ) : (
              currentCameras.map((camera) => (
                <CameraRow
                  key={camera.id}
                  camera={camera}
                  onStatusUpdate={handleStatusUpdate}
                  onDelete={handleDelete}
                  isSelected={selectedCameras.includes(camera.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={filteredCameras.length}
        itemsPerPage={camerasPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setCamerasPerPage={setCamerasPerPage}
      />
    </div>
  );
};

export default CameraTable;
