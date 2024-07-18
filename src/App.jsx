import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom";
import Products from "./components/Products/Products.jsx";
import Product from "./components/Product/Product.jsx";
import Cart from "./components/Cart/Cart.jsx";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Router>
        <header>
          <div className="header-container">
            <div className="logo">
              <img className="logo-img" src="./public/logo.svg" alt="" />
              <img className="phone-img" src="./public/phone.svg" alt="" />
              <p>+ 4904-049-950</p>
            </div>
            <div className="header-text">
              <p>Get 50% Off on the Selected items</p>
              <span className="line"></span>
              <p>Shop now</p>
            </div>
            <div className="inputs">
              <div className="lang-menu">
                <div className="selected-lang">
                  English
                </div>
                <ul>
                  <li>
                    <Link to="#" className="de">German</Link>
                  </li>
                  <li>
                    <Link to="" className="en">English</Link>
                  </li>
                  <li>
                    <Link to="" className="fr">French</Link>
                  </li>
                  <li>
                    <Link to="" className="ar">Arabic</Link>
                  </li>
                </ul>
              </div>
              <div className="location">
                <img src="./public/location.svg" alt="" />
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path='/' element={<Products cart={cart} setCart={setCart} />} />
          <Route path='/Products/:productId' element={<Product />} />
          <Route path='/Cart' element={<Cart products={cart} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
