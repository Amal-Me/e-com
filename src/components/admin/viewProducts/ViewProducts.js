import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import styles from "./ViewProducts.module.scss";

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
        });   
      
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
  }
  return (
    <div>
      <h2>vp</h2>
    </div>
  )
};

export default ViewProducts;
