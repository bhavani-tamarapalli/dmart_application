// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import book from "../../../assets/images/5-club.jpg"
// export const BooksCard = () => {

//     const [books, setBooks] = useState([])

//     useEffect(() => {
//         async function launchedBooks() {
//             const response = await fetch("http://localhost:8080/books")
//             const data = await response.json()
//             setBooks(data)
//         }
//         launchedBooks()
//     })

//     return (

//             <Link to="/" className="block bg-[#def8ff] border border-gray-200 rounded-lg m-6">
//                 <div className="m-4 ">
//                     <p className="mb-2 font-bold ">Just Launched Books</p>

//                     {/* <div className="grid gap-4 text-center">

//                         <div className="grid grid-cols-12 gap-4 my-4">

//                             {books.map((book) => (
//                                 <div key={book.id}>
//                                     <img className="h-28 w-28 rounded-lg" src={book.image} alt="" />
//                                     <p className="py-4">{book.title}</p> 

//                                 </div>
//                             ))}
//                         </div>
//                     </div> */}





// <div id="default-carousel" class="relative " data-carousel="slide">

//     <div class="relative h-56 overflow-hidden rounded-lg md:h-96">

//         <div class="duration-700 ease-in-out" data-carousel-item>
//         <div className=" bg-white w-80 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
//         <Link to="/">
//           <img className="rounded-t-lg w-52 text-center" src={book} alt="" />

//           <div className="p-5 ">

//             <p className="mb-2 font-bold dark:text-white">The Art of War Spirituality For Conflict By Sun Tzu : 1 Unit</p>

//             <div className="flex  mt-2 place-content-between grid grid-cols-3">
//               <div >
//                 <p className="text-gray-300">MRP</p>
//                 <span className=" text-green-600">₹61.00</span>
//               </div>

//               <div>
//                 <p className="text-gray-300">DMart</p>
//                 <span className="text-gray-500 line-through ">₹100.00</span>
//               </div>

//               <span className=" bg-green-100 text-green-600 text-sm px-2 py-1 rounded">
//                 39% OFF
//               </span>

//             </div>
//             <div>
//               <p className="text-gray-500 text-left">(Inclusive of all taxes)</p>
//             </div>
//           </div>

//         </Link>
//       </div>

//         </div>


//     </div>



//     <button type="button" class="absolute top-0 start-0 z-30 flex  items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
//         <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//             <svg class="w-4 h-4 text-dark dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
//             </svg>
//             <span class="sr-only">Previous</span>
//         </span>
//     </button>
//     <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
//         <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//             <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
//             </svg>
//             <span class="sr-only">Next</span>
//         </span>
//     </button>
// </div>

//                 </div>

//             </Link>

//     )
// }


// // import { Link } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // // import Test from '../../../../src/assets/images/logo.webp'
// // export const BooksCard = () => {
// //     const [items, setItems] = useState([]);
// //     const [value, setValue] = useState(0);


// //     useEffect(() => {
// //         async function foodItems() {
// //             const response = await fetch("http://localhost:8080/books");
// //             const data = await response.json()
// //             setItems(data);
// //         }
// //         foodItems();
// //     }, [])
// //     console.log(items, "data")

// //     function handleNext() {
// //         setValue((prev) => prev + 80)
// //     }

// //     function handlePrev() {
// //         setValue((prev) => prev - 80)
// //     }

// //     return (
// //         <div className="w-[75%] mx-auto mt-3 overflow-hidden  ">
// //             <div className="flex  justify-between mt-3">
// //                 <h1 className="text-2xl font-bold">Top restaurant chains in Vizag</h1>

// //                 <div className="flex gap-3">
// //                     <div onClick={handlePrev} className={`bg-gray-200 cursor-pointer rounded-full w-8 h-8 flex justify-center items-center`}>
// //                         <i className=" text-2xl bi bi-arrow-left-short"></i>
// //                     </div>
// //                     <div onClick={handleNext} className="bg-gray-200 cursor-pointer rounded-full w-8 h-8 flex justify-center items-center">
// //                         <i className="text-2xl bi bi-arrow-right-short"></i>
// //                     </div>
// //                 </div>
// //             </div>


// //             <div className=" flex gap-5 rounded-lg">
// //                 {items.map((item) => (
// //                     <div style={{translate : `-${value}%` }} className={` duration-1000`} key={item.id}>
// //                         <div className="hover:scale-95 duration-300 max-w-sm bg-white mt-5 dark:bg-gray-800 dark:border-gray-700" style={{ width: "265px" }}  >
// //                             <Link to="#" >
// //                                 <img className="rounded-2xl object-cover" src={item.image} alt="" style={{ width: "300px", height: "200px" }} />
// //                             </Link>
// //                             <div className="mt-3 ps-0 pr-20">
// //                                 <Link to="#">
// //                                     <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h5>
// //                                     <div className="flex gap-1 pl-5">
// //                                         <i className="fi fi-sr-circle-star text-green-600"></i>
// //                                         <span>{item.rating}</span>
// //                                         <span>.</span>
// //                                         <span>{item.time}</span>
// //                                     </div>
// //                                     <div className="flex flex-col text-gray-800">
// //                                         <span>{item.type}</span>
// //                                         <span>{item.place}</span>
// //                                     </div>
// //                                 </Link>

// //                             </div>
// //                         </div>
// //                     </div>
// //                 ))}

// //             </div>

// //             <hr className="mt-10 mb-10 width-2px"></hr>
// //         </div>
// //     )
// // }


// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"

// export const BooksCard = () => {

//     const [books, setBooks] = useState([])

//     useEffect(() => {
//         async function launchedBooks() {
//             const response = await fetch("http://localhost:8080/books")
//             const data = await response.json()
//             setBooks(data)
//         }
//         launchedBooks()
//     })

//   return (
//     <div className="bg-blue-100 p-4 rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Just Launched Books</h2>
//         <a href="#" className="text-blue-600 font-medium hover:underline">View All</a>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//         {books.map((book) => (
//           <div
//             key={book.id}
//             className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
//           >
//             <img
//               src={book.image}
//               alt={book.title}
//               className="w-full h-40 object-contain mb-3"
//             />
//             <h3 className="text-sm font-medium mb-1">{book.title}</h3>
//             <p className="text-xs text-gray-500">By {book.author}</p>
//             <div className="text-sm font-semibold mt-2">
//               <p className="line-through text-gray-400 text-xs">MRP ₹{book.mrp}</p>
//               <p className="text-green-600">DMart ₹{book.dmartPrice}</p>
//             </div>
//             <p className="text-xs text-green-700 font-medium bg-green-100 px-2 py-1 w-fit rounded">
//               ₹{book.discount} OFF
//             </p>
//             <select className="w-full mt-2 p-2 border rounded">
//               <option>1 Unit</option>
//             </select>
//             <button className="w-full bg-green-600 text-white mt-3 py-2 rounded font-medium flex items-center justify-center hover:bg-green-700">
//               🛒 ADD TO CART
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";

// export const BooksCard = () => {
//   const [books, setBooks] = useState([]);
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     async function launchedBooks() {
//       const response = await fetch("http://localhost:8080/books");
//       const data = await response.json();
//       setBooks(data);
//     }
//     launchedBooks();
//   }, []);

//   const scrollLeft = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth / 6.5, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth / 6.5, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="block bg-[#def8ff] border border-gray-200 rounded-lg m-6 p-4 rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Just Launched Books</h2>
//         <Link to="/" className="text-blue-600 font-medium hover:underline">View All</Link>
//       </div>
//       <div className="relative">
//         <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md z-10">&#8249;</button>
//         <div ref={carouselRef} className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth snap-x snap-mandatory no-scrollbar">
//           {/* {books.map((book) => (
//             <Link to
//               key={book.id}
//               className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all min-w-[calc(100%/6.5)] snap-start"
//             >
//               <img
//                 src={book.image}
//                 alt={book.title}
//                 className="w-full h-40 object-contain mb-3 hover:scale-95  duration-300"
//               />
//               <h3 className="text-sm font-sm mb-1">{book.title} {book.author}:{book.unit} </h3>

//               <div className="text-sm  my-4 grid grid-cols-3">
//                 <div className=" text-gray-400 text-xs ">
//                   <p >MRP </p>
//                   <p className="line-through">₹{book.price}</p>
//                 </div>
//                 <div >
//                   <p className="text-black-100">DMart </p>
//                   <p>₹{book.dmartPrice}</p>
//                 </div>
//                 <p className="text-xl text-green-700 font-medium bg-green-100 px-2 py-1 w-fit rounded">
//                   ₹{book.discount}
//                   <p className="text-xs">OFF</p>
//                 </p>
//               </div>


//               <select className="w-full mt-2 p-2 border rounded">
//                 <option className="bg-gray-500">{book.unit}</option>
//               </select>
//               <button className="w-full bg-green-600 text-white mt-3 py-2 rounded font-medium flex items-center justify-center hover:bg-green-700">
//                 ADD TO CART
//               </button>
//             </Link>
//           ))} */}

//           {books.map((book) => (
//             <Link
//               to
//               key={book.id}
//               className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all  flex flex-col justify-between h-full  min-w-[calc(100%/6.5)] "
//             >
//               <img
//                 src={book.image}
//                 alt={book.title}
//                 className="w-full h-36 object-contain mb-3 hover:scale-95 duration-300"
//               />
//               <h3 className="text-sm mb-2">{book.title} {book.author}: {book.unit}</h3>

//               <div className="text-sm my-4 grid grid-cols-3">
//                 <div className="text-gray-400 text-xs">
//                   <p>MRP</p>
//                   <p className="line-through">₹{book.price}</p>
//                 </div>
//                 <div>
//                   <p className="text-black-100">DMart</p>
//                   <p>₹{book.dmartPrice}</p>
//                 </div>
//                 <p className="text-xl text-green-700 font-medium bg-green-100 px-2 py-1 w-fit rounded">
//                   ₹{book.discount}
//                   <p className="text-xs">OFF</p>
//                 </p>
//               </div>

//               <select className="w-full mt-2 p-2 border rounded">
//                 <option className="bg-gray-500">{book.unit}</option>
//               </select>
//               <button className="w-full bg-green-600 text-white mt-3 py-2 rounded font-medium flex items-center justify-center hover:bg-green-700">
//                 ADD TO CART
//               </button>
//             </Link>
//           ))}
//         </div>
//         <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black-600 bg-white-300 p-2 rounded-full shadow-md z-10">&#8250;</button>
//       </div>
//       <style>
//         {`
//           .no-scrollbar::-webkit-scrollbar {
//             display: none;
//           }
//           .no-scrollbar {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//           }

            
//         `}
//       </style>
//     </div>
//   );
// };




import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const BooksCard = () => {
  const [books, setBooks] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    async function launchedBooks() {
      const response = await fetch("http://localhost:8080/books");
      const data = await response.json();
      setBooks(data);
    }
    launchedBooks();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth / 3, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth / 3, behavior: "smooth" });
    }
  };

  return (
    <div className="block bg-[#def8ff] border border-gray-200 rounded-lg m-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Just Launched Books</h2>
        <Link to="/" className="text-blue-600 font-medium hover:underline">View All</Link>
      </div>
      
      <div className="relative">
        {/* Left Scroll Button */}
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white shadow-lg rounded-full z-10">
          &#8249;
        </button>

        {/* Books Container */}
        <div ref={carouselRef} className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth snap-x snap-mandatory no-scrollbar">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col justify-between min-w-[200px] md:min-w-[250px] lg:min-w-[calc(100%/6.5)]">
              {/* Image */}
              <img src={book.image} alt={book.title} className="w-full h-40 object-contain mb-3 hover:scale-95 duration-300" />

              {/* Title & Author */}
              <h3 className="text-sm font-medium mb-2 text-center">
                {book.title} - {book.author}
              </h3>

              {/* Pricing */}
              <div className="text-sm my-4 grid grid-cols-3 items-center text-center">
                <div className="text-gray-400 text-xs">
                  <p>MRP</p>
                  <p className="line-through">₹{book.price}</p>
                </div>
                <div>
                  <p className="text-black-100 font-medium">DMart</p>
                  <p className="font-semibold">₹{book.dmartPrice}</p>
                </div>
                <div className="text-xl text-green-700 font-medium bg-green-100 px-2 py-1 w-fit rounded">
                  ₹{book.discount}
                  <p className="text-xs">OFF</p>
                </div>
              </div>

              {/* Dropdown & Add to Cart */}
              <select className="w-full p-2 border rounded text-sm">
                <option>{book.unit}</option>
              </select>
              <button className="w-full bg-green-600 text-white mt-3 py-2 rounded font-medium hover:bg-green-700">
                ADD TO CART
              </button>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white shadow-lg rounded-full z-10">
          &#8250;
        </button>
      </div>

      {/* Hide Scrollbar */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};
