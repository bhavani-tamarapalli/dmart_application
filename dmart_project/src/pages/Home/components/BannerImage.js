import { Link } from "react-router-dom"
import Discounts from "../../../assets/images/12july24-curated-maxsafe1.jpg"

export const BannerImage = () => {
    return (
        <Link to="/curated" className="block bg-white border border-gray-200 rounded-lg m-6">
            <div className="grid gap-4 text-center m-6 ">
                <img className="w-full" src={Discounts} alt="" />
            </div>

        </Link>
    )
}




