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
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    const { name, value } = e.target;

    console.log("value :>> ", value);

    switch (name) {
      case "name":
        setName(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (router.query.type === "anonymous") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [router.query.type]);

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
      <Sidebar />
      {router?.query?.type === "recent" ? (
        <Hero />
      ) : router?.query?.type === "anonymous" ? (
        <Anonymous open={open} name={name} />
      ) : router?.query?.type === "notification" ? null : null}

      {open && (
        <Popup
          isOpen={open}
          onClose={() => {
            if (name.trim().length <= 0) {
              alert("please enter the valid name ");
            } else {
              setOpen(false);
            }
          }}
          title={"May I know your name?"}
        >
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={styles.input}
              onChange={handleSubmit}
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
