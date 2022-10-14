import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import styles from "./ViewProducts.module.scss";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import { STORE_PRODUCTS } from '../../../redux/slice/productSlice';



const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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
          // console.log(allProducts);
          setProducts(allProducts);
          setIsLoading(false);
          // on stock le state "allProducts" ds le store
          dispatch(
            STORE_PRODUCTS({
              products: allProducts,
            }))
        });   
      
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
  };

  // confirmation avant suppression
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product ?',
      'You are about delete this product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("product deleted");
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "orangered",
        okButtonBackground:"orangered",
        cssAnimationStyle: "zoom",
        // etc...
      },
    );
  };
  // suppression du produit stockage firebase
  const deleteProduct = async(id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);

      toast.success("product deleted successfully.")
      
    } catch (error) {
      toast.error(error.message);
    };
  };

  return (
    <>
    {isLoading && <Loader />}
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
              <td className={styles.icons}>
                {/* on specifie l id en params pr editer LE prod specifié */}
                <Link to={`/admin/add-product/${id}`}>
                  <FaEdit size={20} color="green"/>
                </Link>
                &nbsp;
                <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id, imageURL)}/>
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
