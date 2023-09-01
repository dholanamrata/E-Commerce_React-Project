import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector  } from "react-redux";

import './header.css'
const Header = () => {
  const product = useSelector((state) => state);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <GiShoppingCart style={{ fontSize: "2rem" }} />
            E-commerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-underline">
              <li className="nav-item">
                <Link to="/" className="nav-link ">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart({product.cartProduct.length})
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;