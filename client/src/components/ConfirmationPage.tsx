import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { OrderStore } from "../contexts/OrderDetailsContext";
import ConfirmationTable from "./ConfirmationTable";
import "../assets/css/ConfirmationPage.css";

const ConfirmationPage = () => {
    const { orderDetails } = useContext(OrderStore);
    const navigate = useNavigate();

    const formatCreditCard = (ccNumber: string) => {
        ccNumber = ccNumber.replace(/ /g, "").replace(/-/g, "");
        const visibleCc = ccNumber.slice(-4);
        return `**** **** **** ${visibleCc}`;
    };
    return (
        <div className="confirmation-page">
            <h2>Order Confirmation</h2>
            {!orderDetails || !orderDetails.order ? (
                <div className="no-order-message">
                    <p>The order you requested could not be found.</p>
                    <button className="home-button" onClick={() => navigate('/')}>Go to Home</button>
                </div>
            ) : (
                <div className="confirmation-details">
                    <div className="order-info">
                        <h3>Order Details</h3>
                        <p>Confirmation Number: {orderDetails.order.confirmationNumber}</p>
                        <p>Date Created: {new Date(orderDetails.order.dateCreated).toString()}</p>
                    </div>
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <ConfirmationTable />
                    </div>
                    <div className="customer-info">
                        <h3>Customer Information</h3>
                        <p>Name: {orderDetails.customer.customerName}</p>
                        <p>Email: {orderDetails.customer.email}</p>
                        <p>Address: {orderDetails.customer.address}</p>
                        <p>Phone: {orderDetails.customer.phone}</p>
                        <p>{formatCreditCard(orderDetails.customer.ccNumber)}</p>
                    </div>
                    <div className="thank-you-message">
                        <p>Thank you for your order!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmationPage;