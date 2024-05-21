import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import {Link, useLocation, useParams} from 'react-router-dom';
import {useContext} from "react";
import {CategoryItem} from "../types";
import {Category} from "../contexts/CategoryContext";


function HeaderDropdown() {
    const categories = useContext<CategoryItem[]>(Category);
    let location = useLocation();
    const currentLocation = location.pathname;
    return (

        <div className="header-dropdown">
            <button
                className={`categories-button ${currentLocation == '/categories/Best%20Sellers' || currentLocation == `/categories/New%20Arrivals` || currentLocation == `/categories/Fiction` || currentLocation == `/categories/Non-Fiction` || currentLocation == `/categories/Kids` ? 'categories-button-active' : ''}`}>Categories
            </button>
            <ul>
                {categories.map((item) =>
                    <Link key={item.categoryId} to={`/categories/${item.name}`}>
                        <li key={item.categoryId}>
                            {item.name}</li>
                    </Link>
                )}

            </ul>

        </div>

    )
}

export default HeaderDropdown

