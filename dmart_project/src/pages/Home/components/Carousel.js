
import { useState, useEffect } from "react";

import Carousel1 from "../../../assets/images/28jan25-crsl-nc-newarrivals.webp";
import Carousel2 from "../../../assets/images/1aug24-crsl-kitchenmela.webp";
import Carousel3 from "../../../assets/images/1aug24-crsl-womenscorner1.webp";
import Carousel4 from "../../../assets/images/1oct24-crsl-dg-mum.webp";
import Carousel5 from "../../../assets/images/1dec24-crsl-ds-mum.webp";

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [Carousel1, Carousel2, Carousel3, Carousel4, Carousel5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden mt-28 ">
    
      <div className="flex transition-transform duration-500 "
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((image, index) => (
          <div key={index} className="w-full flex-none">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>

     

     
    </div>
  );
};









// import { useState, useEffect } from "react";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
// import Carousel1 from "../../assets/images/28jan25-crsl-nc-newarrivals.webp";
// import Carousel2 from "../../assets/images/1aug24-crsl-kitchenmela.webp";
// import Carousel3 from "../../assets/images/1aug24-crsl-womenscorner1.webp";
// import Carousel4 from "../../assets/images/1oct24-crsl-dg-mum.webp";
// import Carousel5 from "../../assets/images/1dec24-crsl-ds-mum.webp";

// export const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [Carousel1, Carousel2, Carousel3, Carousel4, Carousel5];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000); // Auto-slide every 3 seconds

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative w-full overflow-hidden my-2">
//       {/* Carousel Images */}
//       <div className="flex transition-transform duration-700 ease-in-out"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//         {slides.map((image, index) => (
//           <div key={index} className="w-full flex-none">
//             <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/50 p-3 text-white rounded-full hover:bg-gray-900/70"
//       >
//         <FaChevronLeft className="h-6 w-6" />
//       </button>
//       <button
//         onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/50 p-3 text-white rounded-full hover:bg-gray-900/70"
//       >
//         <FaChevronRight className="h-6 w-6" />
//       </button>

//       {/* Dots Navigation */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`h-3 w-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-gray-400"}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };







 /*
// import { useState } from "react";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
// import Carousel1 from "../../assets/images/28jan25-crsl-nc-newarrivals.webp";
// import Carousel2 from "../../assets/images/1aug24-crsl-kitchenmela.webp";
// import Carousel3 from "../../assets/images/1aug24-crsl-womenscorner1.webp";
// import Carousel4 from "../../assets/images/1oct24-crsl-dg-mum.webp";
// import Carousel5 from "../../assets/images/1dec24-crsl-ds-mum.webp";

 
// export const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
 
//   const slides = [
//     {
//       id: 1,
//       images: [Carousel1],
//     },
//     {
//       id: 2,
//       images: [Carousel2],
//     },
//     {
//       id: 3,
//       images: [Carousel3],
//     },
//     {
//       id: 4,
//       images: [Carousel4],
//     },
//     {
//       id: 5,
//       images: [Carousel5],
//     },
//   ];
 
//   return (
//     <div className="relative w-full">
   
//       <div className="overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         >
//           {slides.map((slide) => (
//             <div key={slide.id} className="w-full flex-none">
//               <div className="flex justify-center  space-x-6 p-4">
//                 {slide.images.map((image, index) => (
//                   <div key={index} className=" flex">
//                     <img
//                       src={image}
//                       alt={`Slide ${slide.id} - Image ${index + 1}`}
//                       className="w-14 h-16 object-cover rounded-lg shadow-lg"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
 
   
//       <button
//         onClick={() =>
//           setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
//         }
//         className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30"
//       >
//         <FaChevronLeft className="h-6 w-6" />
//       </button>
//       <button
//         onClick={() =>
//           setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
//         }
//         className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30"
//       >
//         <FaChevronRight className="h-6 w-6" />
//       </button>
 
   
//       <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
 */
 