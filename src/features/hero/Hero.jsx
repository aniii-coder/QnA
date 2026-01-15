import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";
import { DUMMY_DATA } from "./HeroUtils";
import { useGetRecentPostsQuery } from "../sidebar/SidebarApi";
import { useRouter } from "next/router";
import Loader from "../../components/loader/Loader";

const Hero = () => {
  const router = useRouter();
  const type = router?.query?.type
  const { data: recentPost, isLoading } = useGetRecentPostsQuery(type,  {skip: !type });

  return (
    <div className={styles.heroWrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainCard}>
          {recentPost?.data?.map((item, idx) => (
            <div className={styles.postCard} key={idx}>
              <div className={styles.postHeader}>
                <div className={styles.avatar}>A</div>
                <div>
                  <h4>{item.username}</h4>
                  <span className={styles.time}>{item.time}</span>
                </div>
              </div>

              <div className={styles.postContent}>
                <p>{item.content}</p>
              </div>

              <div className={styles.postActions}>
                <button>
                  <ThumbsUp size={18} /> <span>{item.likes}</span>
                </button>
                <button>
                  <ThumbsDown size={18} /> <span>{item.dislikes}</span>
                </button>
                <button>
                  <MessageCircle size={18} /> <span>{item.comments}</span>
                </button>
                <button>
                  <Share2 size={18} />
                </button>
                <button className={styles.saveBtn}>
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
            // </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
