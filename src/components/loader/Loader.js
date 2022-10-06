import ReactDOM from "react-dom";
import styles from "./Loader.module.scss";
import loaderImg from "../../assets/loader.gif";

// image d'attente de chargement rataché a une div ds le html pour couvrir tte la page
const Loader = () => {
  return ReactDOM.createPortal (
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={loaderImg} alt="loading..." />
        </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader;