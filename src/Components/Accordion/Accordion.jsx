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

const Accordion = () => {
    const [isOpen, setIsOpen] = useState(null);
    const dataArr = [
        {
            title: "Product Details",
            description:
                `
            Material: 100% Polyster
            Fabric: Honeycomb Fabric
            `
        },
        {
            title: "Size Guide",
            description: <SizeGuide />,
        },
    ];

    const toggle = (idx) => {
        setIsOpen((prevIdx) => (prevIdx === idx ? null : idx))
    };

    return (
        <div className="mx-auto w-full max-w-[500px] rounded-lg">
            {dataArr.map((PerAccordion, idx) => (
                <div key={idx} className="my-2 rounded-lg border p-3 py-3 *:mix-blend-difference bg-zinc-800">
                    <button
                        onClick={() => toggle(idx)}
                        className="flex h-full w-full items-center justify-between font-medium text-white outline-none"
                    >
                        <span>{PerAccordion.title}</span>
                        <span className="rounded-full">
                            <svg className="ml-8 size-3 shrink-0 fill-white" xmlns="http://www.w3.org/2000/svg">
                                <rect y="5" width="12" height="2" rx="1" className={`origin-center transform transition duration-200 ease-out ${isOpen === idx && '!rotate-180'}`} />
                                <rect y="5" width="12" height="2" rx="1" className={`origin-center rotate-90 transform transition duration-200 ease-out ${isOpen === idx && '!rotate-180'}`} />
                            </svg>
                        </span>
                    </button>
                    <div className={`grid overflow-hidden text-white transition-all duration-300 ease-in-out ${isOpen === idx ? 'grid-rows-[1fr] pb-1 pt-3 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden pr-4 text-sm">
                            {typeof PerAccordion.description === 'string'
                                ? PerAccordion.description
                                : PerAccordion.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Accordion