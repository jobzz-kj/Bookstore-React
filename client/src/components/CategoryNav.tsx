import '../assets/css/CategoryNav.css';
import '../assets/css/global.css';
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { CategoryItem } from "../types";
import { Category } from "../contexts/CategoryContext";

function CategoryNav() {
    const categories = useContext<CategoryItem[]>(Category);
    const { categoryId  } = useParams();
    return (
        <div>
            <nav className="category-nav">
                <ul className="category-buttons">
                    {categories.map((category) => (
                        <li key={category.categoryId}>
                            <Link to={`/categories/${category.name}`} className={`unselected-category-button ${category.name === categoryId ? 'unselected-category-button-active' : ''}`}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default CategoryNav;
