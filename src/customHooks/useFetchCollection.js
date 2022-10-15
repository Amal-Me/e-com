import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

// customHook pr recup les datas de firebase et pouvoir utiliser le fetch partout ds l app
const useFetchCollection = (collectionName) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // récupération des datas/produits sur firebase
  const getCollection = () => {
    setIsLoading(true);

    try {
      const docRef = collection(db, collectionName);
      // tri par date de creation
      const q = query(docRef, orderBy("createdAt", "desc"));
      
      onSnapshot(q, (Snapshot) => {
          // console.log(Snapshot.docs);
          const allData = Snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(allData);
          setData(allData);
          setIsLoading(false);
          // on stock le state "allData" ds le store          
        });   
      
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
  };
  useEffect(() => {
    getCollection();
  }, []);

  return {data, isLoading};
};

export default useFetchCollection;