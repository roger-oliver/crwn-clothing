import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [ products, setProducts ] = useState([]);
  const value = { products };

  useEffect(() => {
    const getCategoriesAndItems = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      console.log(categoriesMap);
    };
    getCategoriesAndItems();
  }, []);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}