import React, { useEffect, useState } from "react";
import styles from "./Anonymous.module.css";
import { messages } from "./AnonymoutUtil";
import Popup from "../../components/popup/Popup";
import { useRouter } from "next/router";

const Anonymous = () => {

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatHeader}>
        <div className={styles.avatar}>A</div>
        <div>
          <p className={styles.name}>Anonymous</p>
          <span className={styles.status}>Online</span>
        </div>
      </div>

      <div className={styles.chatBody}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.type === "sent" ? styles.sent : styles.received
            }`}
          >
            <span className={styles.senderName}>{msg.sender}</span>

            <p>{msg.text}</p>
            <span className={styles.time}>{msg.time}</span>
          </div>
        ))}
      </div>

      <div className={styles.chatInput}>
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Anonymous;
