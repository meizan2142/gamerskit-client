import Hero from "../../Components/Hero/Hero";
import FAQ from "../../Sections/HomeSections/FAQ/FAQ";
import NewArrivals from "../../Sections/HomeSections/NewArrivals/NewArrivals";
import Reviews from "../../Sections/HomeSections/Reviews/Reviews";

const Home = () => {
  return (
    <>
      <Hero />
      <NewArrivals heading={"Categories"} />
      <Reviews />
      <FAQ />
    </>
  );
};

export default Home;
