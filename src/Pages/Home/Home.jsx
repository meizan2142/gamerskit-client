import Hero from "../../Components/Hero/Hero"
import NewArrivals from "../../Sections/HomeSections/NewArrivals/NewArrivals";
import Newsletter from "../../Sections/HomeSections/Newsletter/Newsletter"

const Home = () => {
    return (
        <>
            <Hero />
            <NewArrivals heading={'New Arrivals'} />
            <Newsletter />
        </>
    )
}

export default Home
