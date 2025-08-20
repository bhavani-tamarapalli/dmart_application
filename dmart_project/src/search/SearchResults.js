/*
//react
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function SearchResults() {
    const query = useQuery();
    const searchTerm = query.get("query");
    const [results, setResults] = useState([]);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    useEffect(() => {
        async function fetchResults() {
            try {
                const res = await fetch(`http://localhost:5000/search?product_name=${searchTerm}`);
                const data = await res.json();
                     console.log(data,"ressssssssssssssssssssssssssssss")

                if (data.products && data.products.length > 0) {
                    const productsWithImages = data.products.map((product) => {
                        let base64Image = '';

                        if (product.image_data && product.image_data.data) {
                            const byteArray = new Uint8Array(product.image_data.data);
                            const base64String = arrayBufferToBase64(byteArray);
                            base64Image = `data:image/jpeg;base64,${base64String}`;
                        }

                        return {
                            ...product,
                            product_image: base64Image, 
                        };
                    });

                    setResults(productsWithImages);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }

       
        }

        if (searchTerm) fetchResults();
    }, [searchTerm]);

    return (
        <div className="p-4 mt-32 ">
            <div className="flex justify-center">
                <h2 className="text-sm mb-4 ">Search Results for: {searchTerm}</h2>
                {results.length > 0 ? (
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
                        {results.map((product) => (
                            <li key={product.product_id} className="border rounded p-3 shadow">
                                {product.product_image ? (
                                    <img
                                        src={product.product_image}
                                        alt={product.product_name}
                                        className="h-32 object-contain mx-auto"
                                    />
                                ) : (
                                    <div className="h-32 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}
                                <h3 className="text-sm mt-2 font-medium">{product.product_name}</h3>
                                <p className="text-gray-500 line-through text-sm">₹{product.original_price}</p>
                                <p className="text-green-700 font-semibold">₹{product.dmartprice}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products found.</p>
                )}
            </div>

        </div>
    );
}

*/

//web api
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const SearchResults=()=> {
    const query = useQuery();
    const navigate = useNavigate();
    const searchTerm = query.get("query");
    const { addToCart, loading: cartLoading } = useCart();
    
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 20,
        totalCount: 0,
      
    });
    const [addingToCart, setAddingToCart] = useState({});

    const fetchResults = async (page = 1) => {
        if (!searchTerm) return;
        
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(
                `https://localhost:7001/api/Search?query=${encodeURIComponent(searchTerm)}&page=${page}&pageSize=${pagination.pageSize}`
            );
            
            if (!response.ok) {
                throw new Error(`Search failed: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Search results:", data);
            
            if (data.products && Array.isArray(data.products)) {
                setResults(data.products);
                setPagination({
                    currentPage: data.currentPage || page,
                    pageSize: data.pageSize || 20,
                    totalCount: data.totalCount || 0,
                    totalPages: data.totalPages || 0
                });
            } else {
                setResults([]);
                setPagination(prev => ({
                    ...prev,
                    currentPage: page,
                    totalCount: 0,
                    totalPages: 0
                }));
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            setError(error.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults(1);
    }, [searchTerm]);

   
    const handleAddToCart = async (product) => {
        const customerId = sessionStorage.getItem("customer_id");
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        
        if (!customerId || !isLoggedIn || isLoggedIn !== "true") {
            alert("Please login to add items to cart");
            return;
        }

        setAddingToCart(prev => ({ ...prev, [product.productId]: true }));
        
        try {
            await addToCart({
                productId: product.productId,
                productName: product.productName,
                price: product.price,
                originalPrice: product.originalPrice,
                discountPrice: product.discountPrice,
                image: product.image,
                quantity: 1
            });
            
            // Optional: Show success message
            console.log("Product added to cart successfully");
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert(error.message || "Failed to add item to cart");
        } finally {
            setAddingToCart(prev => ({ ...prev, [product.productId]: false }));
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

   
    if (!searchTerm) {
        return (
            <div className="p-4 mt-32 text-center">
                <div className="flex items-center justify-center mb-4">
                    <FaSearch className="text-gray-400 text-4xl mb-2" />
                </div>
                <h2 className="text-xl text-gray-600">No search term provided</h2>
                <p className="text-gray-500">Please enter a search term to find products</p>
            </div>
        );
    }

    return (
        <div className="p-4 mt-32 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Search Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Search Results for: "{searchTerm}"
                    </h2>
                   
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                        <p className="ml-3 text-gray-600">Searching products...</p>
                    </div>
                ) : error ? (
                    /* Error State */
                    <div className="text-center p-12">
                        <div className="text-red-500 text-lg mb-4">
                            <FaSearch className="mx-auto text-4xl mb-4 text-red-300" />
                            Error: {error}
                        </div>
                        <button 
                            onClick={() => fetchResults(pagination.currentPage)}
                            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : results.length > 0 ? (
                    /* Results */
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {results.map((product) => (
                                <div key={product.productId} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white">
                                    {/* Product Image and Name */}
                                    <div 
                                        className="cursor-pointer"
                                        onClick={() => handleProductClick(product.productId)}
                                    >
                                        {product.image ? (
                                            <img
                                                src={`data:image/jpeg;base64,${product.image}`}
                                                alt={product.productName}
                                                className="h-32 w-full object-contain mx-auto mb-3 rounded"
                                                onError={(e) => {
                                                    e.target.src = "/placeholder.jpg";
                                                }}
                                            />
                                        ) : (
                                            <div className="h-32 flex items-center justify-center bg-gray-100 text-gray-400 text-sm mb-3 rounded">
                                                No Image Available
                                            </div>
                                        )}
                                        
                                        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                                            {product.productName}
                                        </h3>
                                    </div>
                                    
                                    {/* Price Information */}
                                    <div className="mb-3">
                                        {product.originalPrice > product.price && (
                                            <p className="text-gray-500 line-through text-sm">
                                                ₹{product.originalPrice.toFixed(2)}
                                            </p>
                                        )}
                                        <p className="text-green-700 font-semibold text-lg">
                                            ₹{product.price.toFixed(2)}
                                        </p>
                                        {product.savingsPercentage > 0 && (
                                            <p className="text-green-600 text-xs font-medium">
                                                {product.savingsPercentage}% OFF
                                            </p>
                                        )}
                                    </div>
                                    
                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={addingToCart[product.productId] || cartLoading}
                                        className={`w-full bg-green-500 text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                                            addingToCart[product.productId] || cartLoading
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:bg-green-600 active:transform active:scale-95"
                                        }`}
                                    >
                                        <FaShoppingCart className="text-xs" />
                                        {addingToCart[product.productId] 
                                            ? "Adding..." 
                                            : cartLoading 
                                                ? "Loading..." 
                                                : "Add to Cart"
                                        }
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                    </>
                ) : (
                    /* No Results */
                    <div className="text-center p-12">
                        <div className="flex items-center justify-center mb-6">
                            <FaSearch className="text-gray-300 text-6xl" />
                        </div>
                        <h3 className="text-xl text-gray-600 mb-2">No products found for "{searchTerm}"</h3>
                       
                        <div className="space-x-4">
                            <button 
                                onClick={() => navigate('/home')}
                                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                            >
                                Browse All Products
                            </button>
                            <button 
                                onClick={() => navigate(-1)}
                                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
