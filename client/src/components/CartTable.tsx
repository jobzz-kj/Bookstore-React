import "../assets/css/CartTable.css";
import {useLocation, useNavigate} from "react-router-dom";
import {BookItem, ShoppingCartItem} from "../types";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle, faPlusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import React from "react";

const getBookImageUrl = function (book: BookItem): string {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.png`;
};

function CartTable() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname)
    const {cart, dispatch} = useContext(CartStore);
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = cart.length;
    const category = localStorage.getItem('joblincategoryId') === null ? '/Best Sellers' : localStorage.getItem('joblincategoryId');

    const addBookToCart = (cartItem: ShoppingCartItem): void => {
        dispatch({type: CartTypes.ADD, item: cartItem.book, id: cartItem.id});
    };

    const removeBookFromCart = (cartItem: ShoppingCartItem): void => {
        dispatch({type: CartTypes.REMOVE, item: cartItem.book, id: cartItem.id});
    };

    const clearCart = (): void => {
        dispatch({type: CartTypes.CLEAR});
    };

    const calculateTotalAmount = (): number => {
        return cart.reduce((total, cartItem) => {
            return total + (cartItem.book.price - cartItem.book.price * 0.2) * cartItem.quantity;
        }, 0);
    };

    return (
        <div className="cart-page-body">
            {cartCount === 0 ? <>
                    <div className="empty-cart-image">
                        <img src={require('../assets/images/site/cart-empty.png')} alt="Empty Cart"/>
                    </div>
                    <div className="empty-cart-page">Your cart is empty!</div>
                    <div className="empty-cart-description">
                        Looks like you haven't made your choice yet...
                    </div>
                    <div className="start-shopping">
                        <button className="button-checkout" onClick={() => navigate(`/categories/${category}`)}>
                            Return to Shop
                        </button>
                    </div>
                </> :
                <>
                    {location.pathname !== "/checkout" && <div className="total-amount">
                        <label>
                            {`Subtotal(${cartQuantity} ${cartQuantity === 1 ? `book` : 'books'}): $${calculateTotalAmount().toFixed(2)}`}
                        </label>
                    </div>}
                    {location.pathname !== "/checkout" && <div className="cart-cta-buttons">
                        <button className="button-checkout" onClick={() => navigate(`/categories/${category}`)}>
                            Continue Shopping
                        </button>
                        <button className="call-to-action" onClick={() => navigate("/checkout")}>
                            <label>Proceed to Checkout </label>
                        </button>
                    </div>}
                    <div className="cart-table">
                        <ul className="cart2">
                            <li className="table-heading">
                                <div className="heading-book" key={"Book"}>Book</div>
                                <div className="heading-price" key={"Price"}>Price</div>
                                <div className="heading-quantity" key={"Quantity"}>Quantity</div>
                                <div className="heading-subtotal" key={"Amount"}>Amount</div>
                            </li>
                            {cart.map((cartItem) => (
                                <React.Fragment key={cartItem.id}>
                                    <li>
                                        <div className="cart-book-image">
                                            <div className="rect narrow-rect">
                                                <img
                                                    src={require(`../assets/images/books/` + getBookImageUrl(cartItem.book))}
                                                    alt={cartItem.book.title} className='book-style'/>
                                            </div>
                                        </div>
                                        <div className="cart-book-title">{cartItem.book.title}</div>
                                        <div
                                            className="cart-book-price">${cartItem.book.price - cartItem.book.price * 0.2}</div>
                                        <div className="cart-book-quantity">
                                            {cartItem.quantity > 1 ? <button className="icon-button dec-button"
                                                                             onClick={() => removeBookFromCart(cartItem)}>
                                                    <FontAwesomeIcon icon={faMinusCircle}/>
                                                </button> :
                                                <button className="icon-button dec-button-delete"
                                                        onClick={() => removeBookFromCart(cartItem)}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>}
                                            <span className="quantity">{cartItem.quantity}</span>&nbsp;
                                            <button className="icon-button inc-button"
                                                    onClick={() => addBookToCart(cartItem)}>
                                                <FontAwesomeIcon icon={faPlusCircle}/>
                                            </button>
                                        </div>
                                        <div
                                            className="cart-book-subtotal">${((cartItem.book.price - cartItem.book.price * 0.2) * cartItem.quantity).toFixed(2)}</div>
                                    </li>
                                    <li className="line-sep"></li>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                    {location.pathname !== "/checkout" && <div className="clear-cart">
                        <button className="clear-cart-button" onClick={clearCart}>
                            <FontAwesomeIcon icon={faTrash}/> Clear Cart
                        </button>
                    </div>}
                </>
            }


        </div>
    );
}

export default CartTable;