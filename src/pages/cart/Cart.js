import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import styles from "./Cart.module.scss";
import {FaTrashAlt} from "react-icons/fa";
import { Link } from 'react-router-dom';



const Cart = () => {

  const cartItems = useSelector(selectCartItems);
  // const cartTotalAmount = useSelector(selectCartTotalAmount);
  // const cartTotalQuantity= useSelector(selectCartTotalQuantity);

  console.log(cartItems)
  return (
    <section>    
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {!cartItems.length  ? (
          <>
            <p>Your cart is empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          
          <table>
            <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((cart, index) => {
                  const {id, name, price, imageURL, cartQuantity} = cart;
                  return(
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} style={{width: "100px"}} />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className='--btn'>-</button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className='--btn'>+</button>
                        </div>
                      </td>
                      <td>
                        {(price * cartQuantity).toFixed(2)}
                      </td>
                      <td className={styles.icons}>
                        <FaTrashAlt size={19} color="red" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          
        )}
      </div>
    </section>    
  )
};

export default Cart;