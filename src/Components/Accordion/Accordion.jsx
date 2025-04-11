import { useState } from "react";

const Accordion = () => {
    const [isOpen, setIsOpen] = useState(null);
    const dataArr = [{ title: "Details", description: 'Product Details', }, { title: "Size Guide", description: 'Size guide of product', },];
    const toggle = (idx) => {
        setIsOpen((prevIdx) => (prevIdx === idx ? null : idx))
    };
    return (
        <div className="mx-auto w-full max-w-[500px] rounded-lg">
            {dataArr.map((PerAccordion, idx) => (
                <div key={idx} className="my-2 rounded-lg border bg-white p-3 py-3 *:mix-blend-difference dark:border-zinc-600 dark:bg-zinc-800">
                    <button onClick={() => toggle(idx)} className="flex h-full w-full items-center justify-between font-medium text-white outline-none">
                        <span>{PerAccordion.title}</span>
                        <span className="rounded-full">
                            <svg className="ml-8 size-3 shrink-0 fill-white" xmlns="http://www.w3.org/2000/svg">
                                <rect y="5" width="12" height="2" rx="1" className={`origin-center transform transition duration-200 ease-out ${isOpen === idx && '!rotate-180'}`} />
                                <rect y="5" width="12" height="2" rx="1" className={`origin-center rotate-90 transform transition duration-200 ease-out ${isOpen === idx && '!rotate-180'}`} />
                            </svg>
                        </span>
                    </button>
                    <div className={`grid overflow-hidden text-zinc-400 transition-all duration-300 ease-in-out ${isOpen === idx ? 'grid-rows-[1fr] pb-1 pt-3 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden pr-4 text-sm">{PerAccordion.description}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Accordion