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



const Hero = () => {



  const [data, setData] = useState([])





useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/dashboard?type=recent");
      const data = await response.json(); 
      setData(data)
      console.log('Actual Data:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  fetchData();
}, []);
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.mainCard}>
        {/* Post Card */}

        {data?.data?.map((item, idx) => (
          // <>
            <div className={styles.postCard} key={idx}>
              {/* Post Header */}
              <div className={styles.postHeader}>
                <div className={styles.avatar}>A</div>
                <div>
                  <h4>{item.username}</h4>
                  <span className={styles.time}>{item.time}</span>
                </div>
              </div>

              {/* Post Content */}
              <div className={styles.postContent}>
                <p>
                  {item.content}
                </p>
              </div>

              {/* Post Actions */}
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
    </div>
  );
};

export default Hero;
