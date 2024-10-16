import React, { useState, useEffect } from "react";
import { fetchCameras, updateCameraStatus } from "../../api/Api";
import CameraRow from "../camera-row/CameraRow";
import Pagination from "../pagination/Pagination";
import styles from "./cameraTable.module.css";
import CameraHeader from "../header/CameraHeader";
import Filter from "../filter/Filter";
export const data = [
  {
    id: 1,
    name: "Camera 1",
    location: "Location 1",
    status: "Active",
    current_status: "Online",
    health: { cloud: 100, device: 90 },
    recorder: "Recorder 1",
    tasks: 5,
    hasWarning: true,
  },
  {
    id: 2,
    name: "Camera 2",
    location: "Location 1",
    status: "Inactive",
    current_status: "Online",
    health: { cloud: 90, device: 95 },
    recorder: "Recorder 2",
    tasks: 0,
    hasWarning: false,
  },
  {
    id: 3,
    name: "Camera 3",
    location: "Location 2",
    status: "Active",
    current_status: "Online",
    health: { cloud: 100, device: 85 },
    recorder: "Recorder 3",
    tasks: 4,
    hasWarning: true,
  },
  {
    id: 4,
    name: "Camera 4",
    location: "Location 2",
    status: "Inactive",
    current_status: "Offline",
    health: { cloud: 90, device: 80 },
    recorder: "Recorder 4",
    tasks: 1,
    hasWarning: false,
  },
  {
    id: 5,
    name: "Camera 5",
    location: "Location 3",
    status: "Active",
    current_status: "Online",
    health: { cloud: 85, device: 75 },
    recorder: "Recorder 5",
    tasks: 3,
    hasWarning: true,
  },
  {
    id: 6,
    name: "Camera 6",
    location: "Location 3",
    status: "Inactive",
    current_status: "Online",
    health: { cloud: 95, device: 85 },
    recorder: "Recorder 6",
    tasks: 2,
    hasWarning: false,
  },
  {
    id: 7,
    name: "Camera 7",
    location: "Location 4",
    status: "Active",
    current_status: "Offline",
    health: { cloud: 90, device: 88 },
    recorder: "Recorder 7",
    tasks: 5,
    hasWarning: true,
  },
  {
    id: 8,
    name: "Camera 8",
    location: "Location 4",
    status: "Inactive",
    current_status: "Online",
    health: { cloud: 100, device: 95 },
    recorder: "Recorder 8",
    tasks: 0,
    hasWarning: false,
  },
  {
    id: 9,
    name: "Camera 9",
    location: "Location 5",
    status: "Active",
    current_status: "Online",
    health: { cloud: 95, device: 90 },
    recorder: "Recorder 9",
    tasks: 4,
    hasWarning: true,
  },
  {
    id: 10,
    name: "Camera 10",
    location: "Location 5",
    status: "Inactive",
    current_status: "Offline",
    health: { cloud: 80, device: 85 },
    recorder: "Recorder 10",
    tasks: 1,
    hasWarning: false,
  },
  {
    id: 11,
    name: "Camera 11",
    location: "Location 1",
    status: "Active",
    current_status: "Online",
    health: { cloud: 100, device: 90 },
    recorder: "Recorder 11",
    tasks: 5,
    hasWarning: true,
  },
  {
    id: 12,
    name: "Camera 12",
    location: "Location 1",
    status: "Inactive",
    current_status: "Offline",
    health: { cloud: 90, device: 80 },
    recorder: "Recorder 12",
    tasks: 2,
    hasWarning: false,
  },
  {
    id: 13,
    name: "Camera 13",
    location: "Location 2",
    status: "Active",
    current_status: "Online",
    health: { cloud: 85, device: 85 },
    recorder: "Recorder 13",
    tasks: 6,
    hasWarning: true,
  },
  {
    id: 14,
    name: "Camera 14",
    location: "Location 2",
    status: "Inactive",
    current_status: "Offline",
    health: { cloud: 70, device: 75 },
    recorder: "Recorder 14",
    tasks: 3,
    hasWarning: false,
  },
  {
    id: 15,
    name: "Camera 15",
    location: "Location 3",
    status: "Active",
    current_status: "Online",
    health: { cloud: 95, device: 90 },
    recorder: "Recorder 15",
    tasks: 7,
    hasWarning: true,
  },
  {
    id: 16,
    name: "Camera 16",
    location: "Location 3",
    status: "Inactive",
    current_status: "Online",
    health: { cloud: 85, device: 80 },
    recorder: "Recorder 16",
    tasks: 2,
    hasWarning: false,
  },
  {
    id: 17,
    name: "Camera 17",
    location: "Location 4",
    status: "Active",
    current_status: "Online",
    health: { cloud: 90, device: 88 },
    recorder: "Recorder 17",
    tasks: 4,
    hasWarning: true,
  },
  {
    id: 18,
    name: "Camera 18",
    location: "Location 4",
    status: "Inactive",
    current_status: "Offline",
    health: { cloud: 100, device: 95 },
    recorder: "Recorder 18",
    tasks: 0,
    hasWarning: false,
  },
  {
    id: 19,
    name: "Camera 19",
    location: "Location 5",
    status: "Active",
    current_status: "Online",
    health: { cloud: 95, device: 90 },
    recorder: "Recorder 19",
    tasks: 4,
    hasWarning: true,
  },
  {
    id: 20,
    name: "Camera 20",
    location: "Location 5",
    status: "Inactive",
    current_status: "Offline",
    health: { cloud: 80, device: 85 },
    recorder: "Recorder 20",
    tasks: 2,
    hasWarning: false,
  },
  // You can copy and modify the structure above to generate up to 50 objects
];

const CameraTable = () => {
  const [cameras, setCameras] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [camerasPerPage, setCamerasPerPage] = useState(10);
  const [locationFilter, setLocationFilter] = useState(""); // Location filter state
  const [statusFilter, setStatusFilter] = useState(""); // Status filter state
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getCameras = async () => {
      const data = await fetchCameras();

      const allLocations = [...new Set(data.map((camera) => camera.location))];
      console.log(allLocations);
      setCameras(data);
      setLocations(allLocations);
    };
    getCameras();
  }, []);

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

  const handleStatusUpdate = async (id, status) => {
    const success = await updateCameraStatus(id, status);
    if (success) {
      setCameras(
        cameras.map((cam) => (cam.id === id ? { ...cam, status } : cam))
      );
    }
  };

  const handleDelete = (id) => {
    setCameras(cameras.filter((cam) => cam.id !== id));
  };

  const indexOfLastCamera = currentPage * camerasPerPage;
  const indexOfFirstCamera = indexOfLastCamera - camerasPerPage;
  const currentCameras = filteredCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera
  );
  console.log(cameras, "camera");

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
                <input type="checkbox" style={{ marginRight: "10px" }} />
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
            {currentCameras.map((camera) => (
              <CameraRow
                key={camera.id}
                camera={camera}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
              />
            ))}
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
