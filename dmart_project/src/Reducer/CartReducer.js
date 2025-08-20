
// export const CartReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         cartList: payload.products,
//         total: payload.total,
//       };

//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cartList: payload.products,
//         total: payload.total,
//       };

//     case "UPDATE_QUANTITY":
//       const updatedCartList = state.cartList.map((product) => {
//         if (product.id === payload.product.id) {
//           return {
//             ...product,
//             quantity: payload.quantity,
//           };
//         }
//         return product;
//       });

//       const updatedTotal = updatedCartList.reduce(
//         (total, product) => total + product.price * product.quantity,
//         0
//       );

//       return {
//         ...state,
//         cartList: updatedCartList,
//         total: updatedTotal,
//       };

//     case "UPDATE_TOTAL":
//       return {
//         ...state,
//         total: payload.total,
//       };

//     default:
//       throw new Error("No case found in cartReducer");
//   }
// };



// export const CartReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         cartList: payload.products,
//         total: payload.total,
//       };

//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cartList: payload.products,
//         total: payload.total,
//       };

//     case "UPDATE_QUANTITY":
//       const updatedCartList = state.cartList.map((product) => {
//         if (product.id === payload.product.id) {
//           return {
//             ...product,
//             quantity: payload.quantity,
//           };
//         }
//         return product;
//       });

//       const updatedTotal = updatedCartList.reduce(
//         (total, product) => total + product.price * product.quantity,
//         0
//       );

//       return {
//         ...state,
//         cartList: updatedCartList,
//         total: updatedTotal,
//       };

//     case "UPDATE_TOTAL":
//       return {
//         ...state,
//         total: payload.total,
//       };

//     default:
//       throw new Error("No case found in cartReducer");
//   }
// };


// export const CartReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case "ADD_TO_CART":
//       // Add new product with default quantity of 1
//       const newCartListAdd = [...state.cartList, payload.product];

//       // Recalculate the total and savings for the updated cart list
//       const newTotalAdd = newCartListAdd.reduce(
//         (total, product) => total + (product.price * product.quantity),
//         0
//       );

//       const newSavingsAdd = newCartListAdd.reduce(
//         (totalSavings, product) => totalSavings + (Number(product.discount) || 0),  // Ensure discount is a number
//         0
//       );

//       return {
//         ...state,
//         cartList: newCartListAdd,
//         total: newTotalAdd,       
//         savings: newSavingsAdd,   
//       };

//     case "REMOVE_FROM_CART":
//       const newCartListRemove = state.cartList.filter(
//         (product) => product.id !== payload.product.id
//       );

//       const newTotalRemove = newCartListRemove.reduce(
//         (total, product) => total + (product.price * product.quantity),
//         0
//       );

//       const newSavingsRemove = newCartListRemove.reduce(
//         (totalSavings, product) => totalSavings + (Number(product.discount) || 0),  // Ensure discount is a number
//         0
//       );

//       return {
//         ...state,
//         cartList: newCartListRemove,
//         total: newTotalRemove,      
//         savings: newSavingsRemove,  
//       };

//     case "UPDATE_QUANTITY":
//       const updatedCartListQuantity = state.cartList.map((product) => {
//         if (product.id === payload.product.id) {
//           return {
//             ...product,
//             quantity: payload.quantity,
//           };
//         }
//         return product;
//       });

//       const updatedTotalQuantity = updatedCartListQuantity.reduce(
//         (total, product) => total + (product.price * product.quantity),
//         0
//       );

//       const updatedSavingsQuantity = updatedCartListQuantity.reduce(
//         (totalSavings, product) => totalSavings + (Number(product.discount) || 0),  // Ensure discount is a number
//         0
//       );

//       return {
//         ...state,
//         cartList: updatedCartListQuantity,
//         total: updatedTotalQuantity,        
//         savings: updatedSavingsQuantity,   
//       };

//     default:
//       throw new Error("No case found in cartReducer");
//   }
// };


// export const CartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         cartList: [...state.cartList, action.payload.product],
//       };
//     case "LOAD_CART":
//       return {
//         ...state,
//         cartList: action.payload.cartItems,
//       };
//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cartList: state.cartList.filter(item => item.product_id !== action.payload),
//       };
//     case "SET_USER":
//       return {
//         ...state,
//         userId: action.payload,
//       };
//     default:
//       return state;
//   }
// };




// export const CartReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_USER":
//       return { ...state, customer_id: action.payload };

//     case "LOAD_CART":
//       return {
//         ...state,
//         cartList: action.payload.cartitems,
//         total: action.payload.totalPrice,
//       };



//     case "ADD_TO_CART":
//       return {
//         ...state,
//         cartList: [...state.cartList, action.payload],
//         // total: state.total + action.payload.price,
//       };

//     case "REMOVE_FROM_CART":
//       const filteredCart = state.cartList.filter(
//         (item) => item.product_id !== action.payload
//       );
//       return {
//         ...state,
//         cartList: filteredCart,
//         total: filteredCart.reduce((total, item) => total + item.price, 0),
//       };

//     case "UPDATE_CART_QUANTITY":
//       const updatedCart = state.cartList.map((item) =>
//         item.product_id === action.payload.productId
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//       );
//       const updatedTotal = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0);
//       return {
//         ...state,
//         cartList: updatedCart,
//         total: updatedTotal,
//       };

//     default:
//       return state;
//   }
// };


//react
// export const CartReducer = (state, action) => {
//   switch (action.type) {

//       case "SET_USER":
//   return { ...state, customer_id: action.payload };

//     case "LOAD_CART":
//   return {
//     ...state,
//     cartList: action.payload.cartItems || [],
//     total: action.payload.totalPrice || 0,
//   };

//     case "ADD_TO_CART":
//       return {
//         ...state,
//         cartList: [...state.cartList, action.payload],
//         total: state.total + action.payload.price,
//       };

//     case "REMOVE_FROM_CART":
//       const filteredCart = state.cartList.filter(
//         (item) => item.product_id !== action.payload.product_id
//       );
//       return {
//         ...state,
//         cartList: filteredCart,
//         total: filteredCart.reduce((total, item) => total + item.price, 0),
//       };

//     case "UPDATE_CART_QUANTITY":
//       const updatedCart = state.cartList.map((item) =>
//         item.product_id === action.payload.productId
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//       );
//       const updatedTotal = updatedCart.reduce(
//         (total, item) => total + item.dmartprice * item.quantity,
//         0
//       );
//       return {
//         ...state,
//         cartList: updatedCart,
//         total: updatedTotal,
//       };

//     default:
//       return state;
//   }
// };


//web api

// Fixed CartReducer.js
export const CartReducer = (state, action) => {
  // console.log('CartReducer - Action:', action.type, action.payload);
  
  switch (action.type) {
    case "SET_USER":
      return { 
        ...state, 
        customer_id: action.payload 
      };

    case "LOAD_CART":
      // console.log('CartReducer - Loading cart items:', action.payload.cartItems);
      return {
        ...state,
        cartList: action.payload.cartItems || [],
        total: action.payload.totalPrice || 0,
      };

    case "ADD_TO_CART":
      // This case is mainly for optimistic updates
      // The actual state will be updated by LOAD_CART after API call
      const existingItemIndex = state.cartList.findIndex(
        item => (item.productId || item.id) === (action.payload.productId || action.payload.id)
      );
      
      let updatedCartList;
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        updatedCartList = state.cartList.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Add new item
        updatedCartList = [...state.cartList, { ...action.payload, quantity: 1 }];
      }

      const newTotal = updatedCartList.reduce(
        (total, item) => total + ((item.price || 0) * (item.quantity || 1)),
        0
      );

      return {
        ...state,
        cartList: updatedCartList,
        total: newTotal,
      };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cartList.filter(
        (item) => (item.productId || item.id) !== (action.payload.productId || action.payload.id)
      );
      
      const filteredTotal = filteredCart.reduce(
        (total, item) => total + ((item.price || 0) * (item.quantity || 1)),
        0
      );

      return {
        ...state,
        cartList: filteredCart,
        total: filteredTotal,
      };

    case "UPDATE_CART_QUANTITY":
      const updatedQuantityCart = state.cartList.map((item) => {
        const itemId = item.productId || item.id;
        return itemId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item;
      });

      const updatedQuantityTotal = updatedQuantityCart.reduce(
        (total, item) => total + ((item.price || 0) * (item.quantity || 1)),
        0
      );

      return {
        ...state,
        cartList: updatedQuantityCart,
        total: updatedQuantityTotal,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartList: [],
        total: 0,
      };

    default:
      console.warn('CartReducer - Unknown action type:', action.type);
      return state;
  }
};