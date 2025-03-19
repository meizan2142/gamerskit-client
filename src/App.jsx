import Hero from "./Components/Hero/Hero"
import Navbar from "./Components/Navbar/Navbar"

function App() {
  return (
    <div>
      <div><Navbar/></div>
      <div><Hero/></div>
      <div className="mt-32">New Arrivals</div>
    </div>
  )
}
export default App
