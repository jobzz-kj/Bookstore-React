import "../assets/css/checkout.css";
import { isCreditCard, isMobilePhone, isvalidEmail } from "../utils";
import {backendApi, CustomerForm, months, OrderDetails } from "../types";
import { CartStore } from "../contexts/CartContext";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartTypes } from "../reducers/CartReducer";
import CartTable from "./CartTable";
import axios from "axios";
import {OrderStore} from "../contexts/OrderDetailsContext";
import {OrderTypes} from "../reducers/OrderDetailsReducer";

function CheckoutPage() {
    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }
    const { dispatch:orderDispatch} = useContext(OrderStore)
    const { cart, dispatch } = useContext(CartStore);

    const navigate = useNavigate();

    const cartTotalPrice = cart.reduce((total, item) => total + item.book.price * item.quantity, 0);

    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setCcNumberError] = useState("");
    const [dateClicked, setDateClicked] = useState(false);

    const [formData, setFormData] = useState({ name: "", address: "", phone: "", email: "", ccNumber: "", ccExpiryMonth: new Date().getMonth() + 1, ccExpiryYear: new Date().getFullYear() });
    const [checkoutStatus, setCheckoutStatus] = useState("");

    function isValidForm() {
        const { name, address, phone, email, ccNumber } = formData;

        // Reset all error states
        setNameError("");
        setAddressError("");
        setPhoneError("");
        setEmailError("");
        setCcNumberError("");

        // Check if any field is empty
        if (!name) {
            setNameError("Name is required");
        }
        if(name && (name.length < 4 || name.length > 45)){
            setNameError("Name must be between 4 and 45 characters long!");
        }
        if (!address) {
            setAddressError("Address is required");
        }
        if(address && (address.length < 4 || address.length > 45)){
            setAddressError("Address must be between 4 and 45 characters long!")
        }
        if (!phone) {
            setPhoneError("Phone is required");
        }
        if (!email) {
            setEmailError("Email is required");
        }
        if (!ccNumber) {
            setCcNumberError("Credit Card Number is required");
        }

        // Check if there are any validation errors
        if (
            !name ||
            !address ||
            !phone ||
            !email ||
            !ccNumber ||
            nameError || addressError || phoneError || emailError || ccNumberError
        ) {
            return false;
        }
        const nameValid = formData.name.length >= 4 && formData.name.length <= 45;
        const addressValid = formData.address.length >= 4;
        const phoneValid = isMobilePhone(formData.phone);
        const emailValid = isvalidEmail(formData.email);
        const ccNumberValid = isCreditCard(formData.ccNumber);
        return nameValid && addressValid && phoneValid && emailValid && ccNumberValid;
    }

    const clearCart = (): void => {
        dispatch({ type: CartTypes.CLEAR });
    };

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        switch (name) {
            case "name":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.length < 4 || value.length > 45) {
                    setNameError("Name must be between 4 and 45 characters long!");
                } else {
                    setNameError("");
                }
                break;
            case "address":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.length < 4 || value.length > 45) {
                    setAddressError("Address must be between 4 and 45 characters long!");
                } else {
                    setAddressError("");
                }
                break;
            case "phone":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (!isMobilePhone(value)) {
                    setPhoneError("Invalid phone number!");
                } else {
                    setPhoneError("");
                }
                break;
            case "email":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (!isvalidEmail(value)) {
                    setEmailError("Invalid email address!");
                } else {
                    setEmailError("");
                }
                break;
            case "ccNumber":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (!isCreditCard(value)) {
                    setCcNumberError("Invalid credit card number!");
                } else {
                    setCcNumberError("");
                }
                break;
            case "ccExpiryMonth":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value, 10) }));
                setDateClicked(true);
                break;

            case "ccExpiryYear":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value, 10) }));
                setDateClicked(true);
                break;
            default:
                break;
        }
    }


    async function submitOrder(event: FormEvent) {
        event.preventDefault();
        const isFormCorrect = isValidForm();

        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
            return;
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if (orders) {
                setCheckoutStatus("OK");
                setFormData({
                    name: "",
                    address: "",
                    phone: "", email: "",
                    ccNumber: "",
                    ccExpiryMonth: new Date().getMonth() + 1,
                    ccExpiryYear: new Date().getFullYear()
                });
                clearCart();
                navigate('/confirmation');
            } else {
                setCheckoutStatus("ERROR");
                console.log("Error placing order");
            }
        }
    }

    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };

        const orders = JSON.stringify(order);
        const url = `http://${backendApi}/api/orders`;
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                orderDispatch({type: OrderTypes.SET_DETAILS, orderDetails: response.data})
                dispatch({type: CartTypes.CLEAR});
                localStorage.setItem('joblinOrderDetails',JSON.stringify(response.data))
                return response.data;
            })
            .catch((error)=>console.log(error));
        return orderDetails;
    }

    return (
        <section className="checkout-cart-table-view">
            {cart.length !== 0 ?
                <div className="form-holder">
                    <div className="checkout-page-body">
                        <div>
                            {cart.length !== 0 &&
                                <form className="checkout-form" onSubmit={submitOrder} method="post">
                                    <div>
                                        <label htmlFor="fname">Name</label>
                                        <input type="text" size={20} name="name" id="fname" value={formData.name}
                                               onChange={handleInputChange}/>
                                    </div>
                                    <>{nameError && <div className="error">{nameError}</div>}</>

                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input type="text" size={20} name="address" id="address"
                                               value={formData.address} onChange={handleInputChange}/>
                                    </div>
                                    <>{addressError && <div className="error">{addressError}</div>}</>

                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" size={20} name="phone" id="phone" value={formData.phone}
                                               onChange={handleInputChange}/>
                                    </div>
                                    <>{phoneError && <div className="error">{phoneError}</div>}</>

                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="text" size={20} name="email" id="email" value={formData.email}
                                               onChange={handleInputChange}/>
                                    </div>
                                    <>{emailError && <div className="error">{emailError}</div>}</>

                                    <div>
                                        <label htmlFor="ccNumber">Credit Card Number</label>
                                        <input type="text" size={20} name="ccNumber" id="ccNumber"
                                               value={formData.ccNumber} onChange={handleInputChange}/>
                                    </div>
                                    <>{ccNumberError && <div className="error">{ccNumberError}</div>}</>

                                    <div>
                                        <label htmlFor="ccExpiryMonth">Exp Date</label>
                                        <div className="select-container">
                                            <select
                                                style={{color: "black"}}
                                                name="ccExpiryMonth"
                                                value={formData.ccExpiryMonth || new Date().getMonth() + 1}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Month</option>
                                                {months.map((month, i) => (
                                                    <option key={i} value={i + 1}>
                                                        {month}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                style={{color: "black"}}
                                                name="ccExpiryYear"
                                                value={formData.ccExpiryYear || new Date().getFullYear()}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Year</option>
                                                {Array.from({length: 15}, (_, i) => yearFrom(i)).map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        {/* <>{expiryDateError && <div className="error">{expiryDateError}</div>}</> */}
                                    </div>
                                    <>{dateClicked && formData.ccExpiryMonth === 0 &&
                                        <div className="error">Please select a month</div>}</>
                                    <>{dateClicked && formData.ccExpiryYear === 0 &&
                                        <div className="error">Please select a year</div>}</>

                                    <div className="checkout-summary">
                                        <p className="subtotal summary-tile">
                                            <div>Subtotal:</div>
                                            <div> ${(cartTotalPrice - cartTotalPrice * 0.2).toFixed(2)}</div>
                                        </p>
                                        <p className="tax summary-tile">
                                            <div>Shipping:</div>
                                            <div>Free</div>
                                        </p>
                                        <p className="tax summary-tile">
                                            <div>Tax:</div>
                                            <div>${((cartTotalPrice - cartTotalPrice * 0.2) * 0.1).toFixed(2)}</div>
                                        </p>
                                        <hr/>
                                        <p className="total summary-tile">
                                            <div>Total:</div>
                                            <div> ${((cartTotalPrice - cartTotalPrice * 0.2) * 1.1).toFixed(2)}</div>
                                        </p>

                                    </div>
                                    <div className="purchase-button">
                                        <button className={"call-to-action"} type="submit">Complete Purchase</button>
                                    </div>
                                </form>
                            }
                        </div>

                        <div>
                            {checkoutStatus !== "" && (
                                <>
                                    {checkoutStatus === "ERROR" ? (
                                        <section className="checkoutStatusBoxError">
                                            <div className="error">Error: Please fix the problems above and try again.
                                            </div>
                                        </section>
                                    ) : checkoutStatus === "PENDING" ? (
                                        <section className="checkoutStatusBoxPending">
                                            <div className="processing-orange">Processing...</div>
                                        </section>
                                    ) : checkoutStatus === "OK" ? (
                                        <section className="checkoutStatusBox">
                                            <div className="placed-green">Order placed...</div>
                                        </section>
                                    ) : (
                                        <section className="checkoutStatusBoxError">
                                            <div>An unexpected error occurred, please try again.</div>
                                        </section>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div> : ''}

            <div className="order-cart-table">
                <CartTable/>
            </div>
        </section>
    );
}

export default CheckoutPage;