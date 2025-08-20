import { Link } from "react-router-dom"
import Discounts from "../../../assets/images/1dec24-curated-halfprice-mum.jpg"

export const Banner = () => {
  return (


    <Link to="/Products" className="block bg-white border border-gray-200 rounded-lg m-6">



      <div className="grid gap-4 text-center m-6 ">

        <img className="w-full" src={Discounts} alt="" />
      </div>




    </Link>

  )
}


