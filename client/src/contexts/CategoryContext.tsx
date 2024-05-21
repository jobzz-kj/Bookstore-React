import {CategoryContextProps, CategoryItem, backendApi} from "../types";
import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';

function CategoryContext({children}: CategoryContextProps) {
    const [categories, setCategories] = useState([]);

//to download the categories data from the database
    useEffect(() => {
        axios.get(`http://${backendApi}/api/categories`)
            .then((result) => {
                setCategories(result.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Category.Provider value={categories}>{children}</Category.Provider>
    );
}

export default CategoryContext;