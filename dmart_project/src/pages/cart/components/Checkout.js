import React, { useState } from "react";

export const Checkout = () => {
    const [deliveryMode, setDeliveryMode] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");

    return (
        <div className="flex min-h-screen p-6 mt-32">

            <div className="w-4/5 bg-white p-6 rounded-lg shadow-md ">
                <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                <p className="text-gray-600 mb-6">
                    Selected Pincode: <strong>400053</strong>
                </p>

                {/* Delivery Mode Selection */}
                <div className="mb-6 border-2">
                    <p className="font-medium mb-2 p-4"><span className="bg-green-100 text-green-400 rounded rounded-full p-2">1</span>Select a delivery mode</p>
                    <div className="flex gap-4">
                        <label className="flex items-center p-4 border rounded-md cursor-pointer">
                            <input
                                type="radio"
                                name="delivery"
                                value="pickup"
                                className="mr-2"
                                onChange={() => setDeliveryMode("pickup")}
                            />
                            <span className="mr-2">Pick Up Point</span>
                            <span className="text-green-600 font-semibold">Free Delivery</span>
                        </label>
                        <label className="flex items-center p-4 border rounded-md cursor-pointer">
                            <input
                                type="radio"
                                name="delivery"
                                value="home"
                                className="mr-2"
                                onChange={() => setDeliveryMode("home")}
                            />
                            <span className="mr-2">Home Delivery</span>
                            <span className="line-through text-gray-400">₹149</span>
                            <span className="text-green-600 font-semibold ml-2">₹0</span>
                        </label>
                    </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                    <h3 className="font-medium mb-2">2. Select Delivery Slot</h3>
                    <select
                        className="w-full p-3 border rounded-md"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                    >
                        <option value="">Select a Slot</option>
                       
                    </select>
                </div>
            </div>

            {/* Right Section - Price Summary */}
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-md ml-6">
                <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
                <div className="mb-4">
                    <p className="text-gray-600">Items in Cart</p>
                    <p className="text-xl font-semibold">₹671</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">Total Savings</p>
                    <p className="text-orange-600 font-semibold">₹223</p>
                </div>

                {/* Payment Buttons */}
                <button className="w-full text-sm bg-slate-100 text-black py-3 rounded-md">
                    PAY ON DELIVERY 
                </button>
                <div className="text-center my-2">or</div>
                <button className="w-full text-sm text-black-500 py-3 rounded-md">
                    PAY NOW 
                </button>
            </div>
        </div>
    );
};
