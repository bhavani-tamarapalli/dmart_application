// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FiMapPin, FiChevronDown } from "react-icons/fi";
// import { FaCartShopping } from "react-icons/fa6";
// import { GrNotification } from "react-icons/gr";
// import { MdPersonOutline, MdCurrencyRupee } from "react-icons/md";
// import Logo from "../../../src/assets/images/download.png";
// import { Login } from "../../pages/Login";
// import Notification from "../../pages/cart/Notification";
// import DeliveryModal from "../../pages/DeliveryModal";
// import { CartSidebar } from "../../pages/cart/components/CartSidebar";
// import { IoMenu } from "react-icons/io5";
// import { Categories } from "../../navigation";
// import { useCart } from "../../context/CartContext";

// export function Header({ endPointState, setEndPointState }) {
//   const [isCartOpen, setCartOpen] = useState(false);
//   const [isLoginFormVisible, setLoginFormVisible] = useState(false);
//   const [isNotificationOpen, setNotificationOpen] = useState(false);
//   const [isDeliveryOpen, setDeliveryOpen] = useState(false);
//   const [isCategoriesOpen, setCategoriesOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { cartList } = useCart();

//   const handleLoginClick = () => {
//     setLoginFormVisible(true);
//   };

//   const handleCloseForm = () => {
//     setLoginFormVisible(false);
//   };

//   const handleCategoriesToggle = () => {
//     setCategoriesOpen(!isCategoriesOpen);
//   };

//   const handleSearch = async () => {

//     if (!searchQuery.trim()) {

//       console.log("Please enter a product name to search.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/search?product_name=${searchQuery}`);
//       const data = await response.json();

//       if (response.ok) {
//         console.log(data.products, "Search Results:");

//       } else {
//         console.log("error finding product")
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", error);
     
//     }
//   };
//   return (
//     <>
//       <div className="bg-white shadow-md fixed w-full z-20 top-0 start-0">
//         <div className="mx-auto px-4 py-3 flex items-center justify-between">

//           <Link to="/home" className="flex items-center">
//             <img src={Logo} alt="DMart Ready" className="h-16" />
//           </Link>

//           <div
//             className="bg-gray-100 px-3 py-2 rounded-md flex flex-col items-center cursor-pointer"
//             onClick={() => setDeliveryOpen(true)}
//           >
//             <div className="flex items-center gap-1">
//               <FiMapPin className="text-green-600" />
//               <span className="text-sm">400037</span>
//               <FiChevronDown className="text-black-600" />
//             </div>
//             <span className="text-gray-500 text-xs">Mumbai</span>
//           </div>

//           <div className="ml-6 text-sm">
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-500">Earliest</span>
//               <span className="text-green-600 font-medium">Home Delivery</span>
//               <span className="text-gray-500">available</span>
//             </div>
//             <div className="text-gray-600">Today 04:30 PM - 07:30 PM</div>
//           </div>

//           {/* <div className="flex-1 relative mx-9">
//             <input
//               type="text"
//               placeholder="Search for products"
//               className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
//             />
//             <button className="absolute right-0 top-0 h-full px-6 bg-green-500 text-white rounded-r-md hover:bg-green-600">
//               SEARCH
//             </button>
//           </div> */}

//           <div className="flex-1 relative mx-9">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for products"
//               className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
//             />
//             <button
//               onClick={handleSearch}
//               className="absolute right-0 top-0 h-full px-6 bg-green-500 text-white rounded-r-md hover:bg-green-600"
//             >
//               SEARCH
//             </button>
//           </div>


//           <div className="flex items-center ml-10 space-x-6">
//             <button onClick={handleLoginClick} className="text-gray-600 hover:text-green-600 flex items-center gap-1">
//               <MdPersonOutline className="text-green-600 h-6 w-6" />
//               <span className="text-sm">Sign In / Register</span>
//             </button>
//             {isLoginFormVisible && <Login onClose={handleCloseForm} />}

//             <button
//               className="text-gray-600 hover:text-green-600"
//               onClick={() => setNotificationOpen(true)}
//             >
//               <GrNotification className="text-green-600 h-5 w-5" />
//             </button>

//             <button
//               className="relative text-gray-600 hover:text-green-600 flex items-center gap-2"
//               onClick={() => setCartOpen(true)}
//             >
//               <FaCartShopping className="text-green-600 text-2xl" />
//               <span className="absolute -top-2 -left-2.5 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                 {cartList?.length || 0}
//               </span>
//               <div className="flex items-center">
//                 <MdCurrencyRupee className="text-lg" />
//                 <span className="text-sm">0</span>
//               </div>
//             </button>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 bg-gray-50">
//           <div className="max-w-7xl px-4 py-2">
//             <nav className="flex space-x-8">
//               <button
//                 onClick={handleCategoriesToggle}
//                 className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600"
//               >
//                 <IoMenu className="text-lg text-black-900" /> All Categories <FiChevronDown className="w-4 h-4" />
//               </button>
//               <Link onClick={() => setEndPointState('Grocery')} className="text-sm text-gray-600 hover:text-green-600" to="/groceries">Grocery</Link>
//               <Link className="text-sm text-gray-600 hover:text-green-600" to="/fruits">Fruits & Vegetables</Link>
//               <Link className="text-sm text-gray-600 hover:text-green-600" to="/dairy">Dairy</Link>
//               <Link className="text-sm text-gray-600 hover:text-green-600" to="/bakery">Bakery</Link>
//               <Link className="text-sm text-gray-600 hover:text-green-600" to="/snacks">Snacks</Link>
//               <Link className="text-sm text-gray-600 hover:text-green-600" to="/beverages">Beverages</Link>
//             </nav>
//           </div>
//         </div>
//       </div>

//       {isNotificationOpen && <Notification setNotificationOpen={setNotificationOpen} />}
//       {isDeliveryOpen && <DeliveryModal isOpen={isDeliveryOpen} onClose={() => setDeliveryOpen(false)} />}
//       <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

//       <Categories isOpen={isCategoriesOpen} onClose={handleCategoriesToggle} />
//     </>
//   );
// }









// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiMapPin, FiChevronDown } from "react-icons/fi";
// import { FaCartShopping } from "react-icons/fa6";
// import { GrNotification } from "react-icons/gr";
// import { MdPersonOutline, MdCurrencyRupee } from "react-icons/md";
// import { IoMenu } from "react-icons/io5";

// import Logo from "../../../src/assets/images/download.png";
// import { Login } from "../../pages/Login";
// import Notification from "../../pages/cart/Notification";
// import DeliveryModal from "../../pages/DeliveryModal";
// import { CartSidebar } from "../../pages/cart/components/CartSidebar";
// import { Categories } from "../../navigation";
// import { useCart } from "../../context/CartContext";

// export function Header({ endPointState, setEndPointState }) {
//   const [isCartOpen, setCartOpen] = useState(false);
//   const [isLoginFormVisible, setLoginFormVisible] = useState(false);
//   const [isNotificationOpen, setNotificationOpen] = useState(false);
//   const [isDeliveryOpen, setDeliveryOpen] = useState(false);
//   const [isCategoriesOpen, setCategoriesOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const { cartList } = useCart();
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) {
//       console.log("Please enter a product name to search.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/search?product_name=${searchQuery}`);
//       const data = await response.json();

//       if (response.ok) {
//         console.log(data.products, "Search Results:");
//         navigate(`/search?query=${searchQuery}`);
//       } else {
//         console.log("Error finding product");
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <>
//       <div className="bg-white shadow-md fixed w-full z-20 top-0 start-0">
//         <div className="mx-auto px-4 py-3 flex items-center justify-between">
         
//           <Link to="/home" className="flex items-center">
//             <img src={Logo} alt="DMart Ready" className="h-16" />
//           </Link>

//           {/* Delivery Location */}
//           <div
//             className="bg-gray-100 px-3 py-2 rounded-md flex flex-col items-center cursor-pointer"
//             onClick={() => setDeliveryOpen(true)}
//           >
//             <div className="flex items-center gap-1">
//               <FiMapPin className="text-green-600" />
//               <span className="text-sm">400037</span>
//               <FiChevronDown className="text-black-600" />
//             </div>
//             <span className="text-gray-500 text-xs">Mumbai</span>
//           </div>

//           {/* Delivery Info */}
//           <div className="ml-6 text-sm">
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-500">Earliest</span>
//               <span className="text-green-600 font-medium">Home Delivery</span>
//               <span className="text-gray-500">available</span>
//             </div>
//             <div className="text-gray-600">Today 04:30 PM - 07:30 PM</div>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 relative mx-9">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for products"
//               className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
//             />
//             <button
//               onClick={handleSearch}
//               className="absolute right-0 top-0 h-full px-6 bg-green-500 text-white rounded-r-md hover:bg-green-600"
//             >
//               SEARCH
//             </button>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center ml-10 space-x-6">
//             {/* Login/Register */}
//             <button onClick={() => setLoginFormVisible(true)} className="text-gray-600 hover:text-green-600 flex items-center gap-1">
//               <MdPersonOutline className="text-green-600 h-6 w-6" />
//               <span className="text-sm">Sign In / Register</span>
//             </button>
//             {isLoginFormVisible && <Login onClose={() => setLoginFormVisible(false)} />}

//             {/* Notifications */}
//             <button
//               className="text-gray-600 hover:text-green-600"
//               onClick={() => setNotificationOpen(true)}
//             >
//               <GrNotification className="text-green-600 h-5 w-5" />
//             </button>

//             {/* Cart */}
//             <button
//               className="relative text-gray-600 hover:text-green-600 flex items-center gap-2"
//               onClick={() => setCartOpen(true)}
//             >
//               <FaCartShopping className="text-green-600 text-2xl" />
//               <span className="absolute -top-2 -left-2.5 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                 {cartList?.length || 0}
//               </span>
//               <div className="flex items-center">
//                 <MdCurrencyRupee className="text-lg" />
//                 <span className="text-sm">
//                   {/* Update this to show actual cart total */}
//                   0
//                 </span>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Navigation Bar */}
//         <div className="border-t border-gray-200 bg-gray-50">
//           <div className="max-w-7xl px-4 py-2">
//             <nav className="flex space-x-8">
//               <button
//                 onClick={() => setCategoriesOpen(!isCategoriesOpen)}
//                 className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600"
//               >
//                 <IoMenu className="text-lg text-black-900" />
//                 All Categories
//                 <FiChevronDown className="w-4 h-4" />
//               </button>
//               <Link onClick={() => setEndPointState('Grocery')} to="/groceries" className="text-sm text-gray-600 hover:text-green-600">
//                 Grocery
//               </Link>
//               <Link to="/fruits" className="text-sm text-gray-600 hover:text-green-600">Fruits & Vegetables</Link>
//               <Link to="/dairy" className="text-sm text-gray-600 hover:text-green-600">Dairy</Link>
//               <Link to="/bakery" className="text-sm text-gray-600 hover:text-green-600">Bakery</Link>
//               <Link to="/snacks" className="text-sm text-gray-600 hover:text-green-600">Snacks</Link>
//               <Link to="/beverages" className="text-sm text-gray-600 hover:text-green-600">Beverages</Link>
//             </nav>
//           </div>
//         </div>

//       </div>

//       {/* Modals */}
//       {isNotificationOpen && <Notification setNotificationOpen={setNotificationOpen} />}
//       {isDeliveryOpen && <DeliveryModal isOpen={isDeliveryOpen} onClose={() => setDeliveryOpen(false)} />}
//       <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
//       <Categories isOpen={isCategoriesOpen} onClose={() => setCategoriesOpen(false)} />
//     </>
//   );
// }

//web api
// Header.jsx
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiMapPin, FiChevronDown } from "react-icons/fi";
// import { FaCartShopping } from "react-icons/fa6";
// import { GrNotification } from "react-icons/gr";
// import { MdPersonOutline, MdCurrencyRupee } from "react-icons/md";
// import { IoMenu } from "react-icons/io5";
// import Logo from "../../../src/assets/images/download.png";
// import { Login } from "../../pages/Login";
// import Notification from "../../pages/cart/Notification";
// import DeliveryModal from "../../pages/DeliveryModal";
// import { CartSidebar } from "../../pages/cart/components/CartSidebar";
// import { Categories } from "../../navigation";
// import { useCart } from "../../context/CartContext";

// export function Header() {
//   const [isCartOpen, setCartOpen] = useState(false);
//   const [isLoginFormVisible, setLoginFormVisible] = useState(false);
//   const [isNotificationOpen, setNotificationOpen] = useState(false);
//   const [isDeliveryOpen, setDeliveryOpen] = useState(false);
//   const [isCategoriesOpen, setCategoriesOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categories, setCategories] = useState([]);

//   const { cartList } = useCart();
//   const navigate = useNavigate();

//  const cartTotal = cartList ? cartList.reduce((sum, item) => {
//     const price = item.price || item.currentPrice || 0;
//     const quantity = item.quantity || 1;
//     return sum + (price * quantity);
//   }, 0) : 0;

//   useEffect(() => {
//     fetch("https://localhost:7001/api/Categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/groceries?categoryId=${categoryId}`);
//   };

//   return (
//     <>
//       <div className="bg-white shadow-md fixed w-full z-20 top-0 start-0">
//         <div className="mx-auto px-4 py-3 flex items-center justify-between">
//           <Link to="/home" className="flex items-center">
//             <img src={Logo} alt="DMart Ready" className="h-16" />
//           </Link>

//           {/* Delivery */}
//           <div
//             className="bg-gray-100 px-3 py-2 rounded-md flex flex-col items-center cursor-pointer"
//             onClick={() => setDeliveryOpen(true)}
//           >
//             <div className="flex items-center gap-1">
//               <FiMapPin className="text-green-600" />
//               <span className="text-sm">400037</span>
//               <FiChevronDown className="text-black-600" />
//             </div>
//             <span className="text-gray-500 text-xs">Mumbai</span>
//           </div>

//           {/* Search */}
//           <div className="flex-1 relative mx-9">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for products"
//               className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
//             />
//             <button className="absolute right-0 top-0 h-full px-6 bg-green-500 text-white rounded-r-md hover:bg-green-600">
//               SEARCH
//             </button>
//           </div>

//           {/* Right Buttons */}
//           <div className="flex items-center ml-10 space-x-6">
//             <button onClick={() => setLoginFormVisible(true)} className="flex items-center gap-1 text-gray-600 hover:text-green-600">
//               <MdPersonOutline className="text-green-600 h-6 w-6" />
//               <span className="text-sm">Sign In / Register</span>
//             </button>
//             {isLoginFormVisible && <Login onClose={() => setLoginFormVisible(false)} />}

//             <button onClick={() => setNotificationOpen(true)} className="text-gray-600 hover:text-green-600">
//               <GrNotification className="text-green-600 h-5 w-5" />
//             </button>

//             <button
//               className="relative text-gray-600 hover:text-green-600 flex items-center gap-2"
//               onClick={() => setCartOpen(true)}
//             >
//               <FaCartShopping className="text-green-600 text-2xl" />
//               <span className="absolute -top-2 -left-2.5 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                 {cartList?.length || 0}
//               </span>
//               <div className="flex items-center">
//                 <MdCurrencyRupee className="text-lg" />
//                 <span className="text-sm">{cartTotal.toFixed(2)}</span>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Categories Nav */}
//         <div className="border-t border-gray-200 bg-gray-50">
//           <div className="max-w-7xl px-4 py-2">
//             <nav className="flex space-x-8 overflow-x-auto">
//               <button
//                 onClick={() => setCategoriesOpen(!isCategoriesOpen)}
//                 className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600"
//               >
//                 <IoMenu className="text-lg" />
//                 All Categories
//                 <FiChevronDown className="w-4 h-4" />
//               </button>

//               {categories.map((cat) => (
//                 <button
//                   key={cat.categoryId}
//                   onClick={() => handleCategoryClick(cat.categoryId)}
//                   className="text-sm text-gray-600 hover:text-green-600 whitespace-nowrap"
//                 >
//                   {cat.name}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       {isNotificationOpen && <Notification setNotificationOpen={setNotificationOpen} />}
//       {isDeliveryOpen && <DeliveryModal isOpen={isDeliveryOpen} onClose={() => setDeliveryOpen(false)} />}
//       <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
//       <Categories isOpen={isCategoriesOpen} onClose={() => setCategoriesOpen(false)} />
//     </>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMapPin, FiChevronDown } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import { GrNotification } from "react-icons/gr";
import { MdPersonOutline, MdCurrencyRupee } from "react-icons/md";
import { IoMenu, IoSearch } from "react-icons/io5";
import Logo from "../../../src/assets/images/download.png";
import { Login } from "../../pages/Login";
import Notification from "../../pages/cart/Notification";
import DeliveryModal from "../../pages/DeliveryModal";
import { CartSidebar } from "../../pages/cart/components/CartSidebar";
import { Categories } from "../../navigation";
import { useCart } from "../../context/CartContext";

export const Header=()=> {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isDeliveryOpen, setDeliveryOpen] = useState(false);
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const { cartList } = useCart();
  const navigate = useNavigate();

  const cartTotal = cartList ? cartList.reduce((sum, item) => {
    const price = item.price || item.currentPrice || 0;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0) : 0;

  // Fetch categories
  useEffect(() => {
    fetch("https://localhost:7001/api/Categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  //search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() && searchQuery.length >= 2) {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchSuggestions = async (query) => {
    try {
      setLoadingSuggestions(true);
      const response = await fetch(
        `https://localhost:7001/api/Search/suggestions?query=${encodeURIComponent(query)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSearch = (searchTerm = searchQuery) => {
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/groceries?categoryId=${categoryId}`);
  };

  return (
    <>
      <div className="bg-white shadow-md fixed w-full z-20 top-0 start-0">
        <div className="mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/home" className="flex items-center">
            <img src={Logo} alt="DMart Ready" className="h-16" />
          </Link>

          {/* Delivery */}
          <div
            className="bg-gray-100 px-3 py-2 rounded-md flex flex-col items-center cursor-pointer"
            onClick={() => setDeliveryOpen(true)}
          >
            <div className="flex items-center gap-1">
              <FiMapPin className="text-green-600" />
              <span className="text-sm">400037</span>
              <FiChevronDown className="text-black-600" />
            </div>
            <span className="text-gray-500 text-xs">Mumbai</span>
          </div>

          {/* Search with Suggestions */}
          <div className="flex-1 relative mx-9">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                placeholder="Search for products"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button 
                onClick={() => handleSearch()}
                className="absolute right-0 top-0 h-full px-6 bg-green-500 text-white rounded-r-md hover:bg-green-600 transition-colors flex items-center"
              >
                <IoSearch className="mr-1" />
                SEARCH
              </button>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (suggestions.length > 0 || loadingSuggestions) && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-30 max-h-60 overflow-y-auto"
              >
                {loadingSuggestions ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-green-500 mr-2"></div>
                    Loading suggestions...
                  </div>
                ) : (
                  suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
                    >
                      <div className="flex items-center">
                        <IoSearch className="text-gray-400 mr-3" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center ml-10 space-x-6">
            <button 
              onClick={() => setLoginFormVisible(true)} 
              className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors"
            >
              <MdPersonOutline className="text-green-600 h-6 w-6" />
              <span className="text-sm">Sign In / Register</span>
            </button>
            {isLoginFormVisible && <Login onClose={() => setLoginFormVisible(false)} />}

            <button 
              onClick={() => setNotificationOpen(true)} 
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              <GrNotification className="text-green-600 h-5 w-5" />
            </button>

            <button
              className="relative text-gray-600 hover:text-green-600 flex items-center gap-2 transition-colors"
              onClick={() => setCartOpen(true)}
            >
              <FaCartShopping className="text-green-600 text-2xl" />
              {cartList?.length > 0 && (
                <span className="absolute -top-2 -left-2.5 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartList.length}
                </span>
              )}
              <div className="flex items-center">
                <MdCurrencyRupee className="text-lg" />
                <span className="text-sm">{cartTotal.toFixed(2)}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Categories Nav */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl px-4 py-2">
            <nav className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                <IoMenu className="text-lg" />
                All Categories
                <FiChevronDown className="w-4 h-4" />
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.categoryId}
                  onClick={() => handleCategoryClick(cat.categoryId)}
                  className="text-sm text-gray-600 hover:text-green-600 whitespace-nowrap transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isNotificationOpen && <Notification setNotificationOpen={setNotificationOpen} />}
      {isDeliveryOpen && <DeliveryModal isOpen={isDeliveryOpen} onClose={() => setDeliveryOpen(false)} />}
      <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      <Categories isOpen={isCategoriesOpen} onClose={() => setCategoriesOpen(false)} />
    </>
  );
}

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiMapPin, FiChevronDown } from "react-icons/fi";
// import { FaCartShopping } from "react-icons/fa6";
// import { GrNotification } from "react-icons/gr";
// import { MdPersonOutline, MdCurrencyRupee } from "react-icons/md";
// import { IoMenu } from "react-icons/io5";

// import Logo from "../../../src/assets/images/download.png";
// import { Login } from "../../pages/Login";
// import Notification from "../../pages/cart/Notification";
// import DeliveryModal from "../../pages/DeliveryModal";
// import { CartSidebar } from "../../pages/cart/components/CartSidebar";
// import { Categories } from "../../navigation";
// import { useCart } from "../../context/CartContext";

// export function Header({ setEndPointState }) {
//   const [isCartOpen, setCartOpen] = useState(false);
//   const [isLoginFormVisible, setLoginFormVisible] = useState(false);
//   const [isNotificationOpen, setNotificationOpen] = useState(false);
//   const [isDeliveryOpen, setDeliveryOpen] = useState(false);
//   const [isCategoriesOpen, setCategoriesOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categories, setCategories] = useState([]);

//   const { cartList } = useCart();
//   const navigate = useNavigate();

//   // Fetch categories for nav bar
//   useEffect(() => {
//     fetch("https://localhost:7001/api/Categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return;
//     try {
//       const response = await fetch(`http://localhost:5000/search?product_name=${searchQuery}`);
//       const data = await response.json();
//       if (response.ok) {
//         navigate(`/search?query=${searchQuery}`);
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   const handleCategoryClick = (category) => {
//     setEndPointState(category.name);
//     navigate(`/category/${category.categoryId}`);
//   };

//   return (
//     <>
//       <div className="bg-white shadow-md fixed w-full z-20 top-0 start-0">
//         <div className="mx-auto px-4 py-3 flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/home" className="flex items-center">
//             <img src={Logo} alt="DMart Ready" className="h-16" />
//           </Link>

//           {/* Delivery Location */}
//           <div
//             className="bg-gray-100 px-3 py-2 rounded-md flex flex-col items-center cursor-pointer"
//             onClick={() => setDeliveryOpen(true)}
//           >
//             <div className="flex items-center gap-1">
//               <FiMapPin className="text-green-600" />
//               <span className="text-sm">400037</span>
//               <FiChevronDown className="text-black-600" />
//             </div>
//             <span className="text-gray-500 text-xs">Mumbai</span>
//           </div>

//           {/* Delivery Info */}
//           <div className="ml-6 text-sm">
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-500">Earliest</span>
//               <span className="text-green-600 font-medium">Home Delivery</span>
//               <span className="text-gray-500">available</span>
//             </div>
//             <div className="text-gray-600">Today 04:30 PM - 07:30 PM</div>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 relative mx-9">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for products"
//               className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
//             />
//             <button
//               onClick={handleSearch}
//               className="absolute right-0 top-0 h-full px-6 bg-green-500 text-white rounded-r-md hover:bg-green-600"
//             >
//               SEARCH
//             </button>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center ml-10 space-x-6">
//             {/* Login/Register */}
//             <button onClick={() => setLoginFormVisible(true)} className="text-gray-600 hover:text-green-600 flex items-center gap-1">
//               <MdPersonOutline className="text-green-600 h-6 w-6" />
//               <span className="text-sm">Sign In / Register</span>
//             </button>
//             {isLoginFormVisible && <Login onClose={() => setLoginFormVisible(false)} />}

//             {/* Notifications */}
//             <button
//               className="text-gray-600 hover:text-green-600"
//               onClick={() => setNotificationOpen(true)}
//             >
//               <GrNotification className="text-green-600 h-5 w-5" />
//             </button>

//             {/* Cart */}
//             <button
//               className="relative text-gray-600 hover:text-green-600 flex items-center gap-2"
//               onClick={() => setCartOpen(true)}
//             >
//               <FaCartShopping className="text-green-600 text-2xl" />
//               <span className="absolute -top-2 -left-2.5 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                 {cartList?.length || 0}
//               </span>
//               <div className="flex items-center">
//                 <MdCurrencyRupee className="text-lg" />
//                 <span className="text-sm">0</span>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Navigation Bar */}
//         <div className="border-t border-gray-200 bg-gray-50">
//           <div className="max-w-7xl px-4 py-2">
//             <nav className="flex space-x-8">
//               <button
//                 onClick={() => setCategoriesOpen(!isCategoriesOpen)}
//                 className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600"
//               >
//                 <IoMenu className="text-lg text-black-900" />
//                 All Categories
//                 <FiChevronDown className="w-4 h-4" />
//               </button>

//               {categories.map((cat) => (
//                 <button
//                   key={cat.categoryId}
//                   onClick={() => handleCategoryClick(cat)}
//                   className="text-sm text-gray-600 hover:text-green-600"
//                 >
//                   {cat.name}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       {isNotificationOpen && <Notification setNotificationOpen={setNotificationOpen} />}
//       {isDeliveryOpen && <DeliveryModal isOpen={isDeliveryOpen} onClose={() => setDeliveryOpen(false)} />}
//       <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
//       <Categories isOpen={isCategoriesOpen} onClose={() => setCategoriesOpen(false)} />
//     </>
//   );
// }




















// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FiMapPin, FiChevronDown } from 'react-icons/fi';
// import { FaCartShopping } from 'react-icons/fa6';
// import { GrNotification } from 'react-icons/gr';
// import { MdPersonOutline, MdCurrencyRupee } from 'react-icons/md';
// import Logo from '../../../src/assets/images/download.png';
// import { Login } from '../../pages/Login';
// import Notification from '../../pages/cart/Notification';
// import DeliveryModal from '../../pages/DeliveryModal';
// import { CartSidebar } from '../../pages/cart/components/CartSidebar';
// import { IoMenu } from 'react-icons/io5';
// import { Categories } from '../../navigation';


// export function Header() {
//     const [isCartOpen, setCartOpen] = useState(false);
//     const [isLoginFormVisible, setLoginFormVisible] = useState(false);
//     const [isNotificationOpen, setNotificationOpen] = useState(false);
//     const [isDeliveryOpen, setDeliveryOpen] = useState(false);
//     const [isCategoriesSidebarOpen, setCategoriesSidebarOpen] = useState(false);

//     const handleLoginClick = () => {
//         setLoginFormVisible(true);
//     };

//     const handleCloseForm = () => {
//         setLoginFormVisible(false);
//     };

//     const handleCategoriesClick = () => {
//         setCategoriesSidebarOpen(true);
//     };

//     return (
//         <>
//             <div className="bg-white shadow-md fixed w-full z-20 top-0 start-0">
//                 <div className="mx-auto px-4 py-3 flex items-center justify-between">
//                     <Link to="/home" className="flex items-center">
//                         <img src={Logo} alt="DMart Ready" className="h-16" />
//                     </Link>

//                     <div
//                         className="bg-gray-100 px-3 py-2 rounded-md flex flex-col items-center cursor-pointer"
//                         onClick={() => setDeliveryOpen(true)}
//                     >
//                         <div className="flex items-center gap-1">
//                             <FiMapPin className="text-green-600" />
//                             <span className="text-sm">400037</span>
//                             <FiChevronDown className="text-black-600" />
//                         </div>
//                         <span className="text-gray-500 text-xs">Mumbai</span>
//                     </div>

//                     <div className="ml-6 text-sm">
//                         <div className="flex items-center space-x-2">
//                             <span className="text-gray-500">Earliest</span>
//                             <span className="text-green-600 font-medium">Home Delivery</span>
//                             <span className="text-gray-500">available</span>
//                         </div>
//                         <div className="text-gray-600">Today 04:30 PM - 07:30 PM</div>
//                     </div>

//                     <div className="flex-1 relative mx-9">
//                         <input
//                             type="text"
//                             placeholder="Search for products"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
//                         />
//                         <button className="absolute right-0 top-0 h-full px-6 bg-green-500 text-white rounded-r-md hover:bg-green-600">
//                             SEARCH
//                         </button>
//                     </div>

//                     <div className="flex items-center ml-10 space-x-6">
//                         <button onClick={handleLoginClick} className="text-gray-600 hover:text-green-600 flex items-center gap-1">
//                             <MdPersonOutline className="text-green-600 h-6 w-6" />
//                             <span className="text-sm">Sign In / Register</span>
//                         </button>
//                         {isLoginFormVisible && <Login onClose={handleCloseForm} />}

//                         <button
//                             className="text-gray-600 hover:text-green-600"
//                             onClick={() => setNotificationOpen(true)}
//                         >
//                             <GrNotification className="text-green-600 h-5 w-5" />
//                         </button>

//                         <button
//                             className="relative text-gray-600 hover:text-green-600 flex items-center gap-2"
//                             onClick={() => setCartOpen(true)}
//                         >
//                             <FaCartShopping className="text-green-600 text-2xl" />
//                             <span className="absolute -top-2 -left-2.5 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                                 0
//                             </span>
//                             <div className="flex items-center">
//                                 <MdCurrencyRupee className="text-lg" />
//                                 <span className="text-sm">0</span>
//                             </div>
//                         </button>


//                     </div>
//                 </div>

//                 <div className="border-t border-gray-200 bg-gray-50">
//                     <div className="max-w-7xl px-4 py-2">
//                         <nav className="flex space-x-8">
//                             <Link onClick={handleCategoriesClick} className="text-sm text-gray-600 hover:text-green-600 flex" to="/categories">
//                                 <IoMenu className="text-black-900" /> All Categories
//                             </Link>
//                             <Link className="text-sm text-gray-600 hover:text-green-600" to="/groceries">Grocery</Link>
//                             <Link className="text-sm text-gray-600 hover:text-green-600" to="/fruits">Fruits & Vegetables</Link>
//                             <Link className="text-sm text-gray-600 hover:text-green-600" to="/dairy">Dairy</Link>
//                             <Link className="text-sm text-gray-600 hover:text-green-600" to="/bakery">Bakery</Link>
//                             <Link className="text-sm text-gray-600 hover:text-green-600" to="/snacks">Snacks</Link>
//                             <Link className="text-sm text-gray-600 hover:text-green-600" to="/beverages">Beverages</Link>
//                         </nav>
//                     </div>
//                 </div>
//             </div>

//             {isNotificationOpen && <Notification setNotificationOpen={setNotificationOpen} />}
//             {isDeliveryOpen && <DeliveryModal isOpen={isDeliveryOpen} onClose={() => setDeliveryOpen(false)} />}
//             <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

//             {/* Categories Sidebar */}
//             <Categories
//                 isOpen={isCategoriesSidebarOpen}
//                 onClose={() => setCategoriesSidebarOpen(false)}
//             />
//         </>
//     );
// }
