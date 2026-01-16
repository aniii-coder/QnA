import React from "react";
import styles from "./Popup.module.css";

const Popup = ({ isOpen, onClose, title, children, isCloseGiven=false }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* Header */}
        <div className={styles.header}>
          <h3>{title}</h3>
          {isCloseGiven && (
            <button className={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        <div className={styles.content}>{children}</div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.primaryBtn}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
