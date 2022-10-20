import React, { useState } from 'react';
import styles from "./CheckoutDetails.module.scss";

const initialAdressState = {
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone:"",
}

const CheckoutDetails = () => {
    const [shippinAdress, setShippinAdress] = useState({})
    const [billingAdress, setBillingAdress] = useState({...initialAdressState})

  return (
    <div>
        <h2>Checkout Details</h2>
    </div>
  )
}

export default CheckoutDetails;