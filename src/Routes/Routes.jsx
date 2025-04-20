import MainLayout from "../MainLayout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import SingleProduct from "../Pages/SingleProductPage/SingleProduct";
import ImageHosting from "../Pages/ImageHosting/ImageHosting";
import OrderForm from "../Pages/OrderForm/OrderForm";
import MyOrders from "../Pages/MyOrders/MyOrders";
import SingleOrderDetails from "../Pages/SingleOrderDetails/SingleOrderDetails";
import DashBoard from "../Pages/DashBoard/DashBoard";
import SignIn from "../Pages/SignIn/SignIn";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/shop",
                element: <Shop />,
            },
            {
                path: "/singleproduct/:id",
                element: <SingleProduct />,
            },
            {
                path: "/imagehosting",
                element: <ImageHosting />,
            },
            {
                path: "/place-orders",
                element: <PrivateRoute><OrderForm /></PrivateRoute>,
            },
            {
                path: "/my-orders",
                element: <MyOrders />,
            },
            {
                path: "/single-order-details/:id",
                element: <SingleOrderDetails />,
            },
            {
                path: "/admin-dashboard",
                element: <PrivateRoute><DashBoard /></PrivateRoute>,
            },
            {
                path: "/signin",
                element: <SignIn />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            // Worker's Routes
            {
                path: 'workerhome',
                // element: <PrivateRoute><WorkerHome></WorkerHome></PrivateRoute>
            },
        ]
    },
]);
