import React from "react";

import { GoDotFill } from "react-icons/go";
import { AiOutlineCloud } from "react-icons/ai";
import { TbDeviceRemote } from "react-icons/tb";
import { PiWarningCircleBold } from "react-icons/pi";
import styles from "./cameraRow.module.css";

const CameraRow = ({ camera, onStatusUpdate, onDelete, isSelected }) => {
  const toggleStatus = () => {
    const newStatus = camera.status === "Active" ? "Inactive" : "Active";
    onStatusUpdate(camera.id, newStatus);
  };

  return (
    <tr key={camera.id} className={styles.tableRow}>
      <td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            style={{ marginRight: "5px" }}
            checked={isSelected}
          />
          <GoDotFill
            style={{
              color: camera.current_status === "Online" ? "#029262" : "#DC3545",
            }}
          />
          {camera.name}
          {camera?.hasWarning ? (
            <PiWarningCircleBold
              style={{ color: "#ff7e17", fontSize: "19px", fontWeight: "bold" }}
            />
          ) : null}
        </div>
      </td>
      <td
        style={{
          display: "flex",
          gap: "10px",
          paddingTop: "10px",
          justifyContent: "center",
        }}
      >
        <div className={styles.healthBox}>
          <AiOutlineCloud style={{ fontSize: "25px" }} />
          <div className={styles.healthCloudValue}>{camera?.health?.cloud}</div>
        </div>
        <div className={styles.healthBox}>
          <TbDeviceRemote style={{ fontSize: "25px" }} />
          <div className={styles.healthDeviceValue}>
            {camera?.health?.device}
          </div>
        </div>
      </td>
      <td>{camera?.location}</td>
      <td>{camera?.recorder ? camera?.recorder : "N/A"}</td>
      <td>{camera?.tasks ? `${camera?.tasks} Tasks` : "N/A"}</td>
      <td
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className={
            camera?.status === "Active" ? styles.active : styles?.inActive
          }
        >
          {camera.status}
        </div>
      </td>
      <td>
        <button onClick={toggleStatus} className={styles.activateBtn}>
          {camera.status === "Active" ? "Deactivate" : "Activate"}
        </button>
        <button
          onClick={() => onDelete(camera.id)}
          className={styles.deleteBtn}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CameraRow;
