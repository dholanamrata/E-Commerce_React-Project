
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
  const product = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://fakestoreapi.com/products").then(
          (res) => res.json()
        );
        console.log(response);
        dispatch(setProduct(response));
      } catch (err) {
        console.log("err", err.message);
      }
    }
    fetchData();
    return () => { dispatch(removeProduct()) }
  }, []);
  return <>
    <Header />
    <Layout>
      <div className="mb-5">
        <ControlledCarousel />
      </div>



      {/* ---------------------------product listing------------------------- */}
    

      <div className=" product row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-5 mb-5 g-4">
        {product.Allproduct.length === 0 ? (
          <h1>loading....</h1>
        ) :
          (
            product.Allproduct.map((element, index) => (
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
                      <h5><span className="badge bg-success">{element.rating.rate} &#9734;</span></h5>

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