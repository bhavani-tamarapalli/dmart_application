import { useState } from "react";
import { MdClose, MdSearch, MdLocationOn } from "react-icons/md";
import LocationImg from "../assets/images/location-popup-1.png";

const DeliveryModal = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState("");

  const handleSearchChange = (event) => {
    setLocation(event.target.value);
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white w-[35%] h-[50%] rounded-lg shadow-lg ">

        <div className="bg-[#ecf5ff]" >
          <h2 className=" items-center font-semibold text-gray-800 text-center my-4">Where should we deliver?</h2>

          <div className="relative ">
            <input
              type="text"
              value={location}
              onChange={handleSearchChange}
              placeholder="Search for pincode,area,or street name."
              className="w-full border rounded-md focus:outline-green focus:ring-2 focus:ring-green-500" />
            <MdSearch className="absolute left-4 top-4 text-gray-500 text-xl" />
          </div>

        </div>

        <img className="p-4 mb-32" src={LocationImg} alt="Dmart Shopping" />



      </div>
    </div>
  ) : null;
};

export default DeliveryModal;
