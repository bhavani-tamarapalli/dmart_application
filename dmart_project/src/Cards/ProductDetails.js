

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import { useCart } from "../context/CartContext";

// export const ProductDetails = ({ endPointState, setEndPointState }) => {
//   const { addToCart } = useCart();
//   const { id } = useParams();
//   // console.log(id,"idddddddddddd")
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedVariant, setSelectedVariant] = useState();
//   const [activeTab, setActiveTab] = useState("Description");
//   const [productImage, setProductImage] = useState(null);
//   // console.log(productImage,"productImage")



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
//     async function fetchProductDetails() {
//       try {
//         const response = await fetch(`http://localhost:5000/product/category/${endPointState}/${id}`);
//         console.log(endPointState, "endpoint")




//         if (!response.ok) {
//           throw new Error("Failed to fetch product details");
//         }
//         const data = await response.json();
//         // console.log(data, "--------/////-")
//         // console.log(data.products[0].product_name, "----------");
//         const byteArray = new Uint8Array(data.products[0].image_data.data);
//         const base64String = arrayBufferToBase64(byteArray);
//         const base64Image = `data:image/jpg;base64,${base64String}`;
//         setProductImage(base64Image)

//         setProduct(data);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProductDetails();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center p-8">Loading product details...</div>;
//   }

//   if (!product) {
//     return <div className="text-center p-8">Product not found</div>;
//   }

//   // Tabs configuration
//   const tabs = ["Description", "DISCLAIMER", "MORE INFO"];

//   return (
//     <div className="container mx-auto p-4 mt-32">
//       <div className="flex flex-col md:flex-row gap-8">

//         <div className="w-full md:w-1/3 ">
//           <div className="border p-4 mb-4 flex justify-center">
//             <img
//               src={productImage}
//               alt={product.name}
//               className="max-w-full h-auto"
//             />

//           </div>
//         </div>

//         {/* Right section - Product details */}
//         <div className="w-full md:w-1/2">
//           <h1 className="text-2xl font-semibold mb-2">{product.products[0].product_name}</h1>
//           <div className="mb-4">
//             <a href="#" className="text-blue-500">{product.brand}</a>
//           </div>

//           {/* Variant selection */}
//           <div className="mb-4">
//             <p className="mb-2">Variant</p>
//             <div className="flex gap-2 border rounded px-4 py-2 rounded px-4 py-2 border-green-500">



//               {product.products[0].variant}
//             </div>
//           </div>

//           {/* Price section */}
//           <div className="mb-6">
//             <div className="flex items-center gap-2 text-gray-500 text-sm">
//               <p>MRP ₹{product.products[0].original_price}</p>
//               <span className="text-xs">(Inclusive of all taxes)</span>
//             </div>

//             <div className="flex items-center gap-4 my-2">
//               <span className="font-semibold">DMart ₹{product.products[0].dmartprice}</span>
//               <span className="text-gray-500 text-sm">{product.products[0].variant}</span>
//             </div>

//             <div className="inline-block bg-green-100 px-3 py-1 rounded">
//               Save ₹{product.products[0].discount}
//             </div>
//           </div>

//           {/* Vegetarian indicator */}
//           <div className="mb-6">
//             <div className="flex items-center gap-2">
//               <span className="border border-green-600 p-1">
//                 <div className="w-4 h-4 bg-green-600 rounded-full"></div>
//               </span>
//               <span>Vegetarian</span>
//             </div>
//           </div>

//           {/* Add to cart button */}
//           <button 
//           onClick={() => addToCart(product)} 
//           className="bg-green-500 text-white py-2 px-4 rounded w-full flex items-center justify-center gap-2">
//             <FaShoppingCart /> ADD TO CART
//           </button>

//           {/* <button
//             onClick={() => {
//               const customerId = JSON.parse(sessionStorage.getItem("customer_id"));
//               console.log(customerId, "iddd")

//               if (!customerId) {
//                 console.log("Please login first");
//                 return;
//               }

//               addToCart(product, customerId);
//               console.log(addToCart, "carttttttttttttttttttttt")
//             }}
//             className="bg-green-500 text-white py-2 px-4 rounded w-full flex items-center justify-center gap-2"
//           >
//             <FaShoppingCart /> ADD TO CART
//           </button> */}


//         </div>
//       </div>

//       {/* Tabs section */}
//       <div className="mt-8 border-b">
//         <div className="flex">
//           {tabs.map(tab => (
//             <button
//               key={tab}
//               className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-green-500 text-green-500 font-medium" : ""}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Product details content */}
//       {activeTab === "Description" && (
//         <div className="mt-4">
//           {product.products[0].description}
//         </div>
//       )}

//       {activeTab === "discraimer" && (
//         <div className="mt-4">
//           <p>{product.products[0].description}</p>
//         </div>
//       )}

//       {activeTab === "more info" && (
//         <div className="mt-4">
//           <p>{product.products[0].description}</p>
//         </div>
//       )}
//     </div>
//   );
// };


//web apis


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Description");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(`https://localhost:7001/api/Product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center p-8">Product not found</div>;
  }

  const imageSrc = product.image
    ? `data:image/jpeg;base64,${product.image}`
    : "/placeholder.jpg";

  const tabs = ["Description", "DISCLAIMER", "MORE INFO"];

  const handleAddToCart = async () => {
    if (adding) return; // Prevent double clicks
    
    try {
      setAdding(true);

      // Check login status first
      const customerId = sessionStorage.getItem("customer_id");
      const isLoggedIn = sessionStorage.getItem("isLoggedIn");
      
      // console.log('ProductDetails - Customer ID:', customerId);
      // console.log('ProductDetails - Is logged in:', isLoggedIn);
      
      if (!customerId || !isLoggedIn || isLoggedIn !== "true") {
        // alert("Please login to add items to cart");
        console.log("please login to add items to cart")
        return;
      }

      // console.log('ProductDetails - Adding product:', product);

      //  Only call addToCart from context, which handles the API call
      await addToCart({
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        originalPrice: product.originalPrice,
        discountPrice: product.discountPrice,
        image: product.image,
        quantity: 1
      });

      // alert("Product added to cart successfully!");

      console.log("product added to cart successfully")
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      // alert(`Error adding to cart: ${error.message}`);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-32">
      {/* Debug info - remove in production */}
      <div className="mb-4 p-2 bg-gray-100 text-sm">
        <p>Customer ID: {sessionStorage.getItem("customer_id")}</p>
        {/* <p>Is Logged In: {sessionStorage.getItem("isLoggedIn")}</p> */}
        <p>Product ID: {product.productId}</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="border p-4 mb-4 flex justify-center">
            <img
              src={imageSrc}
              alt={product.productName}
              className="max-w-full h-auto"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold mb-2">{product.productName}</h1>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <p>MRP ₹{product.originalPrice}</p>
              <span className="text-xs">(Inclusive of all taxes)</span>
            </div>

            <div className="flex items-center gap-4 my-2">
              <span className="font-semibold">DMart ₹{product.price}</span>
            </div>

            <div className="inline-block bg-green-100 px-3 py-1 rounded">
              Save ₹{product.discountPrice}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`bg-green-500 text-white py-2 px-4 rounded w-full flex items-center justify-center gap-2 transition-all duration-200 ${
              adding ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
            }`}
          >
            <FaShoppingCart /> {adding ? "ADDING..." : "ADD TO CART"}
          </button>
        </div>
      </div>

      <div className="mt-8 border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "border-b-2 border-green-500 text-green-500 font-medium"
                  : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Description" && (
        <div className="mt-4">{product.description}</div>
      )}
      {activeTab === "DISCLAIMER" && (
        <div className="mt-4">
          <p>{product.description}</p>
        </div>
      )}
      {activeTab === "MORE INFO" && (
        <div className="mt-4">
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
};


// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaChevronDown } from "react-icons/fa";
// import { useCart } from "../context/CartContext";

// export const ProductDetails= () => {
//     const { productId, categoryName } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const { addToCart } = useCart();
//     const navigate = useNavigate();

//     useEffect(() => {
//         async function fetchProductDetail() {
//             setLoading(true);
//             try {
//                 // Determine which endpoint to use based on whether we have a category
//                 let endpoint;
                
//                 if (categoryName) {
//                     endpoint = `http://localhost:5000/products/category/${categoryName}/${productId}`;
//                 } else {
//                     endpoint = `http://localhost:5000/products/${productId}`;
//                 }
                
//                 const response = await fetch(endpoint);
                
//                 if (!response.ok) {
//                     throw new Error(`Server responded with status: ${response.status}`);
//                 }
                
//                 const data = await response.json();
                
//                 // If the response is an array (from category endpoint), take first item
//                 const productData = Array.isArray(data) ? data[0] : data;
                
//                 // Format the product data
//                 const formattedProduct = {
//                     id: productData.product_id,
//                     name: productData.product_name,
//                     poster: "https://via.placeholder.com/400x300", // Placeholder for product image
//                     price: productData.original_price,
//                     dmartPrice: productData.dmartprice,
//                     discount: (productData.original_price - productData.dmartprice).toFixed(2),
//                     discountPercentage: ((productData.original_price - productData.dmartprice) / productData.original_price * 100).toFixed(0),
//                     unit: productData.variant || "1 unit",
//                     description: productData.description,
//                     category: productData.category_name,
//                     subcategory: productData.subcategory_name
//                 };
                
//                 setProduct(formattedProduct);
//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching product details:", err);
//                 setError("Failed to load product details. Please try again later.");
//                 setProduct(null);
//             } finally {
//                 setLoading(false);
//             }
//         }
        
//         if (productId) {
//             fetchProductDetail();
//         }
//     }, [productId, categoryName]);

//     const handleAddToCart = () => {
//         if (product) {
//             // Add the selected quantity to cart
//             addToCart({...product, quantity});
//         }
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Go back to previous page
//     };

//     if (loading) {
//         return (
//             <div className="container mx-auto px-4 py-10 mt-20">
//                 <div className="text-center py-20">Loading product details...</div>
//             </div>
//         );
//     }

//     if (error || !product) {
//         return (
//             <div className="container mx-auto px-4 py-10 mt-20">
//                 <div className="text-center py-20 text-red-500">
//                     {error || "Product not found"}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8 mt-20">
//             {/* Breadcrumb */}
//             <div className="text-sm text-gray-500 mb-6">
//                 <button onClick={handleGoBack} className="hover:text-green-600">
//                     &lt; Back
//                 </button>
//                 <span className="mx-2">/</span>
//                 <span>{product.category || "Groceries"}</span>
//                 {product.subcategory && (
//                     <>
//                         <span className="mx-2">/</span>
//                         <span>{product.subcategory}</span>
//                     </>
//                 )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 {/* Product Image */}
//                 <div className="bg-white p-8 rounded-lg shadow-sm">
//                     <img 
//                         src={product.poster} 
//                         alt={product.name} 
//                         className="w-full h-auto object-contain"
//                         onError={(e) => {e.target.src = "https://via.placeholder.com/400x300"}}
//                     />
//                 </div>

//                 {/* Product Details */}
//                 <div>
//                     <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

//                     {/* Ratings */}
//                     <div className="flex items-center mb-4">
//                         <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => (
//                                 <FaStar key={i} />
//                             ))}
//                         </div>
//                         <span className="ml-2 text-gray-500">(50+ ratings)</span>
//                     </div>

//                     {/* Pricing */}
//                     <div className="flex items-center gap-4 mb-4">
//                         <span className="text-2xl font-bold">₹{product.dmartPrice}</span>
//                         <span className="text-gray-500 line-through">MRP: ₹{product.price}</span>
//                         <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
//                             {product.discountPercentage}% OFF
//                         </span>
//                     </div>

//                     <p className="text-gray-600 mb-6">{product.description}</p>

//                     {/* Quantity Selector */}
//                     <div className="mb-6">
//                         <label className="block text-gray-700 mb-2">Quantity</label>
//                         <div className="flex items-center gap-4">
//                             <div className="relative w-32">
//                                 <select 
//                                     className="w-full appearance-none border border-gray-300 py-2 px-4 pr-8 rounded"
//                                     value={quantity}
//                                     onChange={(e) => setQuantity(Number(e.target.value))}
//                                 >
//                                     {[1, 2, 3, 4, 5].map((num) => (
//                                         <option key={num} value={num}>{num}</option>
//                                     ))}
//                                 </select>
//                                 <FaChevronDown className="absolute right-3 top-3 text-gray-400" />
//                             </div>
//                             <span>{product.unit}</span>
//                         </div>
//                     </div>

//                     {/* Add to Cart Button */}
//                     <button
//                         onClick={handleAddToCart}
//                         className="w-full bg-green-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-green-700 transition-colors"
//                     >
//                         ADD TO CART
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


