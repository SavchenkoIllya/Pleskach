import { Link } from "react-router-dom";
import styles from "./ArticleCard.module.scss";
import { memo } from "react";

const ArticleCard = memo(function ArticleCard({ title, content, img }) {
  return (
    <Link to={`/${title.toLowerCase()}`} state={{ title: title, content: content, img: img }}>
      <div className={styles.card}>
        <img src={img} alt="image" />
        <div className={styles.cardContent}>
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  );
});

export default ArticleCard;
