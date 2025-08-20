// import React from 'react';
// import { IoClose } from 'react-icons/io5';
// import { Link } from 'react-router-dom';
// import { useState,useEffect } from "react"

// export const Categories = ({ isOpen, onClose }) => {
//     const [categories, setcategory] = useState();


//     useEffect(() => {
//         async function fetchCategories() {

//                 const response = await fetch("http://localhost:8080/allcategories")
//                 const data=await response.json()
//                 setcategory(data)

//         }
//         fetchCategories
//     })

//     return (
//         <div
//             className={`fixed top-32 left-0 w-full h-full bg-white shadow-lg p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
//                 } transition-transform duration-300 ease-in-out z-30`}
//         >

//             <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
//                 <IoClose className="h-6 w-6" />
//             </button>

//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
//             <ul className="space-y-2">
//                 {categories.map((category) => (
//                     <li key={category}>
//                         <Link
//                             to={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
//                             className="text-lg text-gray-600 hover:text-green-600"
//                         >
//                             {category}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };



// import React, { useState, useEffect } from 'react';
// import { IoClose } from 'react-icons/io5';
// import { Link } from 'react-router-dom';

// export const Categories = ({ isOpen, onClose }) => {
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         async function fetchCategories() {
//             try {
//                 const response = await fetch("http://localhost:8080/allcategories");
                
//                 // const response=await fetch ("http://localhost:5018/api/Category")
//                 const data = await response.json();
//                 setCategories(data);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         }

//         fetchCategories();
//     }, []);

//     return (
//         <div
//             className={`fixed top-32 left-0 w-full h-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
//                 } transition-transform duration-300 ease-in-out z-30`}
//         >
//             <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
//                 <IoClose className="h-6 w-6" />
//             </button>


//             <div className="overflow-x-auto m-8 text-start">
//                 <ul className="flex">
//                     {categories.map((category, index) => (
//                         <li key={index} className="">
//                             <Link
//                                 to={`/category/${category.id}`}
//                                 className="flex flex-col items-center text-lg text-gray-600 hover:text-green-600"
//                             >
//                                 <img
//                                     src={category.image}
//                                     alt={category.name}
//                                     className="w-16 h-16 object-cover rounded-md mb-2"
//                                 />
//                                 <span>{category.name}</span>

//                                 <ul className="mt-2 text-sm text-gray-500 ">
//                                     {category.categories &&
//                                         category.categories.map((subcategory, subIndex) => (
//                                             <li key={subIndex}>{subcategory}</li>
//                                         ))}
//                                 </ul>
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };


//web apis
// Categories.jsx
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Categories = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://localhost:7001/api/Categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div
      className={`fixed top-32 left-0 w-full h-full bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-30`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600"
      >
        <IoClose className="h-6 w-6" />
      </button>

      <div className="overflow-x-auto m-8 text-start">
        <ul className="flex gap-8">
          {categories.map((category) => (
            <li key={category.categoryId}>
              <div className="flex flex-col items-center text-lg text-gray-600">
                {/* Category Image Placeholder */}
                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md mb-2"></div>

                {/* Clicking category name will go to Groceries with categoryId */}
                <Link
                  to={`/groceries?categoryId=${category.categoryId}`}
                  className="font-semibold hover:text-green-600"
                  onClick={onClose}
                >
                  {category.name}
                </Link>

                {/* Subcategories */}
                {Array.isArray(category.subCategories) &&
                category.subCategories.length > 0 ? (
                  <ul className="mt-2 text-sm text-gray-500 list-disc pl-5">
                    {category.subCategories.map((sub) => (
                      <li key={sub.subCategoryId}>
                        <Link
                          to={`/groceries?subcategoryId=${sub.subCategoryId}`}
                          className="hover:text-green-600"
                          onClick={onClose}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-gray-400">
                    No subcategories
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


