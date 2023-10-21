import React from "react";

import Header from "../../../Componets/Header/header"
import Footer from "../../../Componets/Footer/footer";

import PaymentForm from "./paymentForm";

import "./payment.css";

const Payment = () => {
  const citiesInIndia = [
    "Mumbai, Maharashtra",
    "Delhi, National Capital Territory of Delhi",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Pune, Maharashtra",
    "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
    "Kanpur, Uttar Pradesh",
    "Nagpur, Maharashtra",
    "Patna, Bihar",
    "Indore, Madhya Pradesh",
    "Thane, Maharashtra",
    "Bhopal, Madhya Pradesh",
    "Visakhapatnam, Andhra Pradesh",
    "Vadodara, Gujarat",
    "Coimbatore, Tamil Nadu",
    "Ludhiana, Punjab",
    "Kochi, Kerala",
    "Agra, Uttar Pradesh",
    "Madurai, Tamil Nadu",
    "Varanasi, Uttar Pradesh",
    "Meerut, Uttar Pradesh",
    "Nashik, Maharashtra",
    "Rajkot, Gujarat",
    "Srinagar, Jammu and Kashmir",
    "Amritsar, Punjab",
    "Allahabad, Uttar Pradesh",
  ];

  return (
    <>
      <Header />
      <PaymentForm cities={citiesInIndia} />
      <Footer />
    </>
  );
};

export default Payment;