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
    </ul>
);

const Accordion = ({ data }) => {
    const [isOpen, setIsOpen] = useState(null);

    // Dynamic data array (now uses `data` prop)
    const dataArr = [
        {
            title: "Product Details",
            description: data?.description || "No product details available.",
        },
        ...(data?.name !== "car" && data?.name !== "Sleeves" && data?.name !== "Mask" ? [{
            title: "Size Guide",
            description: <SizeGuide />,
        }] : []),
        {
            title: "Advance Payment",
            description: (
                <p>
                    <strong>Advance required for:</strong><br />
                    {data?.name === "car" && "• RC Car: 500 TK each"}
                    {data?.name === "F1" && "• F1 Jersey: 100 TK each"}
                    {data?.name === "E-sports" && "• E-sports Jersey: 100 TK for each"}
                    {data?.name === "Tshirt" && "• Tshirt: 100 TK each"}
                    <br />
                    {data?.name === "Sleeves" && "• Hand Sleeves: No advance needed"}
                    {data?.name === "Mask" && "• Mask: No advance needed"}
                    <br />

                    {data?.name === "Sleeves" && data?.name === "Mask" && ""}
                    {data?.name === "car" && "Send advance via (Bkash/Nagad) to:"}
                    {data?.name === "F1" && "Send advance via (Bkash/Nagad) to:"}
                    {data?.name === "Tshirt" && "Send advance via (Bkash/Nagad) to:"}
                    {data?.name === "E-sports" && "Send advance via (Bkash/Nagad) to:"}
                    <strong>01303775977</strong><br /><br />

                    Need help? Call us at the same number.
                </p>
            ),
        },
        {
            title: "Delivery Charge Info",
            description: (
                <p>
                    {
                        data?.name === "E-sports" && (
                            <p>
                                <strong>Delivery Charges:</strong><br />
                                • Dhaka: 70 TK<br />
                                • Sub-Dhaka: 100 TK<br />
                                • Outside Dhaka: 130 TK<br /><br />
                            </p>
                        )
                    }
                    {
                        data?.name === "F1" && (
                            <p>
                                <strong>Delivery Charges:</strong><br />
                                • Dhaka: 70 TK<br />
                                • Sub-Dhaka: 100 TK<br />
                                • Outside Dhaka: 130 TK<br /><br />
                            </p>
                        )
                    }
                    {
                        data?.name === "Tshirt" && (
                            <p>
                                <strong>Delivery Charges:</strong><br />
                                • Dhaka: 70 TK<br />
                                • Sub-Dhaka: 100 TK<br />
                                • Outside Dhaka: 130 TK<br /><br />
                            </p>
                        )
                    }
                    {
                        data?.name === "Sleeves" && (
                            <p>
                                <strong>Delivery Charges:</strong><br />
                                • Dhaka: 70 TK<br />
                                • Sub-Dhaka: 100 TK<br />
                                • Outside Dhaka: 130 TK<br /><br />
                            </p>
                        )
                    }
                    {
                        data?.name === "Mask" && (
                            <p>
                                <strong>Delivery Charges:</strong><br />
                                • Dhaka: 70 TK<br />
                                • Sub-Dhaka: 100 TK<br />
                                • Outside Dhaka: 130 TK<br /><br />
                            </p>
                        )
                    }

                    {data?.name === "car" && "RC Cars: Delivery charge will be free"}
                </p>
            ),
        }
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