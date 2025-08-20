// import React from "react";
// import visa from "../../assets/images/visa.svg"
// import rupay from "../../assets/images/rupay.svg"
// import mastercard from "../../assets/images/mastercard.svg"
// import cash from "../../assets/images/cash_outlined.svg"
// import american from "../../assets/images/american.svg"


// export const Footer = () => {
//   return (
//     <footer className="bg-white border-t border-gray-200 py-6">
//       <div className= "p-4 mx-auto max-w-screen-xl md:flex md:items-center md:justify-between md:p-6 ">
//         <div className="flex flex-col md:flex-row justify-between items-center">

//           {/* Left Section: App Downloads & Payments */}
//           <div className="mb-6 md:mb-0">
//             <p className="text-sm font-medium text-gray-600">
//               Download DMart Ready Mobile App Now!!
//             </p>
//             <div className="flex space-x-2 mt-2">
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
//                 alt="Google Play"
//                 className="h-10"
//               />
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/3/31/Available_on_the_App_Store_%28black%29.png"
//                 alt="App Store"
//                 className="h-10"
//               />
//             </div>
//             <div className="flex space-x-2 mt-3">
//               <img
//                 src={visa}
//                 alt="Visa"
//                 className="h-6"
//               />
//               <img
//                 src={mastercard}
//                 alt="Mastercard"
//                 className="h-6"
//               />
//               <img
//                 src={american}
//                 alt="American Express"
//                 className="h-6"
//               />
//               <img
//                 src={rupay}
//                 alt="RuPay"
//                 className="h-6"
//               />
//               <img
//                 src={cash}
//                 alt="Cash"
//                 className="h-6"
//               />
//             </div>
//           </div>

//           {/* Right Section: Quick Links */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
//             <div>
//               <p className="font-medium">FAQs</p>
//               <p className="font-medium">Privacy Policy</p>
//               <p className="font-medium">Pricing, Delivery, Return & Refund</p>
//             </div>
//             <div>
//               <p className="font-medium">Terms & Conditions</p>
//               <p className="font-medium">Disclaimer</p>
//               <p className="font-medium">Pickup Points</p>
//             </div>
//             <div>
//               <p className="font-medium">Contact Us</p>
//               <p className="font-medium">About Us</p>
//               <p className="font-medium">Join Us</p>
//             </div>
//           </div>
//         </div>

//         {/* Copyright Section */}
//         <div className="text-center text-gray-500 text-xs mt-6">
//           Copyright © 2025 Avenue E-Commerce Limited (AEL). All Rights Reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

import React from "react";
import visa from "../../assets/images/visa.svg"
import rupay from "../../assets/images/rupay.svg"
import mastercard from "../../assets/images/mastercard.svg"
import cash from "../../assets/images/cash_outlined.svg"
import american from "../../assets/images/american.svg"
import app from "../../assets/images/download-app-store.svg"


export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 py-6 w-full ">
      <div className="max-w-8xl mx-auto  justify-between">

        {/* Top Section */}
        <div className="flex flex-col-3 md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">

          {/* Left: App Download & Payment Methods */}
          <div className="flex flex-col ml-14">
            <p className="text-sm font-medium text-gray-600">
              Download DMart Ready Mobile App Now!!
            </p>
            <div className="flex space-x-3 mt-2 ">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
              <img
                src={app}
                alt="App Store"
                className="h-10"
              />
            </div>

            <div className="flex space-x-2 mt-3">
              <img
                src={visa}
                alt="Visa"
                className="h-6"
              />
              <img
                src={mastercard}
                alt="Mastercard"
                className="h-6"
              />
              <img
                src={american}
                alt="American Express"
                className="h-6"
              />
              <img
                src={rupay}
                alt="RuPay"
                className="h-6"
              />
              <img
                src={cash}
                alt="Cash"
                className="h-6"
              />
            </div>
          </div>

          {/* Right: Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-black-600 text-bold">
            <div className="space-y-2">
              <p className="font-medium cursor-pointer hover:underline">FAQs</p>
              <p className="font-medium cursor-pointer hover:underline">Privacy Policy</p>
              <p className="font-medium cursor-pointer hover:underline">
                Pricing, Delivery, Return & Refund Policy
              </p>
              <p className="font-medium cursor-pointer hover:underline">Terms & Conditions</p>
              <p className="font-medium cursor-pointer hover:underline">Disclaimer</p>
            </div>

            <div className="space-y-2 mx-14">
              <p className="font-medium cursor-pointer hover:underline">Contact Us</p>
              <p className="font-medium cursor-pointer hover:underline">About Us</p>
              <p className="font-medium cursor-pointer hover:underline">Join Us</p>
              <p className="font-medium cursor-pointer hover:underline">Pickup Points</p>
            </div>
          </div>

        </div>

     <hr className="m-8"></hr>
        <div className="text-center text-gray-500 text-xs mt-6">
          Copyright © 2025 Avenue E-Commerce Limited (AEL). All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};


