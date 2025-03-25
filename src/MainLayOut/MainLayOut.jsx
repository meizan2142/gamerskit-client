import { Outlet } from "react-router"
import Navbar from "../Components/Navbar/Navbar"
import Footer from "../Components/Footer/Footer"

const MainLayOut = () => {
    return (
        <div>
            <div><Navbar /></div>
            <div><Outlet /></div>
            <div><Footer /></div>
        </div>
    )
}

export default MainLayOut