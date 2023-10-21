import React from "react";
import Targetbtn from "../../../Componets/target-buttons/targetBtn"

const ProductBill = ({ list, text, routeForPay, myAddress }) => {

    let sum = 0;
    let totalQuantity = 0;
    list.map((element) => {
        const productTotal = element.Quantity * element.price;
        sum += productTotal;
        totalQuantity += element.Quantity;
    });
    const floatsum = parseFloat(sum.toFixed(2));

    return (
        <div className="col">
            {list.length !== 0 && (
                <div className="card mb-5 mt-5">
                    <div className="p-2">
                        <p>Your order is eligible for FREE Delivery. </p>
                        <div className="border-top mt-2">
                            <h2>Total Amount : {floatsum}</h2>
                            <Targetbtn route={routeForPay} btnText={text} />
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