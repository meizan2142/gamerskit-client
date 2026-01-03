import { useEffect, useState } from "react";

const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(0);
    
    // Fixed end time for all users (e.g., next midnight)
    const getGlobalEndTime = () => {
        // Set to next midnight (24:00) or any fixed future time
        const now = Date.now();
        const nextMidnight = new Date();
        nextMidnight.setHours(24, 0, 0, 0); // Set to next midnight
        return nextMidnight.getTime();
        
    };

    useEffect(() => {
        let endTime;
        
        // Check if we have a stored end time
        const storedEndTime = localStorage.getItem("countdownEndTime");
        
        if (storedEndTime) {
            endTime = parseInt(storedEndTime, 10);
            
            // If stored time is in the past, reset it
            if (endTime <= Date.now()) {
                endTime = getGlobalEndTime();
                localStorage.setItem("countdownEndTime", endTime);
            }
        } else {
            // First time - set to global end time
            endTime = getGlobalEndTime();
            localStorage.setItem("countdownEndTime", endTime);
        }

        const updateCountdown = () => {
            const diff = Math.floor((endTime - Date.now()) / 1000);

            if (diff <= 0) {
                // Reset to next period
                const newEndTime = getGlobalEndTime();
                localStorage.setItem("countdownEndTime", newEndTime);
                endTime = newEndTime;
                setTimeLeft(Math.floor((newEndTime - Date.now()) / 1000));
            } else {
                setTimeLeft(diff);
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");

    return (
        <div className="w-full bg-yellow text-white text-md py-2 text-center">
            <span>Full Cash on Delivery</span>
            <span className="mx-2">|</span>
            <span>Free Delivery All Over Bangladesh</span>
            <span className="mx-2">|</span>
            <span className="font-semibold">
                ⏳ Offer ends in {hours}:{minutes}:{seconds}
            </span>
        </div>
    );
};

export default CountDown;