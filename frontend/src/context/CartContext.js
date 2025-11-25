import { Children, createContext, useContext, useState } from "react";
//shared state bucket --> createContext

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);
    
    return (
        <CartContext.Provider value={{cartCount, setCartCount}}>
            {children}
        </CartContext.Provider>
    );
};

//custom hook
export const useCart = () => useContext(CartContext);