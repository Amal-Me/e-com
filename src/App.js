import {BrowserRouter, Route, Routes,} from "react-router-dom";
// notifications avec style
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//regroupement des imports de fichiers via un index
// pages/index
import {Home, Contact, Login, Register,Reset,Admin} from "./pages";
// components/index
import {Header, Footer} from "./components";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";



function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route  path="/contact" element={ <Contact/>}/>
          <Route  path="/login" element={ <Login/>}/>
          <Route  path="/register" element={ <Register/>}/>
          <Route  path="/reset" element={ <Reset/>}/>
          
          <Route  path="/admin/*" 
          element={ 
          <AdminOnlyRoute>
            <Admin/>
          </AdminOnlyRoute>}/>
          <Route  path="/product-details/:id" element={ <ProductDetails/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
