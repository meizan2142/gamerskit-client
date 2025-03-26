import NewArrivals from "../../Sections/HomeSections/NewArrivals/NewArrivals"
import { ShopHero } from "../../Sections/ShopSections/ShopHero/ShopHero"

const Shop = () => {
    return (
        <div className="pt-24 lg:pt-28 xl:pt-32 2xl:pt-36 min-h-screen">
            <div>
                <ShopHero />
            </div>
            <div>
                <NewArrivals heading={'Shop'} description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ducimus. Repudiandae molestias eaque qui? Voluptatem nisi commodi libero, molestiae dolores deleniti, obcaecati aliquid ab aperiam illum cumque laboriosam, ipsum veniam.`}/>
            </div>
        </div>
    )
}

export default Shop