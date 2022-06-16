import styles from "./Product.module.scss";

import { client, urlFor } from "../../lib/client";

import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faChevronLeft,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Products } from "../../components";
import { useStateContext } from "../../context/StateContext";

import Head from "next/head";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProductDetails({ product, products, reviews }) {
  const { image, name, details, price, color, slug, collections } =
    product && product;
  const { quantity, onAdd, setShowCart, setFooterColor } = useStateContext();

  const router = useRouter();

  const [size, setSize] = useState("S");
  const [currentImage, setCurrentImage] = useState(image[0]);
  const [newReviews, setNewReviews] = useState([]);

  // review form
  const [reviewRating, setReviewRating] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const nameRef = useRef();
  const titleRef = useRef();
  const reviewRef = useRef();
  const [uploadImage, setUploadImage] = useState(null);

  let sum = 0;
  for (var i = 0; i < newReviews.length; i++) {
    sum += newReviews[i].rating;
  }
  let ratingAvg = (sum / newReviews.length).toFixed(1);

  async function handleReview() {
    const selectedImage = uploadImage;

    client.assets
      .upload("image", selectedImage, {
        contentType: selectedImage.type,
        filename: selectedImage.name,
      })
      .then(async (doc) => {
        const review = {
          _type: "review",
          slug: slug.current,
          name: nameRef.current.value,
          rating: reviewRating,
          title: titleRef.current.value,
          contents: reviewRef.current.value,
          image: doc._id && {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: doc._id,
            },
          },
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
              body: JSON.stringify(slug),
            }
          );
          // .then((res) => {
          //   toast.success("Review successfully created!");
          //   console.log(res);
          // });
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setCurrentImage(image[0]);
    setNewReviews(
      reviews.filter((review) => {
        return review.slug === product.slug.current;
      })
    );
    setFooterColor(color);
  }, [router]);

  return (
    <>
      <Head>
        <title>{name} | Jazzy Can Knot</title>
        <meta name="theme-color" content={color} />
      </Head>
      <div className={styles.grid}>
        <div className={styles.imageContainer}>
          <img
            src={urlFor(currentImage)}
            alt="preview"
            className={styles.mobileImage}
          />
          {image?.map((image, index) => {
            return (
              <div key={index} className={styles.imgWrapper}>
                <img
                  src={urlFor(image)}
                  alt="preview"
                  onMouseEnter={() => setCurrentImage(image)}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.content}>
          <header className={styles.heading}>
            <button className="dim" onClick={() => router.back()}>
              <h5>
                <FontAwesomeIcon icon={faChevronLeft} />
              </h5>
            </button>
            <h1>{name}</h1>
          </header>
          <Link
            href={`/collections/${
              collections && collections[0].replaceAll(" ", "-").toLowerCase()
            }`}
          >
            <p className="dim">{collections && collections[0]}</p>
          </Link>
          <h3>
            $
            {
              price[
                size === "B"
                  ? 0
                  : size === "S"
                  ? 1
                  : size === "M"
                  ? 2
                  : size === "L"
                  ? 3
                  : 0
              ]
            }
          </h3>
          <h5 className="dim">
            {size === "B" && "Baby - 1x1 yard"}
            {size === "S" && "Small - 2x2 yards"}
            {size === "M" && "Medium - 3x3 yards"}
            {size === "L" && "Large - 4x4 yards"}
          </h5>
          <p>{details}</p>
          <div className={styles.sizeSelector}>
            <header>
              <h6>Select Size</h6>
              <h6 className="dim">Size Guide</h6>
            </header>
            <main>
              <button
                onClick={() => {
                  setSize("B");
                }}
                className={`btn-square ${size === "B" && styles.active}`}
              >
                B
              </button>
              <button
                onClick={() => {
                  setSize("S");
                }}
                className={`btn-square ${size === "S" && styles.active}`}
              >
                S
              </button>
              <button
                onClick={() => {
                  setSize("M");
                }}
                className={`btn-square ${size === "M" && styles.active}`}
              >
                M
              </button>
              <button
                onClick={() => {
                  setSize("L");
                }}
                className={`btn-square ${size === "L" && styles.active}`}
              >
                L
              </button>
            </main>
          </div>
          <div className={styles.buttons}>
            <button
              className="btn-primary"
              onClick={() => {
                setShowCart(true);
                onAdd(
                  {
                    ...product,
                    price:
                      price[
                        size === "B"
                          ? 0
                          : size === "S"
                          ? 1
                          : size === "M"
                          ? 2
                          : size === "L"
                          ? 3
                          : 0
                      ],
                    size,
                  },
                  quantity
                );
              }}
            >
              Add to Cart
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
            <button className="btn-secondary">Share</button>
          </div>
          <div className={styles.reviewContainer}>
            {newReviews?.length > 0 && (
              <header className={styles.reviewHeader}>
                <h1>
                  {ratingAvg} <span className="dim">/ 5</span>
                </h1>
                <h4>Based on {`${newReviews?.length}`} Reviews</h4>

                {newReviews?.length > 0 && (
                  <div className={styles.overallStars}>
                    {[...Array(Math.floor(ratingAvg))].map((e, index) => {
                      return (
                        <FontAwesomeIcon
                          key={index}
                          className={styles.star}
                          icon={faStar}
                        />
                      );
                    })}
                    {ratingAvg % 1 === 0 &&
                      [...Array(5 - Math.floor(ratingAvg))].map((e, index) => {
                        return (
                          <FontAwesomeIcon
                            key={index}
                            className={styles.starOpaque}
                            icon={faStar}
                          />
                        );
                      })}
                    {ratingAvg % 1 !== 0 && (
                      <FontAwesomeIcon
                        className={styles.star}
                        icon={faStarHalfAlt}
                      />
                    )}
                    {ratingAvg % 1 !== 0 &&
                      [...Array(5 - Math.floor(ratingAvg) - 1)].map(
                        (e, index) => {
                          return (
                            <FontAwesomeIcon
                              key={index}
                              className={styles.starOpaque}
                              icon={faStar}
                            />
                          );
                        }
                      )}
                  </div>
                )}
              </header>
            )}

            <div className={styles.reviews}>
              {newReviews?.map((review, index) => (
                <Review key={index} review={review} />
              ))}
              {newReviews?.length <= 0 && (
                <>
                  <p className="dim">
                    There are no reviews for this product. Be the first to leave
                    a rating.
                  </p>
                </>
              )}
              {showForm && (
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
                            onMouseEnter={() =>
                              setReviewRating(reviewRating + index + 1)
                            }
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
                    {uploadImage && (
                      <img src={URL.createObjectURL(uploadImage)} />
                    )}
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
                  <input
                    ref={reviewRef}
                    placeholder="Let future buyers know."
                  />
                  <div className={styles.actions}>
                    <button className="btn-small" onClick={handleReview}>
                      Post
                    </button>
                    <button
                      className="btn-small danger"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {!showForm && (
                <button className="btn-small" onClick={() => setShowForm(true)}>
                  Leave a Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.products}>
        <div className="gap" />
        <Products
          title="You Might Also Like"
          products={products}
          reviews={reviews}
          max={3}
        />
        <div className="gap" />
      </div>
    </>
  );
}

function Review({
  review: { name, contents, rating, title, _createdAt, image },
}) {
  const date = new Date(_createdAt);

  const url = image && urlFor(image?.asset._ref);
  return (
    <div className={styles.review}>
      <header>
        <h6>
          {name} <span className="dim">{date.toLocaleDateString()}</span>
        </h6>
        <div className={styles.stars}>
          {[...Array(rating)].map((e, index) => {
            return (
              <FontAwesomeIcon
                key={index}
                className={styles.star}
                icon={faStar}
              />
            );
          })}
          {[...Array(5 - rating)].map((e, index) => {
            return (
              <FontAwesomeIcon
                key={index}
                className={styles.starOpaque}
                icon={faStar}
              />
            );
          })}
        </div>
      </header>
      <main>
        <div className={styles.content}>
          <p>{title}</p>
          <p className="dim">{contents}</p>
        </div>

        <div className={styles.images}>
          {image && <img src={url?.options.source && url.url()} />}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productsQuery = `*[_type == "product" && slug.current != '${slug}']`;
  const orderedProducts = await client.fetch(productsQuery);

  const reviewQuery = `*[_type == "review"]`;
  const reviews = await client.fetch(reviewQuery);

  function shuffleArray(array) {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }

  const products = shuffleArray(orderedProducts);

  return {
    props: { product, products, reviews },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
