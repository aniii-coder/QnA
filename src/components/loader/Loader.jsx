import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.threeBody}>
        <div className={styles.threeBody__dot}></div>
        <div className={styles.threeBody__dot}></div>
        <div className={styles.threeBody__dot}></div>
      </div>
    </div>
  );
};

export default Loader;
