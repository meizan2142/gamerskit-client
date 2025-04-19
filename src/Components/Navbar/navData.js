import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../useAuth/useAuth";
import axios from "axios";

export const useNavLinks = () => {
    const { user } = useAuth();
    
    // Fetch user data with loading and error states
    const { data, isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/${user.email}`
                );
                return response.data;
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                throw err;
            }
        },
        enabled: !!user?.email,
        staleTime: 1000 * 60 * 5,
    });

    // Common links for all users
    const commonLinks = [
        { path: '/', pathName: 'Home' },
        { path: '/shop', pathName: 'Shop' }
    ];

    // Return common links immediately while loading
    if (isLoading || !user) {
        return commonLinks;
    }

    // Links specific to roles
    const roleLinks = data?.role === 'admin' 
        ? [{ path: '/admin-dashboard', pathName: 'Dashboard' }]
        : data?.role === 'customer'
            ? [{ path: '/my-orders', pathName: 'My Orders' }]
            : [];

    return [...commonLinks, ...roleLinks];
};