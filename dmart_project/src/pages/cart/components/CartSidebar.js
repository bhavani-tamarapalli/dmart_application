

// import { MdClose } from "react-icons/md";
// import { MdCurrencyRupee } from "react-icons/md";
// import { CartCard } from "./CartCard";
// import { useCart } from "../../../context/CartContext";
// import CartEmpty from "./CartEmpty";
// import { Link } from "react-router-dom";

// export const CartSidebar = ({ isOpen, onClose }) => {
//   const { total, savings, cartList } = useCart();

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
//         } transition-transform duration-300`}
//     >
//       <div className="bg-white w-[96] h-full shadow-lg overflow-y-auto">
//         <div className="p-6">
//           {/* Close Button */}
//           <button onClick={onClose} className="text-black text-xl mb-4">
//             <MdClose />
//           </button>

//           {cartList.length > 0 ? (
//             <>
//               <div className="flex justify-between items-center p-4 border-b">
//                 <div className="flex items-center gap-2">
//                   <h2 className="text-lg font-semibold">My Cart</h2>
//                   <p className="text-gray-500 text-sm">({cartList.length} items)</p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-600">Savings</p>
//                   <div className="flex items-center">
//                     <MdCurrencyRupee />
//                     <p className="font-medium">{savings}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-600">Cart Total</p>
//                   <div className="flex items-center">
//                     <MdCurrencyRupee />
//                     <p className="font-medium">{total}</p>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 {cartList.map((product) => (
//                   <CartCard key={product.id} product={product} />
//                 ))}
//               </div>

//               <div className="bg-gray-100 p-4 rounded-[30px] mt-4">
//                 <div className="font-bold">Total: ₹{total}</div>
//                 <Link to="/checkout" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full">
//                   Proceed to Checkout
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <CartEmpty SetCartOpen={onClose} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };




// import { useState } from "react";
// import { MdClose } from "react-icons/md";
// import { FaCartShopping } from "react-icons/fa6";
// import { MdCurrencyRupee } from "react-icons/md";
// import { CartCard } from "./CartCard";
// import { useCart } from "../../../context/CartContext";
// import CartEmpty from "./CartEmpty";


// export const CartSidebar = ({ isOpen, onClose }) => {
//   // const { total, cartList } = useCart();

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
//         } transition-transform duration-300`}>
//       <div className="bg-white">
//         <div className="p-6">
//           <button
//             onClick={onClose}
//             className="text-black text-xl mb-4">
//             <MdClose />
//           </button>

//           <div>
//             {/* {cartList.map((product) => (
//               <div className="flex justify-between items-center p-4 border-b">
//                 <div className="flex gap-2">
//                   <h2 className="text-lg font-semibold">My Cart</h2>
//                   <p className="flex text-gray-500 text-sm">{cartList.length} items</p>
//                   <div className="vl border-s-2 h-12 text-black-800"></div>
//                 </div>

//                 <div>
//                   <p className="">savings</p>
//                   <div className="flex">
//                     <MdCurrencyRupee />
//                     <p>{product.discount}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <p>cart Total</p>
//                   <div className="flex ">
//                     <MdCurrencyRupee />
//                     <p>{total}</p>
//                   </div>
//                 </div>
//               </div>
//             ))} */}

//           </div>

//           {/* {cartList.length > 0 ? (
//             <div>

//               {cartList.map((product) => (
//                 <CartCard key={product.id} product={product} />
//               ))}
//               <div className="bg-gray-100 p-4 rounded-[30px] mt-4">
//                 <div className="font-bold">Total: ₹{total}</div>
//                 <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">Checkout</button>
//               </div>
//             </div>
//           ) : (
//             <CartEmpty SetCartOpen={onClose} />

//           )} */}
//         </div>
//       </div>

//     </div>
//   );
// };

import { MdClose } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { useCart } from "../../../context/CartContext";
import { CartEmpty} from "./CartEmpty";
import { CartCard } from "./CartCard";
import { useEffect, useRef } from "react";

export const CartSidebar = ({ isOpen, onClose }) => {
  const { cartList, total, loadCart } = useCart();
  const hasLoadedRef = useRef(false);
  const lastCustomerIdRef = useRef(null);

  // Load cart only when necessary
  useEffect(() => {
    if (isOpen && loadCart) {
      const customerId = sessionStorage.getItem("customer_id");
      
      // Only load if we have a customer ID and either:
      // - Haven't loaded before, OR
      // - Customer ID has changed
      if (customerId && 
          (!hasLoadedRef.current || lastCustomerIdRef.current !== customerId)) {
        loadCart(customerId);
        hasLoadedRef.current = true;
        lastCustomerIdRef.current = customerId;
      }
    }
  }, [isOpen, loadCart]);

  // Reset loading flag when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      hasLoadedRef.current = false;
    }
  }, [isOpen]);

  // Calculate totals (memoized to prevent unnecessary recalculations)
  const itemCount = cartList ? cartList.length : 0;
  
  const cartTotal = cartList ? cartList.reduce((sum, item) => {
    const price = item.price || item.currentPrice || 0;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0) : 0;

  const totalSavings = cartList ? cartList.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.mrp || 0;
    const currentPrice = item.price || item.currentPrice || 0;
    const quantity = item.quantity || 1;
    const savings = (originalPrice - currentPrice) * quantity;
    return sum + (savings > 0 ? savings : 0);
  }, 0) : 0;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="bg-white w-96 max-w-full my-2 h-full overflow-y-auto">
        <div className="p-6">
          <button onClick={onClose} className="text-black text-xl mb-4">
            <MdClose />
          </button>

          <div>
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex gap-2 items-center">
                <h2 className="text-lg font-semibold">My Cart</h2>
                <p className="flex text-gray-500 text-sm">{itemCount} items</p>
                <div className="vl border-s-2 h-6 mx-2"></div>
              </div>

              <div className="text-center">
                <p className="text-sm">Savings</p>
                <div className="flex items-center justify-center">
                  <MdCurrencyRupee />
                  <p>{totalSavings.toFixed(2)}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm">Cart Total</p>
                <div className="flex items-center justify-center">
                  <MdCurrencyRupee />
                  <p>{cartTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Remove debug info for production */}
            {/* 
            <div className="p-2 bg-gray-100 text-xs">
              <p>Debug: Cart items count: {itemCount}</p>
              <p>Debug: Customer ID: {sessionStorage.getItem("customer_id")}</p>
              <p>Debug: Is logged in: {sessionStorage.getItem("isLoggedIn")}</p>
            </div>
            */}

            {/* Check if there are cart items */}
            {cartList && cartList.length > 0 ? (
              <div>
                {/* Iterate through cartList and display CartCard for each item */}
                <div className="max-h-96 overflow-y-auto">
                  {cartList.map((product, index) => (
                    <CartCard
                      key={product.productId || product.id || `product-${index}`}
                      product={product}
                    />
                  ))}
                </div>

                {/* Cart Total and Checkout Button */}
                <div className="bg-gray-100 p-4 rounded-lg mt-4 sticky bottom-0">
                  <div className="font-bold text-lg flex items-center">
                    Total: <MdCurrencyRupee />{cartTotal.toFixed(2)}
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-green-600">
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              // Show the CartEmpty component if the cart is empty
              <CartEmpty SetCartOpen={onClose} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



// import { MdClose } from "react-icons/md";
// import { MdCurrencyRupee } from "react-icons/md";
// import { CartCard } from "./CartCard";
// import { useCart } from "../../../context/CartContext";
// import CartEmpty from "./CartEmpty";

// export const CartSidebar = ({ isOpen, onClose }) => {
//   const { total, cartList } = useCart();


//   const totalSavings = cartList.reduce((acc, product) => acc + (product.discount || 0), 0);

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
//         } transition-transform duration-300`}
//     >
//       <div className="bg-white w-[96] h-full shadow-lg overflow-y-auto">
//         <div className="p-6">
//           {/* Close Button */}
//           <button onClick={onClose} className="text-black text-xl mb-4">
//             <MdClose />
//           </button>

//           {cartList.length > 0 ? (
//             <>

//               <div className="flex justify-between items-center p-4 border-b">
//                 <div className="flex items-center gap-2">
//                   <h2 className="text-lg font-semibold">My Cart</h2>
//                   <p className="text-gray-500 text-sm">({cartList.length} items)</p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-600">Savings</p>
//                   <div className="flex items-center">
//                     <MdCurrencyRupee />
//                     <p className="font-medium">{totalSavings}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-600">Cart Total</p>
//                   <div className="flex items-center">
//                     <MdCurrencyRupee />
//                     <p className="font-medium">{total}</p>
//                   </div>
//                 </div>
//               </div>


//               <div>
//                 {cartList.map((product) => (
//                   <CartCard key={product.id} product={product} />
//                 ))}
//               </div>


//               <div className="bg-gray-100 p-4 rounded-[30px] mt-4">
//                 <div className="font-bold">Total: ₹{total}</div>
//                 <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full">
//                   Checkout
//                 </button>
//               </div>
//             </>
//           ) : (
//             <CartEmpty SetCartOpen={onClose} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

