import '../assets/css/CategoryBookListItem.css';
import '../types'
import {BookItem} from "../types";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";


const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.png`;
};

function CategoryBookListItem(props:BookItem) {
  const  {dispatch} = useContext(CartStore);
  const addBookToCart = () => {
    dispatch({ type: CartTypes.ADD, item:props, id: props.bookId });
  };
return (
    <section className="book-container">
      <div className="card">
        <div className="book-image">
            <img src={require(`../assets/images/books/` + bookImageFileName(props))} alt="book.title" className='book-style'/>
          {props.isPublic && <div className="read-now-container">
            <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M20.4545 0L14.7727 6.75V23.25L20.4545 16.5V0ZM6.25 4.5C4.03409 4.5 1.64773 5.1 0 6.75V28.74C0 29.115 0.284091 29.49 0.568182 29.49C0.681818 29.49 0.738636 29.385 0.852273 29.385C2.38636 28.41 4.60227 27.75 6.25 27.75C8.46591 27.75 10.8523 28.35 12.5 30C14.0341 28.725 16.8182 27.75 18.75 27.75C20.625 27.75 22.5568 28.215 24.1477 29.34C24.2614 29.415 24.3182 29.385 24.4318 29.385C24.7159 29.385 25 29.01 25 28.635V6.75C24.3182 6.075 23.5795 5.625 22.7273 5.25V25.5C21.4773 24.975 20.1136 24.75 18.75 24.75C16.8182 24.75 14.0341 25.725 12.5 27V6.75C10.8523 5.1 8.46591 4.5 6.25 4.5Z"
                  fill="#3C64B1"/>
            </svg>
          </div>}
        </div>
        <div className="book-labels">
          <div className="book-title-area">
            <div className="book-title">{props.title}</div>
            <div className="author">{props.author}</div>
          </div>
          <div className="price-area">
            <div className="price-strike">${props.price}</div>
            <div className="selling-price">${props.price - props.price * 0.2}</div>
          </div>
          <div className="add-cart">
            <button className="addcart-button" onClick={addBookToCart}>Add To Cart</button>
          </div>
        </div>
      </div>
    </section>
)
}
export default CategoryBookListItem;
