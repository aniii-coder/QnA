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
import Image from "next/image";

const Hero = () => {
  const router = useRouter();
  const [postActions, setPostActions] = useState({});

  const type = router?.query?.type;
  const { data: recentPost, isLoading } = useGetRecentPostsQuery(type, {
    skip: !type,
  });

  // const handleEventClick = (action, postId) => {
  //   setPostActions((prev) => ({
  //     ...prev,
  //     [postId]: {
  //       ...prev[postId],
  //       [action]: !prev?.[postId]?.[action],
  //     },
  //   }));

  //   console.log("action:", action, "postId:", postId);
  // };

  // const isActive = (postId, action) => postActions?.[postId]?.[action];

  const handleEventClick = (action, id) => {
    setPostActions((prev) => ({
      ...prev,
      [id]: {
        ...prev?.[id],
        [action]: !prev?.[id]?.[action],
      },
    }));
  };

  useEffect(() => {
    console.log("postActions :>> ", postActions);
  }, [postActions]);

  const isActive = (action, id) => {
    return postActions?.[id]?.[action];
  };

  return (
    <div className={styles.heroWrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainCard}>
          {recentPost?.data?.map((item, idx) => (
            <div className={styles.postCard} key={idx}>
              <div className={styles.postHeader}>
                <div className={styles.avatar}>
                  <Image
                    src={`https://robohash.org/${item?.username}`}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4>{item.username}</h4>
                  <span className={styles.time}>{item.time}</span>
                </div>
              </div>

              <div className={styles.postContent}>
                <p>{item.content}</p>
              </div>

              <div className={styles.postActions}>
                <button onClick={() => handleEventClick("like", item?._id)}>
                  <ThumbsUp
                    fill={
                      isActive("like", item._id || idx)
                        ? "currentColor"
                        : "none"
                    }
                    size={18}
                    strokeWidth={isActive("like", item._id || idx) ? 0 : 2}
                  />{" "}
                  <span>{item.likes}</span>
                </button>
                <button onClick={() => handleEventClick("dislike", item?._id)}>
                  <ThumbsDown
                    fill={
                      isActive("dislike", item._id || idx)
                        ? "currentColor"
                        : "none"
                    }
                    size={18}
                    strokeWidth={isActive("dislike", item._id || idx) ? 0 : 2}
                  />{" "}
                  <span>{item.dislikes}</span>
                </button>
                <button onClick={() => handleEventClick("comment", item?._id)}>
                  <MessageCircle
                    fill={
                      isActive("comment", item._id || idx)
                        ? "currentColor"
                        : "none"
                    }
                    size={18}
                    strokeWidth={isActive("comment", item._id || idx) ? 0 : 2}
                  />{" "}
                  <span>{item.comments}</span>
                </button>
                <button onClick={() => handleEventClick("share", item?._id)}>
                  <Share2
                    fill={
                      isActive("share", item._id || idx)
                        ? "currentColor"
                        : "none"
                    }
                    size={18}
                    strokeWidth={isActive("share", item._id || idx) ? 0 : 2}
                  />
                </button>
                <button
                  onClick={() => handleEventClick("save", item?._id)}
                  className={styles.saveBtn}
                >
                  <Bookmark
                    fill={
                      isActive("save", item._id || idx)
                        ? "currentColor"
                        : "none"
                    }
                    size={18}
                    strokeWidth={isActive("save", item._id || idx) ? 0 : 2}
                  />
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
