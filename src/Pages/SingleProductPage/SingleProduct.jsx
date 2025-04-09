import { useState } from "react";

const SingleProduct = () => {
    const [mainImage, setMainImage] = useState(
        "http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090188/xyonqh4ycoq1nuqr2lz6.png"
    );

    const thumbnails = [
        "http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090158/dchrtpia95xdom4koczu.png",
        "http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090226/swywuhatuli1ycrfpmxo.jpg",
        "http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090188/xyonqh4ycoq1nuqr2lz6.png"
    ];
    return (
        <div className="min-h-screen pt-24">
            <div className="flex flex-col md:flex-row gap-8 p-6">
                {/* Left Side - Image Gallery */}
                <div className="flex flex-col gap-4">
                    <img
                        src={mainImage}
                        alt="G2 Esports Jersey"
                        className="w-96 rounded-lg shadow-lg"
                    />
                    <div className="flex gap-2">
                        {thumbnails.map((thumbnail, index) => (
                            <img
                                key={index}
                                src={thumbnail}
                                alt={`Thumb${index + 1}`}
                                className="w-20 rounded-md cursor-pointer"
                                onClick={() => setMainImage(thumbnail)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side - Product Details (unchanged) */}
                {/* ... rest of your product details code ... */}
            </div>
            <div className="p-6">
                <h1 className="text-3xl font-bold">A Five Items Grid Layout</h1>
                <p className="mt-2">Direct child elements of the grid container automatically become grid items.</p>
                <p className="mb-4">Item 1, 2, and 5 are set to span multiple columns or rows.</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 bg-white p-4">
                    <img src="http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090188/xyonqh4ycoq1nuqr2lz6.png" alt="Item 1" className="lg:col-span-2 w-full h-auto" />
                    <img src="http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090188/xyonqh4ycoq1nuqr2lz6.png" alt="Item 2" className="lg:row-span-2 w-full h-auto" />
                    <img src="http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090188/xyonqh4ycoq1nuqr2lz6.png" alt="Item 3" className="w-full h-auto" />
                    <img src="http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090188/xyonqh4ycoq1nuqr2lz6.png" alt="Item 4" className="w-full h-auto" />
                    <img src="http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090188/xyonqh4ycoq1nuqr2lz6.png" alt="Item 5" className="lg:col-span-3 w-full h-auto" />
                </div>
            </div>
        </div>
    )
}

export default SingleProduct