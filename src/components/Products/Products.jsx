import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../store/productsSlice";
import { Link } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

const Products = ({ cart, setCart }) => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  const [sortOption, setSortOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch(`${baseURL}/brands`);
      const data = await response.json();
      setBrands(data);
    }

    async function fetchColors() {
      const response = await fetch(`${baseURL}/colors`);
      const data = await response.json();
      setColors(data);
    }

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = `${baseURL}/products`;

      const params = [];
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }
      if (sortOption) {
        params.push(`_sort=price&_order=${sortOption}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(`${query}`);
        const data = await response.json();
        dispatch(addProducts(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor, sortOption]);

  return (
    <div className={styles.productscontainer}>
      <div className={styles.hero}>
        <img className={styles.heroImg} src="../../public/hero.svg" alt="" />
        <nav className={styles.heroNav}>
          <ul>
            <li>Categories</li>
            <li>Brands</li>
            <li>What’s new</li>
            <li>Sales</li>
            <li>Help</li>
            <li>About</li>
          </ul>
        </nav>
        <div className={styles.herolink}>
          <img src="../../public/search.svg" alt="" />
          <img src="../../public/user.svg" alt="" />
          <Link to={`/Cart`} >{cart.length > 0 && (
            <span className={styles.cartCount}>{cart.length}</span>
          )}<img src="../../public/cart.svg" alt="" /> </Link>
        </div>
      </div>
      <div className={styles.hero2}>
        <h1>Filter by:</h1>
        <button className={styles.Sortby} onClick={() => setSortOption(sortOption === "asc" ? "desc" : "asc")}>
          Sort by
        </button>

      </div>
      <div className={styles.container}>
        <aside>
          <div className={styles.filterContainer}>
            <img src="../../public/line.svg" alt="" />
            <div className={styles.filterTitle}>
              <h2>BRAND</h2>
              <img src="../../public/up.svg" alt="" />
            </div>
            <ul>
              {brands.map((brand, index) => (
                <li className={styles.checkbox} key={index}>
                  <input className={styles.checkboxInput} type="radio" value={brand} name="brand" id={brand} checked={brand === selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} />
                  <label htmlFor={brand}>{brand}</label>
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedBrand("")}>Reset</button>
          </div>
          <div className={styles.conectivity}>
            <img src="../../public/line.svg" alt="" />
            <div className={styles.filterTitle}>
              <h2>CONNECTIVITY</h2>
              <img src="../../public/up.svg" alt="" />
            </div>
            <ul>
              <li><input></input>2.4 GHz wireless technology</li>
              <li><input></input> 3.5mm audio input</li>
              <li><input></input>Bluetooth</li>
              <li><input></input>LIGHTSPEED wireless technology</li>
              <li><input></input>Wired USB input</li>
              <li><input></input>USB-C</li>
            </ul>
          </div>
          <div className={styles.conectivity}>
            <img src="../../public/line.svg" alt="" />
            <div className={styles.filterTitle}>
              <h2>SERIES</h2>
              <img src="../../public/up.svg" alt="" />
            </div>
            <ul>
              <li><input></input>PRO</li>
              <li><input></input>basic</li>
              <li><input></input>Limited Edition</li>
            </ul>
          </div>
          <div className={styles.conectivity}>
            <img src="../../public/line.svg" alt="" />
            <div className={styles.filterTitle}>
              <h2>TECHNOLOGY</h2>
              <img src="../../public/up.svg" alt="" />
            </div>
            <ul>
              <li><input></input>LIGHTSPEED</li>
              <li><input></input>RGB LIGHTSYNC</li>
              <li><input></input>DTS surround sound technology</li>
              <li><input></input>BLUE V0!CE Mic Technology</li>
              <li><input></input>DTS Headphone X 2.0</li>
            </ul>
          </div>
          <div className={styles.colors}>
            <img src="../../public/line.svg" alt="" />
            <div className={styles.filterTitle}>
              <h2>COLORS</h2>
              <img src="../../public/up.svg" alt="" />
            </div>
            <ul className={styles.colorsContainer}>
              {colors.map((color, index) => (
                <li key={index}>
                  <div
                    style={{
                      background: color,
                      outline: selectedColor === color ? "3px solid red" : "",
                    }}
                    className={styles.color}
                    onClick={() => setSelectedColor(color)}
                  />
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedColor("")}>Reset</button>
          </div>
          <div className={styles.conectivity}>
            <img src="../../public/line.svg" alt="" />
            <div className={styles.filterTitle}>
              <h2>SORT BY</h2>
              <img src="../../public/up.svg" alt="" />
            </div>
            <ul>
              <li>Best match</li>
              <li>New</li>
              <li>Name</li>
              <li>Price - From highest to lowest</li>
              <li>Price - From lowest to highest</li>
              <li>Bestsellers</li>
              <li>outStanding</li>
              <li><span style={{ color: "red" }}>on Sale</span></li>
            </ul>
          </div>
        </aside>
        <main className={styles.main}>
          <div className={styles.productsConatiner}>
            {loading ? (
              <p className={styles.loading}> Loading... </p>
            ) : products.length ? (
              <div className={styles.grid}>
                {products.map((product) => (
                  <Card key={product.id} product={product} cart={cart} setCart={setCart} />
                ))}
              </div>
            ) : (
              <p>No products</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
