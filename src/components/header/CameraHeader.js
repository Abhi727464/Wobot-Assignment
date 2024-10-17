import React from "react";
import logo from "../../Brand Logo.png";
import styles from "./cameraHeader.module.css";

const CameraHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <div className={styles.logo}>
        <img src={logo} alt="" srcset="" />
      </div>
      <div className={styles.headerContainer}>
        <div>
          <h1 style={{ margin: 0 }}>Cameras</h1>
          <p>Manage Your Cameras here</p>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Search camera name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.inputBox}
          />
        </div>
      </div>
    </>
  );
};

export default CameraHeader;
