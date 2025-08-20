

//react

// import { FaTrash } from "react-icons/fa";
// import { useCart } from "../../../context/CartContext";
// import { FiPlus, FiMinus } from "react-icons/fi";
// import { useEffect, useState } from "react";

// export const CartCard = ({ product }) => {
//   const { addToCart, removeFromCart, updateCartQuantity } = useCart();

//   const [cart, setCart] = useState([]);
//   const [count, setCount] = useState(product.quantity || 1);

//   const arrayBufferToBase64 = (buffer) => {
//     let binary = "";
//     const bytes = new Uint8Array(buffer);
//     for (let i = 0; i < bytes.byteLength; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   useEffect(() => {
//     async function getCartProduct() {
//       try {
//         const response = await fetch(`http://localhost:5000/product/id/${product.product_id}`);
//         const data = await response.json();
//         if (response.status == 200) {

//           // console.log("200 status")
//           // const data = await response.json();
//           // console.log(data.image.imageData.data, "imageData  ");

//           try {
//             const byteArray = new Uint8Array(data.image.imageData.data);
//             const base64String = arrayBufferToBase64(byteArray);
//             const base64Image = `data:${data.image.contentType};base64,${base64String}`;

//             // console.log(base64Image, "base64Image strrrr");

//             data.image.imageName = base64Image;
//             setCart(data);
//           } catch (error) {
//             console.error("Error fetching product image:", error);
//           }
//         }

//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     }

//     getCartProduct();
//   }, [product.product_id]);

//   if (!cart || !cart.product_name) {
//     return null;
//   }

//   const updateQuantity = async (newQuantity) => {
//     if (newQuantity === 0) {
//       removeFromCart(product);
//     } else {
//       await updateCartQuantity(product.product_id, newQuantity);
//     }
//     setCount(newQuantity);
//   };

//   const increment = () => {
//     updateQuantity(count + 1);
//   };

//   const decrement = () => {
//     if (count === 1) {

//       removeFromCart(product);
//       setCart(null);
//     } else {
//       updateQuantity(count - 1);
//     }
//   };

//   if (!cart) {
//     return null;
//   }

//   // console.log(cart, "carttttttttttttt")

//   return (
//     <div className="flex justify-between items-center border border-gray-300 p-4 rounded-lg shadow-md w-full">
//       <div className="flex items-center gap-4">
//         <img
//           src={cart.image.imageName}
//           alt={cart.product_name}
//           className="w-16 h-16 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-semibold text-gray-800">
//             {cart.product_name}
//           </h3>
//           <p className="text-gray-600">
//             You Pay <span className="font-semibold">₹{cart.dmartprice}</span>
//           </p>
//           <p className="text-gray-400 line-through">₹{cart.original_price}</p>
//           <p className="text-green-600 font-semibold">You Save ₹{cart.discount}</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="flex items-center border rounded-md overflow-hidden">
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={decrement}
//             disabled={count <= 1}
//           >
//             {cart.quantity} <FiMinus />
//           </button>
//           <span className="px-4 py-2 text-center">{count}</span>
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={increment}
//           >
//             <FiPlus />
//           </button>
//         </div>
//         <button className="text-red-500" onClick={() => updateQuantity(0)}>
//           <FaTrash />
//         </button>
//       </div>

//     </div>
//   );
// };

//web api

import { FaTrash } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useEffect, useState } from "react";

export const CartCard = ({ product }) => {
  const { removeFromCart, updateCartQuantity } = useCart();
  const [cart, setCart] = useState(null);
  const [count, setCount] = useState(product.quantity || 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCartProduct() {
      try {
        // Check if we need to fetch product details or if we already have them
        if (product.productName && product.price) {
          // We already have the product details from the cart API
          setCart(product);
        } else {
          // Fetch product details from Product API
          const response = await fetch(`https://localhost:7001/api/Product/${product.productId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product details");
          }
          
          const data = await response.json();
          console.log("Product data:", data);
          setCart({...data, quantity: product.quantity}); // Merge with quantity from cart
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        // Fallback: use whatever data we have from the product prop
        setCart(product);
      }
    }

    if (product && (product.productId || product.id)) {
      getCartProduct();
    }
  }, [product]);

  useEffect(() => {
    setCount(product.quantity || 1);
  }, [product.quantity]);

  if (!cart) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-gray-500">Loading product...</div>
      </div>
    );
  }

  const updateQuantity = async (newQuantity) => {
    setLoading(true);
    try {
      if (newQuantity <= 0) {
        await removeFromCart(product);
      } else {
        await updateCartQuantity(product.productId || product.id, newQuantity);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Revert count on error
      setCount(product.quantity || 1);
    } finally {
      setLoading(false);
    }
  };

  const increment = async () => {
    if (loading) return;
    const newCount = count + 1;
    setCount(newCount); // Optimistic update
    await updateQuantity(newCount);
  };

  const decrement = async () => {
    if (loading) return;
    if (count <= 1) {
      setCount(0);
      await updateQuantity(0); // This will remove the item
    } else {
      const newCount = count - 1;
      setCount(newCount); // Optimistic update
      await updateQuantity(newCount);
    }
  };

  const handleRemove = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await removeFromCart(product);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image display - check multiple possible image fields
  const imageSrc = cart.image
    ? `data:image/jpeg;base64,${cart.image}`
    : "/placeholder.jpg";

  return (
    <div className="flex justify-between items-center border border-gray-300 p-4 rounded-lg shadow-md w-full mb-2">
      <div className="flex items-center gap-4">
        <img
          src={imageSrc}
          alt={cart.productName || cart.name || 'Product'}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-gray-800">
            {cart.productName || cart.name || 'Unknown Product'}
          </h3>
          <p className="text-gray-600">
            You Pay <span className="font-semibold">₹{cart.price || cart.currentPrice || 0}</span>
          </p>
          <p className="text-gray-400 line-through">₹{cart.originalPrice || cart.mrp || 0}</p>
          <p className="text-green-600 font-semibold">
            You Save ₹{cart.discountPrice || (cart.originalPrice - cart.price) || 0}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            className={`p-2 bg-gray-200 hover:bg-gray-300 ${loading ? 'opacity-50' : ''}`}
            onClick={decrement}
            disabled={loading || count <= 0}
          >
            <FiMinus />
          </button>
          <span className="px-4 py-2 text-center min-w-[50px]">{count}</span>
          <button
            className={`p-2 bg-gray-200 hover:bg-gray-300 ${loading ? 'opacity-50' : ''}`}
            onClick={increment}
            disabled={loading}
          >
            <FiPlus />
          </button>
        </div>
        <button 
          className={`text-red-500 hover:text-red-700 ${loading ? 'opacity-50' : ''}`}
          onClick={handleRemove}
          disabled={loading}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};



// import { FaTrash } from "react-icons/fa";
// import { useCart } from "../../../context/CartContext";
// import { FiPlus, FiMinus } from "react-icons/fi";
// import { useEffect,useState } from "react";

// export const CartCard = ({ product,cartList }) => {
//   const [cart,setCart]=useState([])

//   const productNo=product.product_id;

//   const { removeFromCart, addToCart } = useCart();

//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

// useEffect(()=>{
//   async function getcartproducts(){
//     const response=await fetch(`http://localhost:5000/product/id/${productNo}`)
//     const data=await response.json()

//         setCart(data.products[0]);
//         console.log(data.products[0],"dataaaaaaaaaaaaaaaaa")
//   }
// },[])


// try {

//   const byteArray = new Uint8Array(cart.image_data.data);
//   console.log(byteArray, "bytearray")
//   const base64String = arrayBufferToBase64(byteArray);
//   const base64Image = `data:image/webp;base64,${base64String}`;

//   cart.image_name=base64Image

// } catch (error) {
// console.error('Error fetching products Images:', error);
// }

//   const [count, setCount] = useState(product.quantity || 1); 

//   if(!product){
//     return null;
//   }
// console.log(cart,"carttttttttttt")



// const updateQuantity=async (newQuantity)=>{
//   try{
//     const response=await fetch('http://localhost:5000/cart/update',{
//       method:'PUT',
//       headers:{
//       'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         product_id: product.product_id,
//         quantity: newQuantity,
//       }),
//     })
//     if (!response.ok) {
//       throw new Error('Failed to update quantity');
//     }
//     const data = await response.json();
//     console.log('Cart update result:', data);

//     setCount(newQuantity);
//     if (newQuantity === 0) {
//       removeFromCart(product); 
//     } else {
//       addToCart({ ...product, quantity: newQuantity }); 
//     }
//   } catch (error) {
//     console.error('Error updating cart:', error);
//   }
// }


// const handleIncrement=()=>{
//   updateQuantity(count+1);
// };

// const handleDecrement=()=>{
//   if(count>1){
//     updateQuantity(count-1);
//   }else{
//     updateQuantity(0)
//   }
// }

//   return (
//     <div className="flex justify-between items-center border border-gray-300 p-4 rounded-lg shadow-md w-full">

//       <div className="flex items-center gap-4">
//         <img
//           src={`data:image/png;base64,${cart.image_data}`} 
//           alt={product.product_name} 
//           className="w-16 h-16 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-semibold text-gray-800">{cart.product_name} ({cart.variant})</h3>
//           {/* <p className="text-gray-600">{product.description}</p> */}
//           <p className="text-gray-600">
//             You Pay <span className="font-semibold">₹{cart.price}</span>
//           </p>
//           <p className="text-gray-400 line-through">₹{cart.original_price}</p>
//           <p className="text-green-600 font-semibold">You Save ₹{cart.discount}</p>
//         </div>
//       </div>


//       <div className="flex items-center gap-4">
//         <div className="flex items-center border rounded-md overflow-hidden">
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={handleDecrement}
//             disabled={cart.quantity <= 1}
//           >
//             <FiMinus />
//           </button>
//           <span className="px-4 py-2 text-center">{cart.quantity}</span>
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={handleIncrement}
//           >
//             <FiPlus />
//           </button>
//         </div>

//         <button className="text-red-500" >
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// };


// import { FaTrash } from "react-icons/fa";
// import { useCart } from "../../../context/CartContext";
// import { FiPlus, FiMinus } from "react-icons/fi";
// import { useEffect, useState } from "react";

// export const CartCard = ({ product }) => {
//   const [cart, setCart] = useState({});

//   const productNo = product.product_id;
//   const { removeFromCart, addToCart } = useCart();
//   const [count, setCount] = useState(product.quantity || 1);

//   // Convert ArrayBuffer to Base64 image
//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   useEffect(() => {
//     async function getCartProduct() {
//       try {
//         const response = await fetch(`http://localhost:5000/product/id/${productNo}`);
//         const data = await response.json();
//         const productData = data.products[0];

//         const byteArray = new Uint8Array(productData.image_data.data);
//         const base64String = arrayBufferToBase64(byteArray);
//         const base64Image = `data:image/webp;base64,${base64String}`;

//         productData.image_name = base64Image;
//         setCart(productData);
//       } catch (error) {
//         console.error('Error fetching product image:', error);
//       }
//     }

//     getCartProduct();
//   }, [productNo]);

//   if (!product || !cart.product_name) {
//     return null;
//   }

//   const updateQuantity = async (newQuantity) => {
//     try {
//       const response = await fetch('http://localhost:5000/cart/update', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           product_id: product.product_id,
//           quantity: newQuantity,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to update quantity');

//       const data = await response.json();
//       console.log('Cart update result:', data);

//       setCount(newQuantity);
//       if (newQuantity === 0) {
//         removeFromCart(product);
//       } else {
//         addToCart({ ...product, quantity: newQuantity });
//       }
//     } catch (error) {
//       console.error('Error updating cart:', error);
//     }
//   };

//   const handleIncrement = () => {
//     updateQuantity(count + 1);
//   };

//   const handleDecrement = () => {
//     if (count > 1) {
//       updateQuantity(count - 1);
//     } else {
//       updateQuantity(0);
//     }
//   };

//   return (
//     <div className="flex justify-between items-center border border-gray-300 p-4 rounded-lg shadow-md w-full">
//       <div className="flex items-center gap-4">
//         <img
//           src={cart.image_name}
//           alt={product.product_name}
//           className="w-16 h-16 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-semibold text-gray-800">
//             {cart.product_name} ({cart.variant})
//           </h3>
//           <p className="text-gray-600">
//             You Pay <span className="font-semibold">₹{cart.price}</span>
//           </p>
//           <p className="text-gray-400 line-through">₹{cart.original_price}</p>
//           <p className="text-green-600 font-semibold">You Save ₹{cart.discount}</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="flex items-center border rounded-md overflow-hidden">
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={handleDecrement}
//             disabled={count <= 1}
//           >
//             <FiMinus />
//           </button>
//           <span className="px-4 py-2 text-center">{count}</span>
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={handleIncrement}
//           >
//             <FiPlus />
//           </button>
//         </div>

//         <button className="text-red-500" onClick={() => updateQuantity(0)}>
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// };





// import { FaTrash } from "react-icons/fa";
// import { useCart } from "../../../context/CartContext";
// import { FiPlus, FiMinus } from "react-icons/fi";
// import { useEffect, useState } from "react";

// export const CartCard = ({ product }) => {
//   const { addToCart, removeFromCart, updateCartQuantity } = useCart();

//   const [cart, setCart] = useState(null);
//   const [count, setCount] = useState(product.quantity || 1);

//   const arrayBufferToBase64 = (buffer) => {
//     let binary = "";
//     const bytes = new Uint8Array(buffer);
//     for (let i = 0; i < bytes.byteLength; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   useEffect(() => {
//     async function getCartProduct() {
//       const response = await fetch(`http://localhost:5000/product/id/${product.product_id}`);
//       const data = await response.json();

//       if (data.products[0]) {
//         const productData = data.products[0];

//         try {
//           const byteArray = new Uint8Array(productData.image_data.data);
//           const base64String = arrayBufferToBase64(byteArray);
//           const base64Image = `data:image/webp;base64,${base64String}`;
//           productData.image_name = base64Image;
//         } catch (error) {
//           console.error("Error fetching product image:", error);
//         }
//         setCart(productData);
//       }
//     }

//     getCartProduct();
//   }, [product.product_id]);
//   if (!product || !cart.product_name) {
//     return null;
//   }
//   const updateQuantity = async (newQuantity) => {
//     if (newQuantity === 0) {
//       removeFromCart(product);
//     } else {
//       await updateCartQuantity(product.product_id, newQuantity);
//     }
//     setCount(newQuantity);
//   };

//   const increment = () => {
//     updateQuantity(count + 1);
//   };

//   const decrement = () => {
//     if (count === 1) {

//       removeFromCart(product);
//       setCart(null);
//     } else {
//       updateQuantity(count - 1);
//     }
//   };

//   if (!cart) {
//     return null;  
//   }


//   return (
//     <div className="flex justify-between items-center border border-gray-300 p-4 rounded-lg shadow-md w-full">
//       <div className="flex items-center gap-4">
//         <img
//           src={cart.image_name}
//           alt={product.product_name}
//           className="w-16 h-16 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-semibold text-gray-800">
//             {cart.product_name} ({cart.variant})
//           </h3>
//           <p className="text-gray-600">
//             You Pay <span className="font-semibold">₹{cart.price}</span>
//           </p>
//           <p className="text-gray-400 line-through">₹{cart.original_price}</p>
//           <p className="text-green-600 font-semibold">You Save ₹{cart.discount}</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="flex items-center border rounded-md overflow-hidden">
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={decrement}
//             disabled={count <= 1}
//           >
//             <FiMinus />
//           </button>
//           <span className="px-4 py-2 text-center">{count}</span>
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={increment}
//           >
//             <FiPlus />
//           </button>
//         </div>

//         <button className="text-red-500" onClick={() => updateQuantity(0)}>
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// };



// import React, { useState, useEffect } from "react";

//  export const CartCard = () => {

//   const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);


//   const addToCart = (product) => {
//     const updatedCart = [...cart, product];
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); 
//   };


//   const removeFromCart = (id) => {
//     const updatedCart = cart.filter(item => item.id !== id);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="container mx-auto">

//         <header className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-green-600">DMart - Online Shopping</h1>
//         </header>


//         <section>
//           <h2 className="text-2xl font-semibold mb-6">Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map(product => (
//               <div
//                 key={product.id}
//                 className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
//               >
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p className="text-sm text-gray-600">₹{product.price}</p>
//                 <button
//                   onClick={() => addToCart(product)}
//                   className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>


//         <section className="mt-12">
//           <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
//           {cart.length === 0 ? (
//             <p>Your cart is empty! Start adding products.</p>
//           ) : (
//             <div>
//               {cart.map(item => (
//                 <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold">{item.name}</h3>
//                     <p className="text-sm text-gray-600">₹{item.price}</p>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <div className="mt-4 text-lg font-semibold">
//                 Total: ₹{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
//               </div>
//               <button className="mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
//                 Checkout
//               </button>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default CartCard;





// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../../../context/CartContext";

// export const CartCard = ({ product }) => {
//   const { removeFromCart } = useCart();

//   const [count, setCount] = useState(product.quantity || 1);

//   const increment = () => {
//     setCount(prevCount => prevCount + 1);
//   };

//   const decrement = () => {
//     if (count > 1) {
//       setCount(prevCount => prevCount - 1);
//     } else {
//       removeFromCart(product);
//     }
//   };

//   return (
//     <div className="flex">
//       <div className=" text-left p-4 mb-4 w-[750px] mr-[25px] border-b border-b-gray-200">
//         <div className="flex p-2 pr-2">
//           <p className="text-green-600 text-[10px] bg-green-100 mr-2">Quick</p>
//           <p className="text-[10px]"> Delivery in 10 to 30 mins</p>
//         </div>
//         <p className="text-green-600 text-sm bg-green-100 p-2">
//           Yay! You get FREE delivery with this Basket
//         </p>
//         <div className="flex items-center mt-2">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-12 h-12 mr-4"
//           />
//           <div>
//             <p className="text-sm">{product.name}</p>
//             <p className="text-gray-600 line-through text-xs">₹{product.original_price}</p>
//             <p className="text-black font-bold">₹{product.price}</p>
//           </div>
//         </div>
//         <div className="flex justify-between">
//           <Link to="/">
//             <p className="text-[#0c5273] font-bold mt-4">Save for later</p>
//           </Link>
//           <div className="text-center m-8">
//             <div className="flex gap-4">
//               <button
//                 onClick={decrement}
//                 className="w-12 h-12 flex items-center justify-center text-xl rounded-full border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
//                 aria-label="Decrease count"
//               >
//                 -
//               </button>
//               <span className="text-xl font-medium w-8 text-center pt-2">{count}</span>
//               <button
//                 onClick={increment}
//                 className="w-12 h-12 flex items-center justify-center text-xl rounded-full border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
//                 aria-label="Increase count"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



// import { FaTrash } from "react-icons/fa";
// import { useCart } from "../../../context/CartContext";

// export const CartCard = ({ product }) => {
//   const { removeFromCart } = useCart();

//   return (


//     <div className="flex justify-between items-center w-96 mb-4 p-4 border-b border-gray-300">
//       <div className="flex gap-4">
//         <img src={product.poster} alt={product.name} className="w-20 h-20 object-cover" />
//         <div className="text-sm">
//           <h3 className="font-semibold"> {product.name}</h3>
//           <p> You Pay ₹{product.price}</p>
//           <p>Variant:{product.unit}</p>
//         </div>

//       </div>

//       <button
//         className="text-red-500"
//         onClick={() => removeFromCart(product)} >
//         <FaTrash />
//       </button>
//     </div>
//   );
// };



// import { FaTrash } from "react-icons/fa";
// import { useCart } from "../../../context/CartContext";
// import { FiPlus, FiMinus } from "react-icons/fi";

// export const CartCard = ({ product, quantity, updateQuantity }) => {
//   const { removeFromCart } = useCart();

//   return (
//     <div className="flex justify-between items-center border border-gray-300 p-4 rounded-lg shadow-md w-full">
//       <div className="flex items-center gap-4">
//         <img
//           src={product.poster}
//           alt={product.name}
//           className="w-16 h-16 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-semibold text-gray-800">{product.name} : {product.unit}</h3>
//           <p className="text-gray-600">You Pay <span className="font-semibold">₹{product.price}</span></p>
//           <p className="text-green-600 font-semibold">You Save ₹{product.discount}</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="flex items-center border rounded-md overflow-hidden">
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={() => updateQuantity(product, quantity - 1)}
//             disabled={quantity <= 1}
//           >
//             <FiMinus />
//           </button>
//           <span className="px-4 py-2 text-center">{quantity}</span>
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={() => updateQuantity(product, quantity + 1)}
//           >
//             <FiPlus />
//           </button>
//         </div>

//         <button className="text-red-500" onClick={() => removeFromCart(product)}>
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// };


// import { FaTrash } from "react-icons/fa";
// import { useCart } from "../../../context/CartContext";
// import { FiPlus, FiMinus } from "react-icons/fi";

// export const CartCard = ({ product, quantity }) => {
//   const { removeFromCart, updateQuantity } = useCart();

//   const handleIncrement = () => {
//     // Ensure the quantity is a number before updating
//     updateQuantity(product, quantity + 1);
//   };

//   const handleDecrement = () => {
//     // Ensure the quantity is a number before updating
//     if (quantity > 1) {
//       updateQuantity(product, quantity - 1);
//     }
//   };

//   return (
//     <div className="flex justify-between items-center border border-gray-300 p-4 rounded-lg shadow-md w-full">
//       <div className="flex items-center gap-4">
//         <img
//           src={product.poster}
//           alt={product.name}
//           className="w-16 h-16 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-semibold text-gray-800">{product.name} : {product.unit}</h3>
//           <p className="text-gray-600">You Pay <span className="font-semibold">₹{product.price}</span></p>
//           <p className="text-green-600 font-semibold">You Save ₹{product.discount}</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="flex items-center border rounded-md overflow-hidden">
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={handleDecrement}
//             disabled={quantity <= 1}
//           >
//             <FiMinus />
//           </button>
//           <span className="px-4 py-2 text-center">{quantity}</span>
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={handleIncrement}
//           >
//             <FiPlus />
//           </button>
//         </div>

//         <button className="text-red-500" onClick={() => removeFromCart(product)}>
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// };

// import React from 'react';
// import { FaTrash } from "react-icons/fa";
// import { useCart } from "../../../context/CartContext";
// import { FiPlus, FiMinus } from "react-icons/fi";

// export const CartCard = ({ product }) => {
//   const { removeFromCart, updateQuantity } = useCart();

//   const handleIncrement = () => {
//     updateQuantity(product, product.quantity + 1);  // Increase quantity by 1
//   };

//   const handleDecrement = () => {
//     if (product.quantity > 1) {
//       updateQuantity(product, product.quantity - 1);  // Decrease quantity by 1
//     }
//   };

//   return (
//     <div className="flex justify-between items-center border border-gray-300 p-4 rounded-lg shadow-md w-full">
//       <div className="flex items-center gap-4">
//         <img
//           src={product.poster}
//           alt={product.name}
//           className="w-16 h-16 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-semibold text-gray-800">{product.name} : {product.unit}</h3>
//           <p className="text-gray-600">You Pay <span className="font-semibold">₹{product.price}</span></p>
//           <p className="text-green-600 font-semibold">You Save ₹{product.discount}</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="flex items-center border rounded-md overflow-hidden">
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={handleDecrement}
//             disabled={product.quantity <= 1}  // Prevent decrementing below 1
//           >
//             <FiMinus />
//           </button>
//           <span className="px-4 py-2 text-center">{product.quantity}</span>
//           <button
//             className="p-2 bg-gray-200 hover:bg-gray-300"
//             onClick={handleIncrement}
//           >
//             <FiPlus />
//           </button>
//         </div>

//         <button className="text-red-500" onClick={() => removeFromCart(product)}>
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// };
