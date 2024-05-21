import { ShoppingCartItem, BookItem } from "../types";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR'
};

type AppActions = {
    id: number;
    type: 'ADD' | 'REMOVE' | 'CLEAR';
    item: BookItem;
};

export const cartReducer = (state: ShoppingCartItem[], action: AppActions): ShoppingCartItem[] => {
    switch (action.type) {
        case CartTypes.ADD: {
            const existingItem = state.find(item => item.id === action.id);
            if (existingItem) {
                // If item exists in the cart, increment its quantity
                const newState =  state.map(item =>
                    item.id === action.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                localStorage.setItem('joblincart',JSON.stringify(newState));
                return newState
            } else {
                // If item doesn't exist, add it to the cart with quantity 1
                const newState =  [
                    ...state,
                    { id: action.id, book: action.item, quantity: 1 },
                ];
                localStorage.setItem('joblincart',JSON.stringify(newState));
                return newState;
            }
        }
        case CartTypes.REMOVE: {
            const itemIndex = state.findIndex(item => item.id === action.id);
            if (itemIndex >= 0) {
                const updatedState = [...state];
                if (updatedState[itemIndex].quantity === 1) {
                    // If quantity is 1, remove the item completely from the cart
                    updatedState.splice(itemIndex, 1);
                } else {
                    // If quantity is greater than 1, decrement the quantity
                    updatedState[itemIndex] = {
                        ...updatedState[itemIndex],
                        quantity: updatedState[itemIndex].quantity - 1
                    };
                }
                localStorage.setItem('joblincart',JSON.stringify(updatedState));
                return updatedState;
            }
            // If the item is not found in the cart, return the current state
            return state;
        }
        case CartTypes.CLEAR: {
            localStorage.removeItem('joblincart');
            return [];
        }
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};
