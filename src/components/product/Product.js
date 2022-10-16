import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { selectProducts, STORE_PRODUCTS } from '../../redux/slice/productSlice';
import styles from "./Product.module.scss";
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';


const Product = () => {

  const {data, isLoading} = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  // récupération des datas/produits ds le store
  useEffect(() => {
    dispatch(
                STORE_PRODUCTS({
                  products: data,
                }));

  }, [data, dispatch]);

  return (
    <section className=''>
        <div className={`container ${styles.product}`}>
            <aside className={styles.filter}>
               <ProductFilter/> 
            </aside>
            <div className={styles.content}>
                <ProductList products={products}/>
            </div>
        </div> 
    </section>
  );
};

export default Product
