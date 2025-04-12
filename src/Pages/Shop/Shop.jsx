import NewArrivals from "../../Sections/HomeSections/NewArrivals/NewArrivals"
import { ShopHero } from "../../Sections/ShopSections/ShopHero/ShopHero"

const Shop = () => {
    return (
        <div className="pt-6 sm:pt-20 md:pt-10 lg:pt-10 xl:pt-12 2xl:pt-12  min-h-screen">
            <div>
                <ShopHero />
            </div>
            <div>
                <NewArrivals heading={'Shop'} />
            </div>
        </div>
    )
}

export default Shop