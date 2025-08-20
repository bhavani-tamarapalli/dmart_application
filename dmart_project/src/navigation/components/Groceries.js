

//react code 

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaChevronDown } from "react-icons/fa6";
// import { Card } from "../../Cards/Card";
// import { useParams } from "react-router-dom";

// const categories = [];

// export const Groceries = ({ endPointState, setEndPointState }) => {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState();
//   const [productImage, setProductImage] = useState();
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([])
//   const { category_name } = useParams()


//   const navigate = useNavigate();

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
//     async function fetchCategories() {

//       try {
//         const response = await fetch('http://localhost:5000/categories');
//         if (!response.ok) {
//           // console.log("entered into categoriesssssssssssssssssss")
//         }
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         console.error("error fetching the data")
//       }
//     }

//     fetchCategories();
//   }, []);


//   useEffect(() => {
//     if (!endPointState) return;

//     async function fetchSubcategories() {

//       //  console.log(endPointState, "endpointstate....");

//       try {
//         const response = await fetch(`http://localhost:5000/Subcategory/${endPointState}`);


//         if (!response.ok) {
//           throw new Error("Failed to fetch subcategories");

//         }
//         const data = await response.json();
//         // console.log(data, "---------------pppppppppppppppps");

//         setSubcategories(data);
//       } catch (error) {
//         console.error("error")
//       }

//     }

//     fetchSubcategories();
//   }, [endPointState]);

//   useEffect(() => {
//     async function fetchProducts() {
//       // console.log(endPointState, "endpointstate....");

//       if (endPointState === "Grocery") {
//         // console.log("entered...");

//         const response = await fetch(`http://localhost:5000/product/category/${endPointState}`);
//         const data = await response.json();

//         console.log(data,"dataaaaaaaaaaaaaaaa")
//         // console.log(data.products, "products data");

//         try {
//           const images = data.products.map(product => {
//             const byteArray = new Uint8Array(product.image_data.data);
//             const base64String = arrayBufferToBase64(byteArray);
//             const base64Image = `data:image/jpg;base64,${base64String}`;
//             // console.log(base64Image);
//             return base64Image;
//           });
//           setProducts(data.products);
//           setProductImage(images);

//         } catch (error) {
//           console.error('Error fetching products Images:', error);
//         }

//       } else {
//         console.log("at else block");
//         const response = await fetch(`http://localhost:5000/product/category/${endPointState}`);
//         const data = await response.json();
//         setProducts(data);
//       }
//     }

//     fetchProducts();
//   }, [endPointState]);



//   // // Fetching data for grocery list
//   // useEffect(() => {
//   //   async function fetchProducts() {
//   //     // console.log(endPointState,"endpointstate....")
//   //     if (endPointState == "Grocery") {
//   //       // console.log("entered...");
//   //       const response = await fetch(`http://localhost:5000/product/category/${endPointState}`);

//   //       // console.log(response, "mmmmmmmmmmmmmm");
//   //       const data = await response.json();
//   //       console.log(data, "mmmm----------")
//   //       // console.log(data[0].product_image.data, "mmmmmmmmmmmmmm");
//   //       try {
//   //         const byteArray = new Uint8Array(data[0].product_image.data);
//   //         //   console.log(byteArray,"bytearray")
//   //         const base64String = arrayBufferToBase64(byteArray);
//   //         // console.log(base64String, "stringhghghghg-------");

//   //         //  const base64Image = `data:image/webp;base64,${base64String}`;
//   //         const base64Image = `data:image/jpg;base64,${base64String}`;

//   //         console.log(base64Image, "base64")

//   //       } catch (error) {
//   //         console.error('Error fetching products Images:', error);
//   //       }

//   //     } else {
//   //       console.log("at else block")
//   //       const response = await fetch(`http://localhost:5000/product/category/${endPointState}`);
//   //       const data = await response.json();
//   //       setProducts(data);
//   //     }

//   //   }

//   //   fetchProducts();
//   // }, [endPointState]);


//   const handleProduct = (product) => {
//     navigate(`/product/${product.product_id}`);
//   };


//   return (
//     <div className="flex flex-col lg:flex-row mt-14 gap-6 px-4 mt-32">

//       <div className="w-full lg:w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">

//         {subcategories.length > 0 ? (
//           subcategories.map((subcategory, index) => (
//             <div key={index} className={`py-3 px-4 cursor-pointer border-b text-sm font-medium ${selectedCategory ===  subcategory.Subcategory_name ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'}`}
//             onClick={()=> setSubcategories(subcategory.Subcategory_name)}>
//               {subcategory.Subcategory_name}
//             </div>
//           ))
//         ) : (
//           <p>No categories available</p>
//         )}
//       </div>

     
//       <div className="">
//         <div className="flex flex-wrap gap-4 mb-6 my-4">
//           <button type="button" className="flex items-center px-4 py-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
//             Brand <FaChevronDown className="ml-2" />
//           </button>
//           <button type="button" className="flex items-center px-4 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
//             Category <FaChevronDown className="ml-2" />
//           </button>
//           <button type="button" className="flex items-center px-4 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
//             Type <FaChevronDown className="ml-2" />
//           </button>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {products.map((product, index) => (
//             <div key={product.product_id} onClick={() => handleProduct(product)}>
//               <Card product={product} image={productImage[index]} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


//csharp web apis
// import { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FaChevronDown } from "react-icons/fa6";
// import { Card } from "../../Cards/Card";

// export const Groceries = ({ endPointState, setEndPointState }) => {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [productImage, setProductImage] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const { category_name } = useParams();
//   const navigate = useNavigate();

//   // Convert byte array to base64 image
//   const arrayBufferToBase64 = (buffer) => {
//     let binary = "";
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   // Fetch categories from backend
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch("https://localhost:7001/api/Categories");
//         if (!response.ok) throw new Error("Failed to fetch categories");
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     }
//     fetchCategories();
//   }, []);

//   // Fetch subcategories from backend
//   useEffect(() => {
//     async function fetchSubcategories() {
//       try {
//         const response = await fetch("https://localhost:7001/api/SubCategories");
//         if (!response.ok) throw new Error("Failed to fetch subcategories");
//         const data = await response.json();
//         setSubcategories(data);
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       }
//     }
//     fetchSubcategories();
//   }, []);

//   // Fetch products based on selected category
//   useEffect(() => {
//     if (!selectedCategory) return;
//     async function fetchProducts() {
//       try {
//         const response = await fetch(
//           `https://localhost:7001/api/Product/SubCategory/${selectedCategory}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch products");
//         const data = await response.json();

//         const images = data.map((product) => {
//           if (product.image && product.image.data) {
//             const byteArray = new Uint8Array(product.image.data);
//             const base64String = arrayBufferToBase64(byteArray);
//             return `data:image/jpg;base64,${base64String}`;
//           }
//           return null;
//         });

//         setProducts(data);
//         setProductImage(images);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     }
//     fetchProducts();
//   }, [selectedCategory]);

//   const handleProductClick = (product) => {
//     navigate(`/product/${product.productId}`);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row mt-14 gap-6 px-4 mt-32">
//       {/* Sidebar with subcategories */}
//       <div className="w-full lg:w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
//         {subcategories.length > 0 ? (
//           subcategories.map((subcategory) => (
//             <div
//               key={subcategory.subCategoryId}
//               className={`py-3 px-4 cursor-pointer border-b text-sm font-medium ${
//                 selectedCategory === subcategory.subCategoryId
//                   ? "text-green-600 font-bold"
//                   : "text-gray-700 hover:text-green-600"
//               }`}
//               onClick={() => setSelectedCategory(subcategory.subCategoryId)}
//             >
//               {subcategory.name}
//             </div>
//           ))
//         ) : (
//           <p>No subcategories available</p>
//         )}
//       </div>

//       {/* Products grid */}
//       <div className="flex-1">
//         <div className="flex flex-wrap gap-4 mb-6 my-4">
//           <button className="flex items-center px-4 py-2 mb-2 text-sm font-medium bg-white rounded-full border border-green-600">
//             Brand <FaChevronDown className="ml-2" />
//           </button>
//           <button className="flex items-center px-4 mb-2 text-sm font-medium bg-white rounded-full border border-green-600">
//             Category <FaChevronDown className="ml-2" />
//           </button>
//           <button className="flex items-center px-4 mb-2 text-sm font-medium bg-white rounded-full border border-green-600">
//             Type <FaChevronDown className="ml-2" />
//           </button>
//         </div>

//         <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {products.map((product, index) => (
//             <div key={product.productId} onClick={() => handleProductClick(product)}>
//               <Card product={product} image={productImage[index]} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


//csharp web apis
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { Card } from "../../Cards/Card";

export const Groceries = () => {
  const [products, setProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [productImage, setProductImage] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("categoryId");
  const subcategoryId = queryParams.get("subcategoryId");

  // Convert byte array to base64 image
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Fetch subcategories for the selected category
  useEffect(() => {
    if (!categoryId) return;
    async function fetchSubcategories() {
      try {
        const response = await fetch(`https://localhost:7001/api/Product/subcategories/${categoryId}`);
        if (!response.ok) throw new Error("Failed to fetch subcategories");
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
    fetchSubcategories();
  }, [categoryId]);

  // Fetch products based on category or subcategory
  useEffect(() => {
    async function fetchProducts() {
      try {
        let url = "";
        if (subcategoryId || selectedSubCategory) {
          const subId = subcategoryId || selectedSubCategory;
          url = `https://localhost:7001/api/Product/bySubCategory/${subId}`;
        } else if (categoryId) {
          url = `https://localhost:7001/api/Product/byCategory/${categoryId}`;
        } else {
          url = `https://localhost:7001/api/Product`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        // Handle image conversion
        const images = data.map((product) => {
          if (product.image && product.image.data) {
            const byteArray = new Uint8Array(product.image.data);
            const base64String = arrayBufferToBase64(byteArray);
            return `data:image/jpg;base64,${base64String}`;
          }
          return null;
        });

        setProducts(data);
        setProductImage(images);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [categoryId, subcategoryId, selectedSubCategory]);

  const handleSubcategoryClick = (subCatId) => {
    setSelectedSubCategory(subCatId);
    navigate(`/groceries?subcategoryId=${subCatId}`);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.productId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row mt-32 gap-6 px-4">
      {/* Sidebar with subcategories */}
      <div className="w-full lg:w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <div
              key={subcategory.subCategoryId}
              className={`py-3 px-4 cursor-pointer border-b text-sm font-medium ${
                selectedSubCategory === subcategory.subCategoryId
                  ? "text-green-600 font-bold"
                  : "text-gray-700 hover:text-green-600"
              }`}
              onClick={() => handleSubcategoryClick(subcategory.subCategoryId)}
            >
              {subcategory.name}
            </div>
          ))
        ) : (
          <p>No subcategories available</p>
        )}
      </div>

      {/* Products section */}
      <div className="flex-1">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 my-4">
          <button className="flex items-center px-4 py-2 mb-2 text-sm font-medium bg-white rounded-full border border-green-600">
            Brand <FaChevronDown className="ml-2" />
          </button>
          <button className="flex items-center px-4 mb-2 text-sm font-medium bg-white rounded-full border border-green-600">
            Category <FaChevronDown className="ml-2" />
          </button>
          <button className="flex items-center px-4 mb-2 text-sm font-medium bg-white rounded-full border border-green-600">
            Type <FaChevronDown className="ml-2" />
          </button>
        </div>

        {/* Products grid */}
        <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div key={product.productId} onClick={() => handleProductClick(product)}>
              <Card product={product} image={productImage[index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
