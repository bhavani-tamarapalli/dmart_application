// import React from 'react'

// import { useCart } from "../context/CartContext";
// export const Card = ({ product }) => {

//     const { addToCart } = useCart();

//     return (
//         <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
//             <img
//                 src={product.poster}
//                 alt={product.title}
//                 className="w-full h-36 object-contain mb-3 hover:scale-95 transition duration-300 "
//             />
//             <h3 className="text-sm font-medium mb-2">{product.name}</h3>

//             {/* Pricing Section */}
//             <div className="text-sm my-2 grid grid-cols-3 gap-2">
//                 <div className="text-gray-400 text-xs">
//                     <p>MRP</p>
//                     <p className="line-through">₹{product.price}</p>
//                 </div>
//                 <div>
//                     <p className="text-gray-700">DMart</p>
//                     <p className="font-bold">₹{product.dmartPrice}</p>
//                 </div>
//                 <p className="text-green-700 font-bold bg-green-100 px-2 py-1 text-xs rounded">
//                     ₹{product.discount} OFF
//                 </p>
//             </div>

//             {/* Quantity Selection */}
//             <select className="w-full mt-2 p-2 border rounded text-sm">
//                 <option>{product.unit}</option>
//             </select>

//             {/* Add to Cart Button */}
//             <button  onClick={() => addToCart(product)}  className="w-full bg-green-600 text-white mt-3 py-2 rounded font-medium flex items-center justify-center hover:bg-green-700">
//                 ADD TO CART
//             </button>
//         </div>
//     )
// }



// import React from 'react';
// import { useCart } from "../context/CartContext";

// export const Card = ({ product, image }) => {
//     const { addToCart } = useCart();
//     const { product_name, original_price, dmartprice, variant, discount } = product;

//     return (
//         <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-3 m-2 flex flex-col justify-between border border-gray-100">
//             {/* Product Image */}
//             <img
//                 src={image}
//                 alt={product_name}
//                 className="w-full h-36 object-contain mb-3 hover:scale-95 transition duration-300"
//             />

//             {/* Product Name */}
//             <h3 className="text-sm font-medium text-gray-800 mb-1 h-10 line-clamp-2">
//                 {product_name}
//             </h3>
// _
//             {/* Pricing Section */}
//             <div className="text-xs text-gray-600 mb-2 grid grid-cols-3 gap-2 items-center">
//                 <div>
//                     <p className="text-gray-400">MRP</p>
//                     <p className="line-through">₹{original_price}</p>
//                 </div>
//                 <div>
//                     <p className="text-gray-700">DMart</p>
//                     <p className="font-semibold text-green-700">₹{dmartprice}</p>
//                 </div>
//                 <div className="text-center">
//                     <p className="text-green-800 font-bold bg-green-100 px-2 py-1 rounded text-xs">
//                         ₹{discount} OFF
//                     </p>
//                 </div>
//             </div>

//             {/* Variant Dropdown */}
//             <select className="w-full text-xs px-2 py-1 border border-gray-300 rounded mb-2 focus:outline-none">
//                 <option>{variant}</option>
//             </select>

//             {/* Add to Cart Button */}
//             <button
//                 onClick={() => addToCart(product)}
//                 className="w-full bg-green-600 text-white py-2 text-sm rounded hover:bg-green-700 transition-all font-medium"
//             >
//                 ADD TO CART
//             </button>
//         </div>
//     );
// };




//web apis 


import React from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useCart } from "../context/CartContext";

export const Card = ({ product }) => {
  const { addToCart } = useCart();
  const {
    productName,
    originalPrice,
    price,
    variant,
    discountPrice,
    image
  } = product;


  const imageSrc = image
    ? `data:image/jpeg;base64,${image}`
    : "/placeholder.jpg";

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-3 m-2 flex flex-col justify-between border border-gray-100">
      {/* Product Image */}
      <img
        src={imageSrc}
        alt={productName}
        className="w-full h-36 object-contain mb-3 hover:scale-95 transition duration-300"
      />

      {/* Product Name */}
      <h3 className="text-sm font-medium text-gray-800 mb-1 h-10 line-clamp-2">
        {productName}
      </h3>

      {/* Pricing Section */}
      <div className="text-xs text-gray-600 mb-2 grid grid-cols-3 gap-2 items-center">
        <div>
          <p className="text-gray-400">MRP</p>
          <p className="line-through flex items-center">
            <MdOutlineCurrencyRupee className="text-xs" />
            {originalPrice}
          </p>
        </div>
        <div>
          <p className="text-gray-700">DMart Price</p>
          <p className="font-semibold text-green-700 flex items-center">
            <MdOutlineCurrencyRupee className="text-xs" />
            {price}
          </p>
        </div>
        <div className="text-center">
          <p className="text-green-800 font-bold bg-green-100 px-2 py-1 rounded text-xs flex items-center justify-center">
            <MdOutlineCurrencyRupee className="text-xs" />
            {discountPrice} OFF
          </p>
        </div>
      </div>

      <select className="w-full text-xs px-2 py-1 border border-gray-300 rounded mb-2 focus:outline-none">
         <option>{variant}</option>
       </select>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-green-600 text-white py-2 text-sm rounded hover:bg-green-700 transition-all font-medium"
      >
        ADD TO CART
      </button>
    </div>
  );
};








