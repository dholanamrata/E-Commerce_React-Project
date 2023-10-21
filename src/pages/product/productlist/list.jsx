import { useEffect } from "react";

import { Link } from "react-router-dom";

import Layout from "../../../Componets/Layout/layout"
import Header from "../../../Componets/Header/header";
import Footer from "../../../Componets/Footer/footer";

import { useDispatch, useSelector } from "react-redux";
import { setProduct, removeProduct } from "../../../redux/actions/action";

import ControlledCarousel from '../carosal/carousal'

import './list.css'

const ProductList = () => {

  const productData = useSelector((state) => state.Allproduct);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(import.meta.env.VITE_PRODUCT_LIST_API).then(
          (res) => res.json()
        );
        dispatch(setProduct(response));
      } catch (err) {
        alert("product not found")
      }
    }
    fetchData();
    return () => {
      dispatch(removeProduct());
    };
  }, []);

  const MyAllProducts = productData.products;
  const FilterProduct = productData.filteredProducts;
  const AppliedFilterArry = productData.appliedFilters;

  return <>
    <Header />
    <Layout>
      <div>
        <ControlledCarousel />
      </div>
      {/* ---------------------------product listing------------------------- */}
      <div className=" product row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4  gx-4 gy-1">
        {productData.products.length === 0 ? (
          <h1>loading....</h1>
        ) : AppliedFilterArry.length === 0 ? (
          MyAllProducts.map((element, index) => (
            <Link
              to={`/product/detail/${element.id}`}
              key={index}
              className="listAnchor"
            >
              <div className="col">
                <div className="card" style={{ height: "400px" }}>
                  <div
                    className="card-img"
                    style={{ backgroundImage: `url(${element.image})` }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.title}</h5>
                    <p className="card-text">
                      <span>
                        Price:<span>{element.price}</span>
                      </span>
                    </p>
                    <h5>
                      <p className="card-text">
                        <span className="badge bg-success">
                          {element.rating.rate} &#9734;
                        </span>
                      </p>
                    </h5>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          FilterProduct.map((element, index) => (
            <Link
              to={`/product/detail/${element.id}`}
              key={index}
              className="listAnchor"
            >
              <div className="col">
                <div className="card" style={{ height: "400px" }}>
                  <div
                    className="card-img"
                    style={{ backgroundImage: `url(${element.image})` }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.title}</h5>
                    <p className="card-text">
                      <span>
                        Price:<span>{element.price}</span>
                      </span>
                    </p>
                    <h5>
                      <p className="card-text">
                        <span className="badge bg-success">
                          {element.rating.rate} &#9734;
                        </span>
                      </p>
                    </h5>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </Layout>
    <Footer />
  </>
}

export default ProductList