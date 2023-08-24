
import Layout from "../Componets/Layout/layout"
import Header from "../Componets/Header/header";
import Footer from "../Componets/Footer/footer";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setProduct,selectProduct } from "../redux/actions/action";
import './productlist.css'

const ProductList = ()=>{
    const product = useSelector((state)=>state);
    const dispatch = useDispatch;
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
        return () => {dispatch(removeProduct())}
      }, []);


    return <>
    <Header/>
    <Layout>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4  g-4">
          {product.Allproduct.lenght !== 0 ? (
            product.Allproduct.map((element, index) => (
              <div className="col" key={index}>
                <div className="card" style={{height:"400px"}}>
                <div className="card-img" style={{backgroundImage:`url(${element.image})`}}/>
                  <div className="card-body">
                    <h5 className="card-title">{element.title}</h5>
                    <p className="card-text">
                      <span>
                        Price:<span>{element.price}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>loading....</h1>
          )}
        </div>
    </Layout>
    <Footer/>
    </>
}

export default ProductList