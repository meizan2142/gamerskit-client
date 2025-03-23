import Hero from "./Components/Hero/Hero"
import Navbar from "./Components/Navbar/Navbar"
import NewArrivals from "./Pages/Home/HomeSections/NewArrivals/NewArrivals"

function App() {
  return (
    <div>
      <div><Navbar/></div>
      <div><Hero/></div>
      <div className="mt-32">
        <NewArrivals/>
      </div>
    </div>
  )
}
export default App
