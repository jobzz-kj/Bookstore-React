import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import {orderReducer} from "../reducers/OrderDetailsReducer"; // Make sure this path is correct
import type { OrderDetails } from '../types'; // Verify the path

const ORDER_DETAILS = 'orderDetails';

const initOrderState: OrderDetails = JSON.parse(localStorage.getItem(ORDER_DETAILS) || '{}');

export type OrderContextType = {
    orderDetails: OrderDetails;
    dispatch: React.Dispatch<any>;
};

export const OrderStore = createContext<OrderContextType>({
    orderDetails: initOrderState,
    dispatch: () => undefined, // Default dispatch function
});

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orderDetails, dispatch] = useReducer(orderReducer, initOrderState);

    useEffect(() => {
        localStorage.setItem(ORDER_DETAILS, JSON.stringify(orderDetails));
    }, [orderDetails]);

    return (
        <OrderStore.Provider value={{ orderDetails, dispatch }}>
            {children}
        </OrderStore.Provider>
    );
};