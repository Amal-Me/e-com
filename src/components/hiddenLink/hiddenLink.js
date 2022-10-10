// permet de selectionner ds le store
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';


// element pr wrapper l'élément(props) a afficher qd l utilisateur est connecté 
const ShowOnLogin = ({children}) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(isLoggedIn) {
        return children
    }
    return null;
}

// pareil pr qd il est deco
export const ShowOnLogout = ({children}) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(!isLoggedIn) {
        return children
    }
    return null;
}

export default ShowOnLogin;


