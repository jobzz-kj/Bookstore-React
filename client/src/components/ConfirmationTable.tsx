import React, { useContext } from 'react';
import { OrderStore } from "../contexts/OrderDetailsContext";
import '../assets/css/ConfirmationTable.css';

const ConfirmationTable = () => {
    const { orderDetails } = useContext(OrderStore);

    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`;
    };

    return (
        <div className="confirmation-table">
            <table>
                <thead>
                <tr>
                    <th>Book</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {orderDetails.lineItems?.map((item, index) => (
                    <tr key={index}>
                        <td>{orderDetails.books[index].title}</td>
                        <td className="price">{formatPrice((orderDetails.books[index].price - orderDetails.books[index].price * 0.2) )}</td>
                        <td className="quantity">{item.quantity}</td>
                        <td className="amount">{formatPrice((orderDetails.books[index].price - orderDetails.books[index].price * 0.2) * item.quantity)}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                </tr>
                </tfoot>
            </table>
            <div className="customer-info">
                <div className="order-price">
                    <p>SubTotal: </p>
                    <p>{formatPrice(orderDetails.order.amount - orderDetails.order.amount * 0.2)}</p>
                </div>
                <div className="order-price">
                    <p>Shipping: </p>
                    <p>Free</p>
                </div>
                <div className="order-price">
                    <p>Tax: </p>
                    <p>{formatPrice((orderDetails.order.amount - orderDetails.order.amount * 0.2)*0.1)}</p>
                </div>
                <div className="total-price">
                    <p>Total: </p>
                    <p>{formatPrice((orderDetails.order.amount - orderDetails.order.amount * 0.2) +
                        (orderDetails.order.amount - orderDetails.order.amount * 0.2)*0.1)}</p>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationTable;