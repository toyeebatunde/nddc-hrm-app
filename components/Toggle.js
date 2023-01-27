
import { useState } from "react";
import styles from "../styles/Toggle.module.css" ;

export default function Toggle({ label, toggled, onClick, toggler }) {
//   const [isToggled, toggle] = useState(toggled);



  return (
    <div className="flex">
      <strong className={`${styles.toggleStrong}`}>{label}</strong>
        <label className={`${styles.toggleLabel}`}>
      <input className={`${styles.toggleInput}`} type="checkbox" defaultChecked={toggled} onClick={(e)=>{onClick(e, toggler)}} />
      <span className={`${styles.toggleSpan}`}></span>
    </label>
    </div>
  );
}
