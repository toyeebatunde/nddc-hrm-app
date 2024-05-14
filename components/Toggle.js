
import { useState, useEffect } from "react";
import styles from "../styles/Toggle.module.css";

export default function Toggle({ label, toggled, onClick, toggleRef }) {


  if (toggled === "") {

    return (
      <div className="flex">
        {/* <strong className={`${styles.toggleStrong}`}>{label}</strong> */}
        <label className={`${styles.toggleLabel}`}>
          <h2>Loading account status...</h2>
          {/* <input ref={toggleRef} className={`${styles.toggleInput}`} type="checkbox" defaultChecked={toggled === "A"} onClick={onClick} />
          <span className={`${styles.toggleSpan}`}></span> */}
        </label>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* <strong className={`${styles.toggleStrong}`}>{label}</strong> */}
      <label className={`${styles.toggleLabel}`}>
        <input ref={toggleRef} className={`${styles.toggleInput}`} type="checkbox" defaultChecked={toggled === "A"} onClick={onClick} />
        <span className={`${styles.toggleSpan}`}></span>
      </label>
    </div>
  );
}
