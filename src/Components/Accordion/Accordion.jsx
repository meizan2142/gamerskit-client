import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ---------- SizeGuide ---------- */
const SizeGuide = () => (
  <ul className="pl-4 space-y-2 text-sm text-gray-700">
    <li>
      <span className="font-semibold">S </span>= Chest 36 • Length 26
    </li>
    <li>
      <span className="font-semibold">M </span>= Chest 38 • Length 27
    </li>
    <li>
      <span className="font-semibold">L </span>= Chest 40 • Length 28
    </li>
    <li>
      <span className="font-semibold">XL </span>= Chest 42 • Length 29
    </li>
    <li>
      <span className="font-semibold">XXL </span>= Chest 44 • Length 30
    </li>
    <li>
      <span className="font-semibold">3XL </span>= Chest 46 • Length 31
    </li>
    <li>
      <span className="font-semibold">4XL </span>= Chest 48 • Length 32
    </li>
    <li className="text-yellow-600 font-semibold">100 Tk extra for 4XL size</li>
  </ul>
);

/* ---------- Accordion Component ---------- */
const Accordion = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const exchangePolicy = {
    title: "Gamerskit's Exchange policy (RC Car)",
    description: `• Exchanges are only accepted within 24 hours of delivery.

• Products must be unused, undamaged, and in original packaging.

• No exchanges will be accepted after 24 hours due to customer use.

• Contact us via inbox with order details and photos/videos to request an exchange.

• No refunds, exchange only.

Thank you for shopping with GamersKit!`,
  };

  const items = [];

  // Product Details
  items.push({
    title: "Product Details",
    content: data?.description || "No product details available.",
    isHtml: false,
  });

  // Size Guide (conditionally)
  const excludeSizeGuide = ["Sleeves", "Mask", "car", "consoles"];
  if (data?.name && !excludeSizeGuide.includes(String(data.name))) {
    items.push({
      title: "Size Guide",
      content: <SizeGuide />,
      isHtml: false,
    });
  }

  // Delivery Charge Info
  items.push({
    title: "Delivery Charge Info",
    content: (
      <div className="text-sm text-gray-700 space-y-3">
        {["E-sports", "F1", "Tshirt", "Sleeves", "Mask"].includes(
          data?.name
        ) && (
          <div>
            <p className="font-semibold">Delivery Charges:</p>
            <p className="mt-1">
              • Dhaka: <span className="font-semibold">70 TK</span>
              <br />• Sub-Dhaka: <span className="font-semibold">100 TK</span>
              <br />• Outside Dhaka:{" "}
              <span className="font-semibold">130 TK</span>
            </p>
            <p className="mt-2 font-semibold">Delivery Time:</p>
            <p className="mt-1">• 2-3 Days</p>
          </div>
        )}

        {data?.name && String(data.name).toLowerCase().includes("car") && (
          <div>
            <p className="font-semibold">
              RC Cars: Delivery charge will be free
            </p>
            <p className="mt-2 font-semibold">Delivery Time:</p>
            <p className="mt-1">• 2-10 Days (Depends on stock)</p>
          </div>
        )}

        {data?.name && String(data.name).toLowerCase().includes("consoles") && (
          <div>
            <p className="font-semibold">
              Game Consoles: Delivery charge will be free
            </p>
            <p className="mt-2 font-semibold">Delivery Time:</p>
            <p className="mt-1">• 2-10 Days (Depends on stock)</p>
          </div>
        )}

        {!["E-sports", "F1", "Tshirt", "Sleeves", "Mask"].includes(
          data?.name
        ) &&
          !["car", "consoles"].some((key) =>
            String(data?.name || "")
              .toLowerCase()
              .includes(key)
          ) && <p>Standard delivery charges apply.</p>}
      </div>
    ),
    isHtml: true,
  });

  // Exchange policy only for car/consoles
  if (
    data?.name &&
    (String(data.name).toLowerCase().includes("car") ||
      String(data.name).toLowerCase().includes("consoles"))
  ) {
    items.push({
      title: exchangePolicy.title,
      content: exchangePolicy.description,
      isHtml: false,
    });
  }

  const toggle = (idx) => setOpenIndex((prev) => (prev === idx ? null : idx));

  /* ---------- Render ---------- */
  return (
    <div className="mx-auto w-full max-w-[820px] divide-y divide-gray-300">
      {items.map((item, idx) => {
        const opened = openIndex === idx;
        const isFirst = idx === 0;
        const isLast = idx === items.length - 1;
        return (
          <div
            key={idx}
            className={`${isFirst ? "border-t" : ""} ${
              isLast ? "border-b" : ""
            } border-gray-300`}>
            {/* Title */}
            <button
              aria-expanded={opened}
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between py-4 text-left focus:outline-none">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <ChevronDown
                className={`text-gray-600 transition-transform duration-300 ${
                  opened ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
            </button>

            {/* Content */}
            <div
              className={`transition-all duration-300 ease-in-out`}
              style={{
                maxHeight: opened ? "600px" : "0px",
                overflow: "hidden",
              }}>
              <div className="pb-4 text-sm text-gray-700 leading-relaxed">
                {typeof item.content === "string" ? (
                  <p style={{ whiteSpace: "pre-line" }}>{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
