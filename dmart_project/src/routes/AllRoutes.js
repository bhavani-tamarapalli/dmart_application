


import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import ProductCard from "../Cards/ProductCard";
import { Bakery, Categories, Dairy, Fruits, Groceries, Snacks } from "../navigation";
import { ProductDetails } from "../Cards/ProductDetails";
import { CuratedDetails } from "../Cards/CuratedDetails";
import { Login } from "../pages/Login";
import { Cart } from "../pages/cart/Cart";
import { Checkout } from "../pages/cart/components/Checkout";
import { SearchResults } from "../search/SearchResults";

export const AllRoutes = ({ endPointState, setEndPointState }) => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/categories" element={<Categories />} />
      < Route path="/products" element={< ProductCard />} />
      < Route path="/groceries" element={< Groceries endPointState={endPointState} setEndPointState={setEndPointState} />} />
      < Route path="/fruits" element={< Fruits endPointState={endPointState} setEndPointState={setEndPointState} />} />
      {/* < Route path="/dairy" element={< Dairy />} /> */}
      < Route path="/snacks" element={< Snacks />} />
      < Route path="/bakery" element={< Bakery />} />
      < Route path="/product/:id" element={< ProductDetails endPointState={endPointState} setEndPointState={setEndPointState} />} />
      < Route path="/curated" element={< CuratedDetails />} />
      < Route path="/login" element={< Login />} />
      < Route path="/cartPage" element={< Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search" element={<SearchResults />} />

    </Routes >
  );
};
