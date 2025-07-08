import { useState } from "react";

const SizeGuide = () => (
    <ul className="pl-5 space-y-1 list-none">
        <li><span className="font-semibold">S </span>= Chest 36 Length 26</li>
        <li><span className="font-semibold">M </span>= Chest 38 Length 27</li>
        <li><span className="font-semibold">L </span>= Chest 40 Length 28</li>
        <li><span className="font-semibold">XL </span>= Chest 42 Length 29</li>
        <li><span className="font-semibold">XXL </span>= Chest 44 Length 30</li>
        <li><span className="font-semibold">3XL </span>= Chest 46 Length 31</li>
        <li><span className="font-semibold">4XL </span>= Chest 48 Length 32</li>
        <li><span className="font-semibold">100 Tk extra for 4xl size</span></li>
    </ul>
);

const Accordion = ({ data }) => {
    const [isOpen, setIsOpen] = useState(null);

    // Exchange policy data
    const exchangePolicy = {
        title: "Gamerskit's Exchange policy (RC Car)",
        description: `
            • Exchanges are only accepted within 24 hours of delivery.

            • Products must be unused, undamaged, and in original packaging.

            • No exchanges will be accepted after 24 hours due to customer use.

            • Contact us via inbox with order details and photos/videos to request an exchange.

            • No refunds, exchange only.
            
            Thank you for shopping with GamersKit!
        `
    };

    // Dynamic data array
    const dataArr = [
        {
            title: "Product Details",
            description: data?.description || "No product details available.",
        },
        ...(data?.name && !["Sleeves", "Mask", "car", "consoles"].includes(data.name) ? [{
            title: "Size Guide",
            description: <SizeGuide />,
        }] : []),
        {
            title: "Delivery Charge Info",
            description: (
                <div>
                    {["E-sports", "F1", "Tshirt", "Sleeves", "Mask"].includes(data?.name) && (
                        <p>
                            <strong>Delivery Charges:</strong><br />
                            • Dhaka: 70 TK<br />
                            • Sub-Dhaka: 100 TK<br />
                            • Outside Dhaka: 130 TK<br /><br />
                            <strong>Delivery Time:</strong><br />
                            • 2-3 Days<br />
                        </p>
                    )}
                    {data?.name && data.name.toLowerCase().includes("car") && (
                        <p>
                            <strong>RC Cars: Delivery charge will be free</strong><br />
                            <br />
                            <strong>Delivery Time:</strong><br />
                            • 2-10 Days (Depends on stock)<br />
                        </p>
                    )}
                    {data?.name && data.name.toLowerCase().includes("consoles") && (
                        <p>
                            <strong>Game Consoles: Delivery charge will be free</strong><br />
                            <br />
                            <strong>Delivery Time:</strong><br />
                            • 2-10 Days (Depends on stock)<br />
                        </p>
                    )}
                </div>
            ),
        },
        ...(data?.name && data.name.toLowerCase().includes("car", "consoles") ? [exchangePolicy] : [])
    ];

    const toggle = (idx) => {
        setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
    };

    return (
        <div className="mx-auto w-full max-w-[500px] rounded-lg">
            {dataArr.map((item, idx) => (
                <div key={idx} className="my-2 rounded-lg border p-3 py-3 *:mix-blend-difference bg-zinc-800">
                    <button
                        onClick={() => toggle(idx)}
                        className="flex h-full w-full items-center justify-between font-medium text-white outline-none"
                    >
                        <span>{item.title}</span>
                        <span className="rounded-full">
                            <svg className="ml-8 size-3 shrink-0 fill-white" xmlns="http://www.w3.org/2000/svg">
                                <rect y="5" width="12" height="2" rx="1" className={`origin-center transform transition duration-200 ease-out ${isOpen === idx && '!rotate-180'}`} />
                                <rect y="5" width="12" height="2" rx="1" className={`origin-center rotate-90 transform transition duration-200 ease-out ${isOpen === idx && '!rotate-180'}`} />
                            </svg>
                        </span>
                    </button>
                    <div className={`grid overflow-hidden text-white transition-all duration-300 ease-in-out ${isOpen === idx ? 'grid-rows-[1fr] pb-1 pt-3 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden pr-4 text-sm">
                            {typeof item.description === "string" ? (
                                <p style={{ whiteSpace: "pre-line" }}>{item.description}</p>
                            ) : (
                                item.description
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;