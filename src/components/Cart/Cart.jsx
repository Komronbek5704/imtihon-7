import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Cart.module.css';
import Button from "../button/Button";

const Cart = ({ products }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = products.reduce((sum, product) => sum + product.price, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [products]);

  return (
    <div className={style.cartContainer}>
      <div className={style.cartHeader}>
        <Link className={style.link} to={`/`}><p className={style.goback}>Go Back</p></Link>
        <h2>SHOPPING CART</h2>
        <strong className={style.line}>-------------------------------------------------------------------------------------------------------------------------------------</strong>
      </div>
      <div className={style.carttext}>
        <h1 className={style.product}>Product</h1>
        <h1 className={style.quantity}>Description</h1>
        <h1 className={style.price}>Price</h1>
      </div>
      <strong className={style.line}>-------------------------------------------------------------------------------------------------------------------------------------</strong>
      <div className={style.productsContainerMain}>
        <div >
          {products.map((p) => (
            <div className={style.productContainer} key={p.id}>
              <img className={style.cartImg} src={p.image_url} alt="" />
              <div>
                <p className={style.productName}>{p.name}</p>
                <p className={style.description}>{p.description}</p>
              </div>
              <p className={style.proructprice}>${p.price}</p>
            </div>
          ))}
        </div><div className={style.totalpriceContainer}>
          <h1 className={style.total}>CART TOTALS</h1>
          <p>Shipping (3-5 Business Days)</p>
          <p>TAX (estimated for the United States (US))</p>
          <p>Subtotal</p>
          <h1 className={style.totalprice}>Total Price ={totalPrice}$</h1>
          <div>
            <Link className={style.link} to={`/`}><p className={style.goback}>Go Back</p></Link>
            <Button >
              <span>Checkout</span>
            </Button>
          </div>

        </div>
      </div>


    </div>
  );
};

export default Cart;
