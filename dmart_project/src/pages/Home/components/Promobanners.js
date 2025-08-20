

export const PromoBanners = () => {
  return (
    <div className="flex gap-4 px-4 py-6 bg-gray-100">
      {/* Ice Cream Banner */}
      <div className="flex items-center bg-pink-200 rounded-lg p-4 w-1/2 shadow-md">
        <div className="w-1/2">
          <h2 className="text-lg font-bold text-gray-800">It's Ice-cream Time!</h2>
          <p className="text-sm text-gray-600">Delicious flavours & serveware.</p>
        </div>
        <div className="w-1/2 flex justify-end">
          <img
            src="https://www.dmart.in/category/bread---buns-aesc-bread---bunssc2"
            alt="Ice Cream"
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
        </div>
      </div>

      {/* Bread & Breakfast Banner */}
      <div className="flex items-center bg-orange-200 rounded-lg p-4 w-1/2 shadow-md">
        <div className="w-1/2">
          <h2 className="text-lg font-bold text-gray-800">Bread & Breakfast Store</h2>
          <p className="text-sm text-gray-600">Fresh bread, spreads & more!</p>
        </div>
        <div className="w-1/2 flex justify-end">
          <img
            src="https://www.dmart.in/category/desserts" 
            alt="Bread & Breakfast"
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
        </div>
      </div>
    </div>
  );
};


