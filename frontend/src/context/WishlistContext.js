import {  createContext, useContext, useState } from "react";
//shared state bucket --> createContext

const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
    const [wishlistCount, setWishlistCount] = useState(0);
    
    return (
        <WishlistContext.Provider value={{wishlistCount, setWishlistCount}}>
            {children}
        </WishlistContext.Provider>
    );
};

//custom hook
export const useWishlist = () => useContext(WishlistContext);