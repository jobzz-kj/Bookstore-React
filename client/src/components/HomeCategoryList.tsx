import '../assets/css/HomeCategoryList.css';
import {CategoryItem} from "../types";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";


function HomeCategoryList() {
    const categories = useContext<CategoryItem[]>(Category);

    return (

        <ul className="home-list">
            {categories.map((category) => (
                <li className="home-list-li">
                    <div className="home-list-div"> {category.name} </div>
                </li>
            ))}
        </ul>

    )
}

export default HomeCategoryList;
