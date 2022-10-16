// import React, { useEffect } from 'react';
import Product from '../../components/product/Product';
// import AdminOnlyRoute from '../../components/adminOnlyRoute/AdminOnlyRoute';
// import Slider from '../../components/slider/Slider';
// import styles from "./Home.module.scss";

const Home = () => {
  const url = window.location.href;
  
  const scrollToProducts = () => {
    if(url.includes("#products")) {
      window.scrollTo({
        top:700,
        behavior: "smooth"
      })
      return;
    };
  };

  // useEffect(() => {
  //   scrollToProducts()
  // }, []);
  
  return (
    <div>
      {/* <AdminOnlyRoute /> */}
      {/* <Slider/> */}
      <Product/>
    </div>
  )
}

export default Home;