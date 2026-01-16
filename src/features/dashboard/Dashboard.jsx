import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Hero from "../hero/Hero";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Popup from "../../components/popup/Popup";
import styles from "./Dashboard.module.css";

const Anonymous = dynamic(() => import("../anonymousChat/Anonymous"), {
  ssr: false,
});

const Dashboard = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (router?.query?.type === 'anonymous') {
      setOpen(true);
    }
  }, [router]);
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
      <Sidebar />
      {router?.query?.type === "recent" ? (
        <Hero />
      ) : router?.query?.type === "anonymous" ? (
        <Anonymous />
      ) : router?.query?.type === "notification" ? null : null}

      {open && (
        <Popup
          isOpen={open}
          onClose={() => setOpen(false)}
          title={"May I know your name?"}
        >
          <div className={styles.inputWrapper}>
            {/* <label className={styles.label}>Your name</label> */}
            <input
              type="text"
              placeholder="Enter your name"
              className={styles.input}
            />
            <p className={styles.helperText}>
              This will be visible to others in the chat*
            </p>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Dashboard;
