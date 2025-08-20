

// import { MdClose, MdCurrencyRupee } from "react-icons/md";

// import Cart from "../../../assets/images/empty-cart.c1f0c487.svg"

// import { Link } from "react-router-dom";

// export default function CartEmpty({ setCartOpen }) {
//     const handleClick = () => {

//         setCartOpen(false);
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
//             <div className="w-100 bg-white h-full shadow-lg flex flex-col">
//                 <button onClick={() => setCartOpen(false)}>
//                     <MdClose className="text-2xl text-gray-600 hover:text-black-500" />
//                 </button>
//                 {/* Header */}
//                 <div className="flex justify-between items-center p-4 border-b">
//                     <div className="flex gap-2">
//                         <h2 className="text-lg font-semibold">My Cart</h2>
//                         <p className="flex text-gray-500 text-sm ">0 items</p>
//                         <div className="vl border-s-2 h-12 text-black-800 "></div>
//                     </div>

//                     <div>
//                         <p className="">savings</p>
//                         <div className="flex">
//                             <MdCurrencyRupee />
//                             <p>0</p>
//                         </div>
//                     </div>

//                     <div>
//                         <p>cart Total</p>
//                         <div className="flex">
//                             <MdCurrencyRupee />
//                             <p>0</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Cart Items */}
//                 <div className="p-4 m-8
//                 ">
//                     <img className="w-full" src={Cart} alt="" />
//                     <p className="text-gray-800 text-center font-bold py-4">No items in your cart</p>
//                     <p className="text-gray-500 text-center text-sm">Browse from our wide variety of products & exciting offers</p>
//                 </div>

//                 <div className="text-center text-white">
//                     {/* Add the onClick event handler to close the cart */}
//                     <Link to="/home" onClick={handleClick} className="bg-green-500 w-auto p-2 text-sm">
//                         START SHOPPING
//                     </Link>
//                 </div>

//             </div>
//         </div>
//     );
// }

//react
// import { MdClose, MdCurrencyRupee } from "react-icons/md";
// import Cart from "../../../assets/images/empty-cart.c1f0c487.svg";
// import { Link } from "react-router-dom";

// export default function CartEmpty({ SetCartOpen }) {
//     const handleClose = () => {
//         SetCartOpen(false); 
//         console.log("Cart closed");
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
//             <div className="w-100 bg-white h-full shadow-lg flex flex-col">
//                 <button onClick={handleClose}>
//                     <MdClose className="text-2xl text-gray-600 hover:text-black-500" />
//                 </button>
//                 <div className="flex justify-between items-center p-4 border-b">
//                     <div className="flex gap-2">
//                         <h2 className="text-lg font-semibold">My Cart</h2>
//                         <p className="flex text-gray-500 text-sm">0 items</p>
//                         <div className="vl border-s-2 h-12 text-black-800"></div>
//                     </div>

//                     <div>
//                         <p className="">savings</p>
//                         <div className="flex">
//                             <MdCurrencyRupee />
//                             <p>0</p>
//                         </div>
//                     </div>

//                     <div>
//                         <p>cart Total</p>
//                         <div className="flex">
//                             <MdCurrencyRupee />
//                             <p>0</p>
//                         </div>
//                     </div>
//                 </div>

             
//                 <div className="p-4 m-8">
//                     <img className="w-full" src={Cart} alt="" />
//                     <p className="text-gray-800 text-center font-bold py-4">No items in your cart</p>
//                     <p className="text-gray-500 text-center text-sm">Browse from our wide variety of products & exciting offers</p>
//                 </div>

//                 <div className="text-center text-white">
//                     <Link to="/home" onClick={handleClose} className="bg-green-500 w-auto p-2 text-sm">
//                         START SHOPPING
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

//web api

import { MdClose, MdCurrencyRupee } from "react-icons/md";
import Cart from "../../../assets/images/empty-cart.c1f0c487.svg";
import { Link } from "react-router-dom";

export const CartEmpty=({ SetCartOpen }) =>{
    const handleClose = () => {
        SetCartOpen(false); 
        console.log("Cart closed");
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header is already rendered in CartSidebar, so we don't repeat it here */}
            
            {/* Empty cart content */}
            <div className="flex-1 flex flex-col justify-center items-center p-8">
                <img className="w-48 h-48 mb-4" src={Cart} alt="Empty Cart" />
                <p className="text-gray-800 text-center font-bold py-4 text-lg">
                    No items in your cart
                </p>
                <p className="text-gray-500 text-center text-sm mb-6">
                    Browse from our wide variety of products & exciting offers
                </p>
                
                <Link 
                    to="/home" 
                    onClick={handleClose} 
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors"
                >
                    START SHOPPING
                </Link>
            </div>
        </div>
    );
}

