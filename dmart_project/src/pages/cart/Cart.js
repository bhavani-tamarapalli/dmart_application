
// import { CartCard } from "./components/CartCard";
// import { useCart } from "../../context/CartContext";

// export const Cart = () => {
//   const { total, cartList } = useCart();

//   return (
//     <main>
//       <div className="p-6 mx-auto min-h-screen pl-[200px] mt-32 ">
//         <h1 className="text-2xl text-left font-bold mb-4">My Cart</h1>
//         <div className="bg-white border-[1px] text-left p-4 rounded-[30px] mb-4 w-[750px] mr-[25px] border border-gray-500">
//           <div className="font-bold">
//             My Cart({cartList.length})
//           </div>
//           {cartList.map((product) => (
//             <CartCard key={product.id} product={product} />
//           ))}
//         </div>

//         {/* Cart Total */}
//         <div className="bg-gray-100 p-4 rounded-[30px] mt-4">
//           <div className="font-bold">Total: ₹{total}</div>
//         </div>
//       </div>
//     </main>
//   );
// };


// import { CartCard } from "./components/CartCard";
// import { useCart } from "../../context/CartContext";
// import CartEmpty from "./components/CartEmpty";

// export const Cart = () => {
//   const { total, cartList } = useCart();

//   return (
//     <main>
//       <div className="p-6 mx-auto min-h-screen pl-[200px] mt-32">
        
//         {cartList.length > 0 ? (
//           <div className="bg-white border-[1px] text-left p-4 rounded-[30px] mb-4 w-[750px] mr-[25px] border border-gray-500">
//             <div className="font-bold">({cartList.length})</div>
//             {cartList.map((product) => (
//               <CartCard key={product.id} product={product} />
//             ))}
//             <div className="bg-gray-100 p-4 rounded-[30px] mt-4">
//               <div className="font-bold">Total: ₹{total}</div>
//               <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">Checkout</button>
//             </div>
//           </div>
//         ) : (
//           <CartEmpty />
//         )}
//       </div>
//     </main>
//   );
// };








// <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
//   <div className="w-100 bg-white h-full shadow-lg flex flex-col">
//     <button onClick={handleClose}>
//       <MdClose className="text-2xl text-gray-600 hover:text-black-500" />
//     </button>
//     {/* Header */}
//     <div className="flex justify-between items-center p-4 border-b">
//       <div className="flex gap-2">
//         <h2 className="text-lg font-semibold">My Cart</h2>
//         <p className="flex text-gray-500 text-sm">0 items</p>
//         <div className="vl border-s-2 h-12 text-black-800"></div>
//       </div>

//       <div>
//         <p className="">savings</p>
//         <div className="flex">
//           <MdCurrencyRupee />
//           <p>0</p>
//         </div>
//       </div>

//       <div>
//         <p>cart Total</p>
//         <div className="flex">
//           <MdCurrencyRupee />
//           <p>0</p>
//         </div>
//       </div>
//     </div>

//     {/* Cart Items */}
//     <div className="p-4 m-8">
//       <img className="w-full" src={Cart} alt="" />
//       <p className="text-gray-800 text-center font-bold py-4">No items in your cart</p>
//       <p className="text-gray-500 text-center text-sm">Browse from our wide variety of products & exciting offers</p>
//     </div>

//     <div className="text-center text-white">
//       <Link to="/home" onClick={handleClose} className="bg-green-500 w-auto p-2 text-sm">
//         START SHOPPING
//       </Link>
//     </div>
//   </div>
// </div>