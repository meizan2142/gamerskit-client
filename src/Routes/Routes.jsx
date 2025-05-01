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
import AllOrder from "../Pages/DashBoard/DashPages/AllOrders/AllOrder";
import StockJerseys from "../Pages/DashBoard/DashPages/StockJerseys/StockJerseys";
import PendingOrders from "../Pages/DashBoard/DashPages/PendingOrders/PendingOrders";
import DeliveredOrders from "../Pages/DashBoard/DashPages/DeliveredOrders/DeliveredOrders";

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
                // element: <PrivateRoute><SingleProduct /></PrivateRoute>,
                element: <SingleProduct />
            },
            {
                path: "/imagehosting",
                element: <ImageHosting />,
            },
            {
                path: "/place-orders",
                element: <OrderForm />,
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
                path: 'all-orders',
                element: <PrivateRoute><AllOrder /></PrivateRoute>
            },
            {
                path: 'stock-jerseys',
                element: <PrivateRoute><StockJerseys /></PrivateRoute>
            },
            {
                path: 'pending-orders',
                element: <PrivateRoute><PendingOrders /></PrivateRoute>
            },
            {
                path: 'delivered-orders',
                element: <PrivateRoute><DeliveredOrders /></PrivateRoute>
            },
        ]
    },
]);
