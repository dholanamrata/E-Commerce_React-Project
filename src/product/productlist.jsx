
import Layout from "../Componets/Layout/layout"
import Header from "../Componets/Header/header";
import Footer from "../Componets/Footer/footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, removeProduct, selectProduct } from "../redux/actions/action";
import './productlist.css'
import ControlledCarousel from './carousal'
import { Link } from "react-router-dom";

const ProductList = () => {
 const productData = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://fakestoreapi.com/products").then(
          (res) => res.json()
        );
        dispatch(setProduct(response));
      } catch (err) {
        console.log("err", err.message);
      }
    }
    fetchData();
    return () => {
      dispatch(removeProduct());
    };
  }, []);

  const MyAllProducts = productData.Allproduct.products;
  const FilterProduct = productData.Allproduct.filteredProducts;
  const AppliedFilterArry = productData.Allproduct.appliedFilters;
  return <>
    <Header />
    <Layout>
    <div>
                  <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Enable body scrolling</button>
                  <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                    </div>
                    <div className="offcanvas-body">
                      <p>Try scrolling the rest of the page to see this option in action.</p>
                    </div>
                  </div>
                </div>

      <div className="mb-5">
        <ControlledCarousel />
      </div>



      {/* ---------------------------product listing------------------------- */}
    

      <div className=" product row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-5 mb-5 g-4">
      {productData.Allproduct.products.length === 0 ? (
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
                      <p className="card-text">
                        <h5>
                          <span class="badge bg-success">
                            {element.rating.rate} &#9734;
                          </span>
                        </h5>
                      </p>
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
                      <p className="card-text">
                        <h5>
                          <span class="badge bg-success">
                            {element.rating.rate} &#9734;
                          </span>
                        </h5>
                      </p>
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