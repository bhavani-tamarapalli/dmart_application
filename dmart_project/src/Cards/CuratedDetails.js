
import { useState, useEffect } from "react"
import { FiShoppingCart } from "react-icons/fi";

export const CuratedDetails = () => {
    const [curated, setCurated] = useState([])


    useEffect(() => {
        async function curatedProducts() {
            const response = await fetch("http://localhost:8080/curated")
            const data = await response.json()
            setCurated(data)
        }
        curatedProducts()
    })
    return (
        <div className="mt-36 mb-32">
            <div className="flex ml-64 gap-4">
                {curated.map((product) => (
                    <div key={product.id} className="h-auto w-64 bg-white  p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col ">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-36 object-contain mb-3 hover:scale-95 transition duration-300 "
                        />
                        <h3 className="text-sm  mb-2">{product.name} - {product.variant} : {product.unit}</h3>
                        <div className="text-sm my-2 grid grid-cols-3 ">
                            <div className="text-gray-400 text-xs">
                                <p>MRP</p>
                                <p className="line-through">₹{product.price}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">DMart</p>
                                <p className="font-md">₹{product.dmartprice}</p>
                            </div>
                            <div className="text-green-700 font-bold bg-green-100 px-2 py-1 place-items-center text-xs rounded  ">
                                <p className="flex" >
                                    ₹{product.discount}
                                </p>
                                <p>Off</p>
                            </div>

                        </div>

                        {/* Quantity Selection */}
                        <select className="w-full mt-2 p-2 border rounded text-sm bg-inherit">
                            <option >{product.unit}</option>
                        </select>
                        <div>
                            <button className="w-full bg-green-600 text-white mt-3 py-2 rounded text-sm flex items-center justify-center hover:bg-green-700">
                                <FiShoppingCart className="mr-2"/>
                                ADD TO CART
                            </button>
                        </div>



                    </div>
                ))}

            </div>



        </div>
    )
}

