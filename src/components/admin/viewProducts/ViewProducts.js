import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import styles from "./ViewProducts.module.scss";
import {FaEdit, FaTrashAlt} from "react-icons/fa";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch les produits au chargement de la page
  useEffect(() => {
    getProducts()
  }, []);
  

  // récupération des datas/produits sur firebase
  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");
      // tri par date de creation
      const q = query(productsRef, orderBy("createdAt", "desc"));
      
      onSnapshot(q, (Snapshot) => {
          // console.log(Snapshot.docs);
          const allProducts = Snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(allProducts);
          setProducts(allProducts);
          setIsLoading(false);
        });   
      
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
  }
  return (
    <>
    <div className={styles.table}>
    <h2>All Products</h2>

    {products.length === 0 ? (
    <p>No products found.</p>) : (
      <table>
        <thead>
        <tr>
          <th>s/n</th>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>          
        </tr>
        </thead>
        <tbody>
        {products.map((product, index) => {
          const {id, name, price, imageURL, category} = product;
          return(            
            <tr key={id}>
              <td>
                {index + 1}
              </td>
              <td>
                <img src={imageURL} alt={name}  style={{width: "100px"}}/>
              </td>
              <td>
                {name}
              </td>
              <td>
                {category}
              </td>
              <td>
                {`$${price}`}
              </td>
              <td>
                <Link to="/admin/add-product">
                  <FaEdit size={20} color="green"/>
                </Link>
                &nbsp;
                <FaTrashAlt size={18} color="red"/>
              </td>
            </tr>
            
          )
        })}
        </tbody>
      </table>
    )}
    </div>
      
    </>
  )
};

export default ViewProducts;
