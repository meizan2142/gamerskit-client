import Hero from "../../Components/Hero/Hero"
import NewArrivals from "../../Sections/HomeSections/NewArrivals/NewArrivals"
import Newsletter from "../../Sections/HomeSections/Newsletter/Newsletter"

const Home = () => {
    return (
        <>
            <Hero />
            <NewArrivals heading={'New Arrivals'} description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ducimus. Repudiandae molestias eaque qui? Voluptatem nisi commodi libero, molestiae dolores deleniti, obcaecati aliquid ab aperiam illum cumque laboriosam, ipsum veniam.`}/>
            <Newsletter />
        </>
    )
}

export default Home
