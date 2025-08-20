
import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

const categories = [
    "All Fruits & vegetables Products",
    "Fruits",
    "vegetables",
    "Frozen vegetables",
    "Exotic vegetables",
    "Exotic Fruits",
    "cut Fruits & veggies",
    "Hydroponics",
    "Leafy Vegetables",
    "Sprouts"
];

export const Fruits = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("http://localhost:8080/products");
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row mt-32 gap-6 px-4">
            {/* Sidebar Categories */}
            <div className="w-full lg:w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`py-3 px-4 cursor-pointer border-b text-sm font-medium ${selectedCategory === category ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </div>
                ))}
            </div>

            {/* Filters and Products Grid */}
            <div className="">

                <div className="flex flex-wrap gap-4 mb-6  my-4  ">
                    <button type="button" className="flex items-center px-4 py-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
                        Brand <FaChevronDown className="ml-2" />
                    </button>

                    <button type="button" className="flex items-center px-4  mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
                        Category <FaChevronDown className="ml-2" />
                    </button>
                   
                    <button type="button" className="flex items-center  px-4  mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
                        Availability <FaChevronDown className="ml-2" />
                    </button>
                </div>


                {/* Products Grid (Row 2) */}
                <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                            <img
                                src={product.poster}
                                alt={product.title}
                                className="w-full h-36 object-contain mb-3 hover:scale-95 transition duration-300"
                            />
                            <h3 className="text-sm font-medium mb-2">{product.name}</h3>

                            {/* Pricing Section */}
                            <div className="text-sm my-2 grid grid-cols-3 gap-2">
                                <div className="text-gray-400 text-xs">
                                    <p>MRP</p>
                                    <p className="line-through">₹{product.price}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700">DMart</p>
                                    <p className="font-bold">₹{product.dmartprice}</p>
                                </div>
                                <p className="text-green-700 font-bold bg-green-100 px-2 py-1 text-xs rounded">
                                    ₹{product.discount} OFF
                                </p>
                            </div>

                            {/* Quantity Selection */}
                            <select className="w-full mt-2 p-2 border rounded text-sm">
                                <option>{product.unit}</option>
                            </select>

                            {/* Add to Cart Button */}
                            <button className="w-full bg-green-600 text-white mt-3 py-2 rounded font-medium flex items-center justify-center hover:bg-green-700">
                                ADD TO CART
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};










// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
 
 
// export const LoginPage = () => {
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     async function handleLogin(event) {
//         event.preventDefault();
//         const email = event.target.email.value;
//         const password = event.target.password.value;
//         try {
//             const response = await fetch("http://localhost:5000/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password_hash: password,
//                 }),
//             });
   
//             console.log('Response Status:', response.status);
//             const responseBody = await response.text();
//             console.log('Response Body:', responseBody);
   
//             if (response.ok) {
//                 if (responseBody === "Login successfully") {
//                     navigate('/');
//                 } else {
//                     setError(responseBody);  
//                 }
//             } else {
//                 setError(responseBody);
//             }
//         } catch (error) {
//             console.error("Login error: ", error);
//             setError("An error occurred while logging in. Please try again.");
//         }
//     }
   
 
//     return (
//         <main className="flex justify-center items-center min-h-screen bg-gray-50">
//             <section className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//                 <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">Login</p>
 
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-6">
//                         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
//                         <input
//                             name="email"
//                             type="email"
//                             id="email"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             required
//                             autoComplete="off"
//                         />
//                     </div>
 
//                     <div className="mb-6">
//                         <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
//                         <input
//                             name="password"
//                             type="password"
//                             id="password"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             required
//                         />
//                     </div>
 
//                     {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}
 
//                     <button
//                         type="submit"
//                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                     >
//                         Log In
//                     </button>
//                 </form>
//             </section>
//         </main>
//     );
// };
 
 