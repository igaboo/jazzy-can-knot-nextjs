import styles from "./FeaturedPosts.module.scss";

import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function FeaturedPosts() {
  const [feed, setFeed] = useState([]);

  async function fetchFeed() {
    let newFeed = [];

    const response = await fetch("https://feeds.behold.so/vSZ5WxRvh4bmPpq1XPTJ")
      .then((data) => data.json())
      .then((response) => {
        response.media.forEach(
          ({
            id, // The post ID
            mediaUrl, // The image source
            permalink, // URL of the Instagram post
            caption, // Post caption
            mediaType, // 'IMAGE', 'VIDEO', or 'CAROUSEL_ALBUM'
            timestamp, // Post publish date,
            children, // An array of CAROUSEL_ALBUM children. Each with id, mediaUrl and mediaType
            commentsCount, // Post publish date,
            likeCount, // Number of Likes
            hashtag, // The relevant hashtag for this post
          }) => {
            newFeed.push({ id, mediaUrl, permalink });
          }
        );
      });

    return newFeed;
  }

  useEffect(() => {
    fetchFeed().then((feed) => setFeed(feed));
  }, []);

  return (
    <div className={styles.container}>
      <h2>#JazzyCanKnot Featured Posts</h2>
      <p>
        Tag me on Instagram using #JazzyCanKnot for a chance to be featured on
        the site!
      </p>
      <div className={styles.grid}>
        {feed?.map((post) => {
          return (
            <Link href={post.permalink} key={post.id}>
              <a>
                <div className={styles.imageContainer}>
                  <img src={post.mediaUrl} />
                  <div className={styles.hover}>
                    <span>
                      <FontAwesomeIcon icon={faInstagram} size="5x" />
                      <h4>View on Instagram</h4>
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
