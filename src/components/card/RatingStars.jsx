import React from "react";
import styles from "./Card.module.scss";

//Ustoz nimagadir rating stars ishlamadi shuncha urunib ko'rdim


const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? styles.filled : styles.empty}>
        &#9733;
      </span>
    );
  }
  return <div className={styles.ratingStars}>{stars}</div>;
};

export default RatingStars;
