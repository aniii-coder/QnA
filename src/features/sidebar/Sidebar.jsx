import React from "react";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import { SideBarUtils } from "./SidebarUtils";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.coverSidebar}>
        <div className={styles.logo}>
          <Image src="/assets/logo01.png" width={120} height={80} alt="Logo" />
        </div>

        {/* <nav className={styles.nav}> */}
        <div className={styles.entries}>
          {SideBarUtils.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className={styles.entry} role="button">
                <span>{item.name}</span>
                <Icon size={18} className={styles.icon} />
              </div>
            );
          })}
        </div>
        {/* </nav> */}

        {/* <div className={styles.footer}>
          <button className={styles.logout}>Logout</button>
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
