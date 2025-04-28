import { useEffect, useRef, useState } from "react";

const Status = ({ item, onStatusChange }) => {
    const [open, setOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const dropDownRef = useRef(null);
    const items = ['pending', 'delivered', 'cancelled', 'returned'];

    useEffect(() => {
        const close = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    const handleStatusUpdate = async (newStatus) => {
        if (item.status === newStatus) {
            setOpen(false);
            return;
        }

        setIsUpdating(true);
        try {
            await onStatusChange(item._id, newStatus);
        } catch (error) {
            console.error('Status update failed:', error);
        } finally {
            setIsUpdating(false);
            setOpen(false);
        }
    };

    return (
        <div ref={dropDownRef} className="relative mx-auto w-fit text-white">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className={`rounded-sm px-2 py-1 ${isUpdating ? 'bg-gray-500' : 'bg-sky-600'}`}
                disabled={isUpdating}
            >
                {isUpdating ? 'Updating...' : item.status}
            </button>
            <ul className={`${open ? 'visible' : 'invisible'} absolute top-12 z-50 w-full mx-auto rounded-sm bg-yellow-400 shadow-md`}>
                {items.map((statusItem, idx) => (
                    <li
                        key={idx}
                        onClick={() => handleStatusUpdate(statusItem)}
                        className={`rounded-sm p-2 cursor-pointer ${open ? 'opacity-100 duration-300' : 'opacity-0 duration-150'
                            } ${item.status === statusItem ? 'bg-green-500' : 'hover:bg-sky-500'
                            } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isUpdating}
                    >
                        {statusItem}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Status;