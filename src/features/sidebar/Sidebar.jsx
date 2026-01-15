import React, { useEffect } from "react";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import { SideBarUtils } from "./SidebarUtils";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const handleSidebarClick = (item) => {
    router.push(`/dashboard?type=${item?.id}`);
  };
  useEffect(() => {
    if (!router.query.type) {
      router.replace("/dashboard?type=recent");
    }
  }, [router.query.type]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.coverSidebar}>
        <div className={styles.logo}>
          <Image src="/assets/logo01.png" width={120} height={80} alt="Logo" />
        </div>

        <div className={styles.entries}>
          {SideBarUtils.map((item) => {
            const Icon = item.icon;
            const isActive = router?.query?.type === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.entry} ${isActive ? styles.selected : ""}`}
                role="button"
                onClick={() => handleSidebarClick(item)}
              >
                <span>{item.name}</span>
                <Icon size={18} className={styles.icon} />
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
