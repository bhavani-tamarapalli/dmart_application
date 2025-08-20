
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import NotificationImg from "../../assets/images/Push-4-03-2025-Women’s-Day.jpg";

const Notification = ({ setNotificationOpen }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-96 bg-white h-full shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800">Notification</h2>
          <button onClick={() => setNotificationOpen(false)} className="p-1">
            <MdClose className="text-2xl text-gray-600 hover:text-black-500" />
          </button>
        </div>

        {/* Recent Section */}
        <div className="px-4 py-2 text-sm text-gray-600 font-semibold">RECENT</div>

        {/* Notification Content */}
        <div className="m-4 p-4 border rounded-lg shadow-sm bg-gray-100">
          {/* Title with Icons */}
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold text-gray-900 flex items-center">
               Handpicked gifts for Women's Day!
            </h3>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">Offers</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-1">
             Make-up  Perfumes  Handbags  Earpods  Gift Sets  Chocolates & more to delight her.
          </p>

          {/* Notification Image */}
          <div className="mt-3">
            <img className="w-full rounded-md shadow-md" src={NotificationImg} alt="Women's Day Offer" />
          </div>

       
         

          {/* Timestamp */}
          <p className="text-xs text-gray-500 mt-2">Today at 4:00 pm</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
