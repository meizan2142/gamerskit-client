import Hero from "./Components/Hero/Hero"
import Navbar from "./Components/Navbar/Navbar"
import NewArrivals from "./Pages/Home/HomeSections/NewArrivals/NewArrivals"
import NewsLetter from "./Pages/Home/HomeSections/NewsLetter/NewsLetter"

function App() {
  return (
    <div>
      <div><Navbar /></div>
      <div><Hero /></div>
      <div className="mt-20">
        <NewArrivals />
      </div>
      <div className="mt-20">
        <NewsLetter />
      </div>
    </div>
  )
}
export default App
