
import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Card } from "../../Cards/Card";

const categories = [
    "All Home & Kitchen Products",
    "Dals",
    "Dry Fruits",
    "DMart Grocery",
    "Cooking Oil",
    "Ghee & Vanaspati",
    "Flours & Grains",
    "Rice & Rice Products",
    "Masala & Spices",
    "Salt/Sugar/Jaggery"
];

export const Bakery = () => {
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
                      <button type="button" className="flex items-center px-4 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
                          Type <FaChevronDown className="ml-2" />
                      </button>
                      <button type="button" className="flex items-center  px-4  mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
                          Flavours <FaChevronDown className="ml-2" />
                      </button>
                      <button type="button" className="flex items-center  px-4  mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
                          Properties <FaChevronDown className="ml-2" />
                      </button>
                      <button type="button" className="flex items-center  px-4  mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
                          Dish <FaChevronDown className="ml-2" />
                      </button>
                      <button type="button" className="flex items-center  px-4  mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
                          Packaging <FaChevronDown className="ml-2" />
                      </button>
                      <button type="button" className="flex items-center  px-4  mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-green-600">
                          Availability <FaChevronDown className="ml-2" />
                      </button>
                  </div>
  
  
                  {/* Products Grid (Row 2) */}
                  <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {products.map((product) => (
                          <Card key={product.id} product={product}/>
                      ))}
                  </div>
              </div>
          </div>
      );
  };

