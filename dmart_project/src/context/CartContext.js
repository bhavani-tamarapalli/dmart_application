


//react
// import { createContext, useContext, useEffect, useReducer } from "react";
// import { CartReducer } from "../Reducer";


// const cartInitialState = {
//   cartList: [],  // Initialize cartList as an empty array
//   total: 0,
//   customer_id: null,
// };


// const CartContext = createContext(cartInitialState);

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(CartReducer, cartInitialState);


//   const storedUserId = sessionStorage.getItem("customer_id");
//   // console.log(storedUserId, "storeee");

//   useEffect(() => {
  
//     const storedUserId = sessionStorage.getItem("customer_id");
//     console.log(storedUserId, "storeee");
//     if (storedUserId) {
//       dispatch({ type: "SET_USER", payload: storedUserId });
//       loadCart(storedUserId);
//     }
//   }, []);


//   const loadCart = async (storedUserId) => {
//     if (!storedUserId) {
//       console.error("User ID is missing, cannot fetch cart items.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/cart/${storedUserId}`);
//       if (!response.ok) throw new Error("Failed to load cart");
//       const data = await response.json();
//       // console.log(data.cart_items,"get dataaaaaaaaaaaaa")

//       // Log the raw API response for debugging
//       // console.log('API Response:', data);

//       // Ensure cartItems is an array
//       const cartItems = Array.isArray(data.cart_items) ? data.cart_items : [];
//       // console.log('Processed Cart Items:', cartItems);

//       dispatch({ type: "LOAD_CART", payload: { cartItems, totalPrice: data.totalPrice || 0 } });
//       // console.log("Dispatching cart data", cartItems);



//       // dispatch({ type: "LOAD_CART", payload: { cartItems, totalPrice: data.totalPrice || 0 } });
//     } catch (error) {
//       console.error("Error fetching cart items", error);
//     }
//   };


//   // Add product to the cart
//   const addToCart = async (product) => {
//     console.log(product, "producttt")
//     // const storedUserId = sessionStorage.getItem("customer_id");  
//     if (!storedUserId) {
//       console.error("User ID is missing, cannot add to cart.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cart_id: storedUserId,
//           product_id: product.product_id,
//           quantity: 1


//         }),

//       });

//       const data = response.json();
//       console.log(data, "posted");



//       dispatch({ type: "ADD_TO_CART", payload: product });
//       loadCart(storedUserId);
//     } catch (error) {
//       console.error("Error adding product to cart", error);
//     }
//   };

//   // Remove product from the cart
//   const removeFromCart = async (product) => {
//     // console.log(product,"producttttttttttt")
//     const storedUserId = sessionStorage.getItem("customer_id");  
//     if (!storedUserId) {
//       console.error("User ID is missing, cannot remove from cart.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/cart/remove", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ product_id: product.product_id }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to remove product from the database");
//       }

//       dispatch({ type: "REMOVE_FROM_CART", payload: product });
//       loadCart(storedUserId);
//     } catch (error) {
//       console.error("Error removing product from cart:", error);
//     }
//   };

 
//   const updateCartQuantity = async (productId, newQuantity) => {
//     const storedUserId = sessionStorage.getItem("customer_id");

//     // console.log(productId, "productId");
//     // console.log(newQuantity, "newQuantity");

//     if (!storedUserId) {
//       console.error("User ID is missing, cannot update cart.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/cart/update", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           product_id: productId,
//           quantity: newQuantity
//         }),
//       });


//       const data = await response.json();
//       console.log("Response:", data);

//       if (!response.ok) throw new Error("Failed to update product quantity");

//       dispatch({
//         type: "UPDATE_CART_QUANTITY",
//         payload: { productId, quantity: newQuantity }
        
//       });
//       // console.log(productId, "productidddddddddddddd")

//       loadCart(storedUserId); 
//     } catch (error) {
//       console.error("Error updating product quantity:", error);
//     }
//   };


 

//   return (
//     <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateCartQuantity }}>
//       {children}
//     </CartContext.Provider>



//   );
// };

// // Custom hook to use the CartContext in any component
// export const useCart = () => useContext(CartContext);


//web api

import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer } from "../Reducer";

const cartInitialState = {
  cartList: [],
  total: 0,
  customer_id: null,
};

const CartContext = createContext(cartInitialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, cartInitialState);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("customer_id");
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    
    if (storedUserId && isLoggedIn === "true") {
      dispatch({ type: "SET_USER", payload: storedUserId });
      loadCart(storedUserId);
    }
  }, []);

  const loadCart = async (customerId) => {
    if (!customerId) {
      console.error("Customer ID is missing, cannot fetch cart items.");
      return;
    }

    try {
    
      const response = await fetch(`https://localhost:7001/api/Cart/${customerId}`);
      
      if (!response.ok) {
        console.error('Failed to load cart, status:', response.status);
        // If cart is empty or doesn't exist, set empty cart
        dispatch({ 
          type: "LOAD_CART", 
          payload: { cartItems: [], totalPrice: 0 } 
        });
        return;
      }
      
      const data = await response.json();

      // Handle different API response structures
      let cartItems = [];
      let totalPrice = 0;

      if (Array.isArray(data)) {
      
        cartItems = data;
        totalPrice = data.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
      } else if (data.cartItems) {
       
        cartItems = Array.isArray(data.cartItems) ? data.cartItems : [];
        totalPrice = data.total || data.totalPrice || cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
      } else if (data.items) {
        
        cartItems = Array.isArray(data.items) ? data.items : [];
        totalPrice = data.total || cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
      }
      dispatch({ 
        type: "LOAD_CART", 
        payload: { cartItems, totalPrice } 
      });
    } catch (error) {
      console.error("Error fetching cart items", error);
      // Set empty cart on error
      dispatch({ 
        type: "LOAD_CART", 
        payload: { cartItems: [], totalPrice: 0 } 
      });
    }
  };

  const addToCart = async (product) => {
    console.log("CartContext: Adding product to cart:", product);
    const storedUserId = sessionStorage.getItem("customer_id");
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    
    if (!storedUserId || !isLoggedIn || isLoggedIn !== "true") {
      console.error("Customer ID is missing or not logged in, cannot add to cart.");
      throw new Error("Please login to add items to cart");
    }

    try {
      
      const response = await fetch(
        `https://localhost:7001/api/Cart/add?customerId=${storedUserId}&productId=${product.productId}&quantity=1`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to add to cart: ${errorText}`);
      }

      const result = await response.json();
      console.log("Add to cart API response:", result);

      // Reload cart to get updated data from server
      await loadCart(storedUserId);
      
      return result; // Return success result
      
    } catch (error) {
      console.error("Error adding product to cart", error);
      throw error; 
    }
  };

  const removeFromCart = async (product) => {
    const storedUserId = sessionStorage.getItem("customer_id");
    
    if (!storedUserId) {
      console.error("Customer ID is missing, cannot remove from cart.");
      return;
    }

    try {
      const productId = product.productId || product.id;
      const response = await fetch(
        `https://localhost:7001/api/Cart/remove?customerId=${storedUserId}&productId=${productId}`,
        {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      // Reload cart after removal
      await loadCart(storedUserId);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    const storedUserId = sessionStorage.getItem("customer_id");

    if (!storedUserId) {
      console.error("Customer ID is missing, cannot update cart.");
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7001/api/Cart/update?customerId=${storedUserId}&productId=${productId}&quantity=${newQuantity}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      if (!response.ok) throw new Error("Failed to update product quantity");

      const data = await response.json();
      console.log("Update response:", data);

      // Reload cart after update
      await loadCart(storedUserId);
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  return (
    <CartContext.Provider value={{ 
      ...state, 
      addToCart, 
      removeFromCart, 
      updateCartQuantity,
      loadCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);