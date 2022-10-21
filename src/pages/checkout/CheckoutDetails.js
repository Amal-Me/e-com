import React, { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';
import { SAVE_BILLING_ADRESS, SAVE_SHIPPING_ADRESS } from '../../redux/slice/checkoutSlice';
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
    const [shippingAdress, setShippingAdress] = useState({...initialAdressState,});
    const [billingAdress, setBillingAdress] = useState({...initialAdressState,});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShipping = (e) => {
      const {name, value} = e.target;
      setShippingAdress({
        ...shippingAdress,
        [name]: value,
      });
    };

    const handleBilling = (e) => {
      const {name, value} = e.target;
      setBillingAdress({
        ...billingAdress,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(SAVE_SHIPPING_ADRESS(shippingAdress));
      dispatch(SAVE_BILLING_ADRESS(billingAdress));
      navigate("/checkout");
    };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* SHIPPING ADRESS / ADRESSE DE LIVRAISON */}
            <Card cardClass={styles.card}>
              <h3>Shipping adress</h3>
              {/* nom destinataire */}
              <label>Recipient Name</label>
              <input type="text" 
              placeholder='Recipient name'
              required
              name='name'
              value={shippingAdress.name}
              onChange={(e) => handleShipping(e)}/>
              {/* adress */}
              <label>Adress line1</label>
              <input type="text" 
              placeholder='Adress line1'
              required
              name='line1'
              value={shippingAdress.line1}
              onChange={(e) => handleShipping(e)}/>
              {/* adress2 */}
              <label>Adress line2</label>
              <input type="text" 
              placeholder='Adress line2'
              name='line2'
              value={shippingAdress.line2}
              onChange={(e) => handleShipping(e)}/>
              {/* city */}
              <label>City</label>
              <input type="text" 
              placeholder='City'
              required
              name='city'
              value={shippingAdress.city}
              onChange={(e) => handleShipping(e)}/>
              {/* state */}
              <label>State</label>
              <input type="text" 
              placeholder='State'
              required
              name='state'
              value={shippingAdress.state}
              onChange={(e) => handleShipping(e)}/>
              {/* postal code */}
              <label>Postal Code</label>
              <input type="text" 
              placeholder='Postal Code'
              required
              name='postal_code'
              value={shippingAdress.postal_code}
              onChange={(e) => handleShipping(e)}/>
              {/* COUNTRY */}
              <CountryDropdown 
              className={styles.select}
              valueType='short'              
              value={shippingAdress.country}
              onChange={(val) => handleShipping({
                target: {
                  name: "country",
                  value: val
                }
              })}              
              />
              {/* PHONE NUMBER */}
              <label>Phone</label>
              <input type="text" 
              placeholder='Phone'
              required
              name='phone'
              value={shippingAdress.phone}
              onChange={(e) => handleShipping(e)}/>
            </Card>

            {/* BILLING ADRESS/ ADRESSE DE FACTURATION */}
            <Card cardClass={styles.card}>
              <h3>Billing adress</h3>
              {/* nom  */}
              <label>Name</label>
              <input type="text" 
              placeholder='Recipient name'
              required
              name='name'
              value={billingAdress.name}
              onChange={(e) => handleBilling(e)}/>
              {/* adress */}
              <label>Adress line1</label>
              <input type="text" 
              placeholder='Adress line1'
              required
              name='line1'
              value={billingAdress.line1}
              onChange={(e) => handleBilling(e)}/>
              {/* adress2 */}
              <label>Adress line2</label>
              <input type="text" 
              placeholder='Adress line2'
              name='line2'
              value={billingAdress.line2}
              onChange={(e) => handleBilling(e)}/>
              {/* city */}
              <label>City</label>
              <input type="text" 
              placeholder='City'
              required
              name='city'
              value={billingAdress.city}
              onChange={(e) => handleBilling(e)}/>
              {/* state */}
              <label>State</label>
              <input type="text" 
              placeholder='State'
              required
              name='state'
              value={billingAdress.state}
              onChange={(e) => handleBilling(e)}/>
              {/* postal code */}
              <label>Postal Code</label>
              <input type="text" 
              placeholder='Postal Code'
              required
              name='postal_code'
              value={billingAdress.postal_code}
              onChange={(e) => handleBilling(e)}/>
              {/* COUNTRY */}
              <CountryDropdown 
              className={styles.select}
              valueType='short'              
              value={billingAdress.country}
              onChange={(val) => handleBilling({
                target: {
                  name: "country",
                  value: val
                }
              })}              
              />
              {/* PHONE NUMBER */}
              <label>Phone</label>
              <input type="text" 
              placeholder='Phone'
              required
              name='phone'
              value={billingAdress.phone}
              onChange={(e) => handleBilling(e)}/>
              <button type='submit' className='--btn --btn-primary'>Proceed to checkout</button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary/>
            </Card>
          </div>
        </form>
      </div>
        
    </section>
  )
}

export default CheckoutDetails;