import { Carousel } from "../Home/components/Carousel"
import { Banner } from "./components/Banner"
import { BannerImage } from "./components/BannerImage"
import { BooksCard } from "./components/BooksCard"
// import { Categories } from "./components/Categories"


export const HomePage = () => {
  return (
    <div className="bg-[#f0f2f6]">
      <Carousel />
      {/* <Categories /> */}
      <Banner />
      <BooksCard />
      <BannerImage />


    </div >
  )
}


