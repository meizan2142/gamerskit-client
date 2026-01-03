import { useEffect, useState } from "react";

const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        // Function to calculate the next 11:44 AM Bangladesh time
        const getNextBangladesh1144 = () => {
            const now = new Date();
            
            // Convert to Bangladesh time (UTC+6)
            const bdTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
            
            // Create a date for today at 11:44 AM Bangladesh time
            const today1144 = new Date(bdTime);
            today1144.setUTCHours(5, 44, 0, 0); // 11:44 AM UTC+6 = 05:44 UTC
            
            // If current Bangladesh time is past 11:44 AM, set to tomorrow
            if (bdTime.getTime() > today1144.getTime()) {
                today1144.setUTCDate(today1144.getUTCDate() + 1);
            }
            
            // Convert back to local time for comparison
            return today1144.getTime() - (6 * 60 * 60 * 1000);
        };

        const updateCountdown = () => {
            const remaining = Math.max(
                Math.floor((getNextBangladesh1144() - Date.now()) / 1000),
                0
            );
            setTimeLeft(remaining);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const hours = String(Math.floor((timeLeft % 86400) / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");

    return (
        <div className="w-full bg-yellow text-white text-md py-2 text-center">
            <span>Full Cash on Delivery</span>
            <span className="mx-2">|</span>
            <span>Delivery charge free all over Bangladesh</span>
            <span className="mx-2">|</span>
            <span className="font-semibold">
                ⏳ Offer ends in {hours}:{minutes}:{seconds}
            </span>
        </div>
    );
};

export default CountDown;