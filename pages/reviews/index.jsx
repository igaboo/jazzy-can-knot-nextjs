import styles from "./Reviews.module.scss";

import { client, urlFor } from "../../lib/client";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReviewForm from "../../components/ReviewForm/ReviewForm";

export default function Reviews({ reviews }) {
  return (
    <div className={styles.container}>
      <RatingWidget reviews={reviews} />
      <ReviewWall reviews={reviews} />
    </div>
  );
}

function RatingWidget({ reviews }) {
  const [newReviews, setNewReviews] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setNewReviews(reviews);
  }, [router]);

  function getAverage() {
    const count = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    let sum = 0;
    for (var i = 0; i < reviews?.length; i++) {
      if (reviews[i]["rating"]) count[reviews[i]["rating"]] += 1;
      sum += reviews[i]?.rating;
    }
    return { average: (sum / reviews?.length).toFixed(1), count };
  }

  async function handleReview() {
    const review = {
      _type: "review",
      name: nameRef.current.value,
      rating: reviewRating,
      title: titleRef.current.value,
      contents: reviewRef.current.value,
    };

    await client.create(review).then(() => {
      setNewReviews([
        ...newReviews,
        { ...review, _createdAt: new Date().toLocaleDateString() },
      ]);
      setShowForm(false);

      fetch(
        "/api/revalidate?secret=" + process.env.NEXT_PUBLIC_MY_SECRET_TOKEN,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ current: "reviews" }),
        }
      ).then((res) => {
        console.log(res);
        toast.success("Review successfully created!");
      });
    });
  }

  const { average, count } = getAverage();

  const [showForm, setShowForm] = useState();
  const [reviewRating, setReviewRating] = useState(1);
  const nameRef = useRef();
  const titleRef = useRef();
  const reviewRef = useRef();
  const [uploadImage, setUploadImage] = useState(null);

  return (
    <div className={styles.ratingWidget}>
      <header>
        <h1>{average}</h1>
        <div className={styles.stars}>
          <h6>
            {[...Array(5)].map((e, index) => {
              return (
                <FontAwesomeIcon
                  key={index}
                  className={
                    styles[index >= Math.floor(average) ? "starOpaque" : "star"]
                  }
                  icon={faStar}
                />
              );
            })}
          </h6>
        </div>
        <h6 className="dim">{reviews.length} reviews</h6>
      </header>
      <main>
        {Object.entries(count).map(([key, value]) => {
          return (
            <div key={key} className={styles.row}>
              <h6 className="dim">{key}</h6>
              <div className={styles.percentageBar}>
                <div
                  className={`${styles.bar} ${styles["row" + key]}`}
                  style={{ width: `${(value / reviews.length) * 100}%` }}
                />
              </div>
              <h6>{Math.floor((value / reviews.length) * 100)}%</h6>
              <h6 className="dim">{value}</h6>
            </div>
          );
        })}
      </main>
      <footer>
        {showForm && (
          <ReviewForm
            reviewRating={reviewRating}
            setReviewRating={setReviewRating}
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
            handleReview={handleReview}
            setShowForm={setShowForm}
          />
        )}
        {!showForm && (
          <button className="btn-secondary" onClick={() => setShowForm(true)}>
            Leave a review
          </button>
        )}
      </footer>
    </div>
  );
}

function ReviewWall({ reviews }) {
  return (
    <div className={styles.reviewWall}>
      <header>
        <h4>Reviews</h4>
        <h4 className="dim">Images</h4>
      </header>
      <div className={styles.reviews}>
        {reviews.map((review) => {
          const { name, rating, contents, title, slug, _createdAt, image } =
            review;

          const url = image && urlFor(image?.asset._ref);

          return (
            <div key={_createdAt} className={styles.review}>
              <div className={styles.column}>
                <p>{name}</p>
                <p className="dim">
                  {new Date(_createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={styles.column}>
                <div className={styles.stars}>
                  <h6>
                    {[...Array(5)].map((e, index) => {
                      return (
                        <FontAwesomeIcon
                          key={index}
                          className={
                            styles[index >= rating ? "starOpaque" : "star"]
                          }
                          icon={faStar}
                        />
                      );
                    })}
                    {" " + rating + ".0"}
                  </h6>
                </div>
                <div className={styles.content}>
                  <div>
                    <h5>{title}</h5>
                    <p className="dim">{contents}</p>
                  </div>

                  {image && <img src={url?.options.source && url.url()} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const reviews = await client.fetch(`*[_type == "review"]`);

  return {
    props: { reviews },
  };
};
