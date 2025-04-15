import MainLayout from "../MainLayout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import SingleProduct from "../Pages/SingleProductPage/SingleProduct";
import ImageHosting from "../Pages/ImageHosting/ImageHosting";
import OrderForm from "../Pages/OrderForm/OrderForm";
import Implement from "../Pages/Implement/Implement";

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
                element: <OrderForm />,
            },
            {
                path: "/implement",
                element: <Implement />,
            },
        ],
    },
]);
