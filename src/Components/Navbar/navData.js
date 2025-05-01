import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../useAuth/useAuth";
import axios from "axios";

export const useNavLinks = () => {
    const { user } = useAuth();

    // Common links for all users
    const commonLinks = [
        { path: '/', pathName: 'Home' },
        { path: '/shop', pathName: 'Shop' }
    ];

    // Fetch user data
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/${user?.email}`
                );
                return response.data;
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                throw err;
            }
        },
        enabled: !!user?.email,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
    });

    // Return common links immediately in these cases
    if (isLoading || isError || !user || !data) {
        return commonLinks;
    }


    

    // Role-specific links
    const roleLinks = [];

    if (data.role === 'admin') {
        roleLinks.push({ path: '/admin-dashboard', pathName: 'Dashboard' });
    } else if (data.role === 'customer') {
        roleLinks.push({ path: '/my-orders', pathName: 'My Orders' });
    }

    return [...commonLinks, ...roleLinks];
};