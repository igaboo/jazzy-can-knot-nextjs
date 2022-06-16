import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import styles from "./ReviewForm.module.scss";

export default function ReviewForm({
  reviewRating,
  setReviewRating,
  uploadImage,
  setUploadImage,
  handleReview,
  setShowForm,
}) {
  const nameRef = useRef();
  const titleRef = useRef();
  const reviewRef = useRef();

  return (
    <div className={styles.reviewForm}>
      <div className={styles.starContainer}>
        <h6>Your Overall Rating</h6>

        <div className={styles.stars}>
          {[...Array(reviewRating)].map((e, index) => {
            return (
              <FontAwesomeIcon
                key={index}
                className={styles.star}
                icon={faStar}
                onMouseEnter={() => setReviewRating(index + 1)}
              />
            );
          })}
          {[...Array(5 - reviewRating)].map((e, index) => {
            return (
              <FontAwesomeIcon
                key={index}
                className={styles.starOpaque}
                icon={faStar}
                onMouseEnter={() => setReviewRating(reviewRating + index + 1)}
              />
            );
          })}
        </div>
      </div>
      <div
        className={styles.uploadImage}
        onClick={() => {
          document.getElementById("imageUpload").click();
        }}
      >
        {uploadImage && <img src={URL.createObjectURL(uploadImage)} />}
      </div>

      <h6>Upload photo</h6>
      <input
        type="file"
        onChange={(e) => setUploadImage(e.target.files[0])}
        style={{ display: "none" }}
        id="imageUpload"
      />
      <h6>What&apos;s your name?</h6>
      <input ref={nameRef} placeholder="Your name" />
      <h6>Choose a title for your review</h6>
      <input ref={titleRef} placeholder="Creative title" />
      <h6>What did you like or dislike?</h6>
      <input ref={reviewRef} placeholder="Let future buyers know." />
      <div className={styles.actions}>
        <button
          className="btn-small"
          onClick={() =>
            handleReview(
              nameRef.current.value,
              titleRef.current.value,
              reviewRef.current.value
            )
          }
        >
          Post
        </button>
        <button className="btn-small danger" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
