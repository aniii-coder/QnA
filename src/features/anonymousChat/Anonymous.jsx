import React, { useEffect, useRef, useState } from "react";
import styles from "./Anonymous.module.css";
import { socket } from "../../lib/SocketConnection";
// import { socket } from "@/lib/socket";

const Anonymous = ({ open, name }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);


  useEffect(() => {
    if (!name) return;

    socket.connect();
    socket.emit("join", { name });

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, [open]);

const sendMessage = () => {
  if (!message.trim()) return;

  socket.emit("message", message);
  setMessage("");
};

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);


  return (
    <div className={styles.chatWrapper}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.avatar}>{name?.[0]}</div>
        <div>
          <p className={styles.name}>{name}</p>
          <span className={styles.status}>Online</span>
        </div>
      </div>

      {/* Chat Body */}
      <div className={styles.chatBody}>
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`${styles.message} ${
        msg.user === name ? styles.sent : styles.received
      }`}
    >
      <span className={styles.senderName}>{msg.user}</span>
      <p>{msg.text}</p>
      <span className={styles.time}>
        {msg.time || new Date().toLocaleTimeString()}
      </span>
    </div>
  ))}
  <div ref={bottomRef} />
</div>


      {/* Input */}
      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
};

export default Anonymous;
