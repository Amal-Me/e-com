import {BrowserRouter, Route, Routes,} from "react-router-dom";
// notifications avec style
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//regroupement des imports de fichiers via un index
// pages/index
import {Home, Contact, Login, Register,Reset} from "./pages";
// components/index
import {Header, Footer} from "./components";



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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
