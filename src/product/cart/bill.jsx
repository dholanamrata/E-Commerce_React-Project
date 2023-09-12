import React from "react";

const ProductBill = ({ list }) => {
    let sum = 0;
    let totalQuantity = 0;
    list.map((element) => {
        const productTotal = element.Quantity * element.price;
        sum += productTotal;

        totalQuantity += element.Quantity;
    });
    const floatsum = parseFloat(sum.toFixed(2));
    // discount
    //   const discountPercentage = 10; // Example: 10% discount
    //   const discountAmount = (sum * discountPercentage) / 100;

    //   const discountedTotal = sum - discountAmount;
    //   const floatdiscount = parseFloat(discountedTotal.toFixed(2));
    //   // totalAmount
    //   const totalAmount = sum - discountAmount;
    //   const floatTotalnumber = parseFloat(totalAmount.toFixed(2));

    return (
        // <div className="main ">
        //   {list.length !== 0 && (
        //     <div className="card mt-5 ms-5">
        //       <div className="card-body">
        //         <h5 className="card-title ">Price Details</h5>
        //         <p className="card-text disable">
        //           safe and secure payments.Easy returns. 100% Authentic products.
        //         </p>
        //         <div className="d-flex justify-content-between">
        //           <p className="card-text">Price ({totalQuantity} items)</p>
        //           <p className="card-text">&#x20B9;{floatsum}</p>
        //         </div>
        //         <div className="d-flex justify-content-between">
        //           <p className="card-text">Discount</p>
        //           <p className="card-text">{floatdiscount}%</p>
        //         </div>
        //         <div className="d-flex justify-content-between">
        //           <p className="card-text">Delivery Charges</p>
        //           <p className="card-text text-success fw-bold">FREE Delivery</p>
        //         </div>
        //         <div className="d-flex justify-content-between">
        //           <p className="card-text fw-semibold fs-5">Total Amount </p>
        //           <p className="card-text fw-semibold fs-5">
        //             &#x20B9;{floatTotalnumber}
        //           </p>
        //         </div>
        //         <div className="d-flex justify-content-end">
        //           <a href="#" className="btn w-50 btn-primary">
        //             Place Order
        //           </a>
        //         </div>
        //       </div>
        //     </div>
        //   )}
        // </div>
        <div class="col">
            {list.length !== 0 && (
                <div className="card mb-5 mt-5">
                    <div className="p-2">
                        <p>Your order is eligible for FREE Delivery. </p>

                        <div className=" border-top mt-2">
                            <h2>Total Amount : {floatsum}</h2>
                            <button type="button" className="btn btn-warning">Proceed to Buy</button>
                        </div>
                        <p className="border-top mt-2 p-1">
                            Safe and Secure Payments.Easy returns.100% Authentic products.
                        </p>

                    </div>
                </div>

            )}

        </div>
    );
};

export default ProductBill;