import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import styles from "./Product.module.css";
import { Link } from 'react-router-dom';
import Button from "../button/Button";


const baseURL = import.meta.env.VITE_BASE_URL;

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductById() {
      try {
        const response = await fetch(`${baseURL}/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProductById();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <div key={product.id} className={styles.productContainer}>

      <div className={styles.goback}><Link className={styles.link} to={`/`}><p>Go Back</p></Link></div>
      <p className={styles.path}>Products  /  Gaming Headsets & Audio   /  Astro A50 X Wireless Headset</p>

      <div className={styles.productMain} >
        <img className={styles.productImg} src={product.image_url} alt="" />

        <div>
          <h1>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <img className={styles.reviews} src="../../../public/re.svg" alt="" />
          <span className={styles.line}></span>
          <h1 className={styles.price}>$ {product.price} or 99.99/month</h1>
          <p className={styles.description}>Suggested payments with 6 month  special financing</p>
          <span className={styles.line}></span>
          <h1 className={styles.colorName}>Choose a color</h1>
          <div className={styles.colors}>
            {product.color_options.map((color, index) => (
              <div
                key={index}
                style={{
                  background: color,
                }}
                className={styles.color}
              />
            ))}
          </div>
          <span className={styles.line}></span>
          <div>
            <Button onClick={() => setCart([...cart, product])}>
              <FaCartShopping />
              <span style={{ marginLeft: "0.8em" }}>Add to Cart</span>
            </Button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Product;
