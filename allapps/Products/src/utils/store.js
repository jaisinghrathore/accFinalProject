import React, { createContext } from "react";
import Cookies from "js-cookie";

const Store = createContext();

const initialState = {
    GlazierToken:
        Cookies.get("GlazierToken") && Cookies.get("GlazierToken") !== undefined
            ? JSON.parse(Cookies.get("GlazierToken"))
            : null,
    cart: {
        cartItems: Cookies.get("cartItems")
            ? JSON.parse(Cookies.get("cartItems"))
            : [],
        shippingAddress: Cookies.get("shippingAddress")
            ? JSON.parse(Cookies.get("shippingAddress"))
            : {},
    },
    order: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "USER_REGISTER": {
            Cookies.set("GlazierToken", JSON.stringify(action.payload));
            return { ...state, GlazierToken: action.payload };
        }
        case "USER_LOGIN": {
            Cookies.set("GlazierToken", JSON.stringify(action.payload));
            return { ...state, GlazierToken: action.payload };
        }
        case "USER_LOGOUT": {
            return { ...state, GlazierToken: null };
        }
        case "ADD_TO_CART":
            const existingCartItem = state.cart.cartItems.find(
                (val) => val._id === action.payload._id
            );
            const updatedCart = existingCartItem
                ? state.cart.cartItems.map((val) => {
                      if (val._id === action.payload._id) {
                          return action.payload;
                      }
                      return val;
                  })
                : [...state.cart.cartItems, action.payload];
            Cookies.set("cartItems", JSON.stringify(updatedCart));
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: updatedCart,
                },
            };
        case "DELETE_ADD_ITEM":
            const filteredCart = state.cart.cartItems.filter(
                (val) => val._id != action.payload._id
            );
            Cookies.set("cartItems", JSON.stringify(filteredCart));

            return {
                ...state,
                cart: { ...state.cart, cartItems: filteredCart },
            };
        case "SAVE_SHIPPING_ADDRESS": {
            return {
                ...state,
                cart: { ...state.cart, shippingAddress: action.payload },
            };
        }
        case "CLEAR_CART": {
            return {
                ...state,
                cart: { ...state.cart, cartItems: [] },
            };
        }
        case "PLACE_ORDER": {
            return {
                ...state,
                order: action.payload,
            };
        }

        default:
            return state;
    }
}

export const contextAuthStore = () => {
    const nam = React.useContext(Store);
    return nam;
};

export default function AuthStoreProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}
