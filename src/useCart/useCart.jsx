// hooks/useCart.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../useAuth/useAuth';

const CART_KEY = 'cart';

export const useCart = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [localCart, setLocalCart] = useState(() => {
        // Initialize from localStorage immediately
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        }
        return [];
    });

    // 🛒 Fetch cart data (only for logged-in users)
    const { data: dbCart = [] } = useQuery({
        queryKey: [CART_KEY],
        enabled: !!user,
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/cartList?email=${user?.email}`);
            return res.data;
        }
    });

    // 🔄 Synchronize state with localStorage (for guests)
    const updateLocalCart = (newCart) => {
        localStorage.setItem(CART_KEY, JSON.stringify(newCart));
        setLocalCart(newCart);
        // Dispatch custom event to notify other hooks
        window.dispatchEvent(new Event('localCartUpdated'));
    };

    // 📡 Listen for localStorage changes (cross-tab sync)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === CART_KEY) {
                setLocalCart(JSON.parse(e.newValue) || []);
            }
        };

        const handleCustomEvent = () => {
            const currentCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
            setLocalCart(currentCart);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('localCartUpdated', handleCustomEvent);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('localCartUpdated', handleCustomEvent);
        };
    }, []);

    // 🔥 Add to DB cart (logged-in users) with optimistic update
    const { mutate: addToDB } = useMutation({
        mutationFn: async (item) => {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/cartList`, item);
            return res.data;
        },
        onMutate: async (newItem) => {
            await queryClient.cancelQueries([CART_KEY]);
            const previousCart = queryClient.getQueryData([CART_KEY]) || [];
            queryClient.setQueryData([CART_KEY], (old) => [...old, newItem]);
            return { previousCart };
        },
        onError: (err, _, context) => {
            queryClient.setQueryData([CART_KEY], context.previousCart);
        },
        onSettled: () => {
            queryClient.invalidateQueries([CART_KEY]);
        }
    });

    // 🧹 Remove from DB cart (logged-in users) with optimistic update
    const { mutate: removeFromDB } = useMutation({
        mutationFn: async (id) => {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/cartList/${id}`);
            return res.data;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries([CART_KEY]);
            const previousCart = queryClient.getQueryData([CART_KEY]) || [];
            queryClient.setQueryData([CART_KEY], (old) => 
                old.filter(item => item.productId !== id)
            );
            return { previousCart };
        },
        onError: (err, _, context) => {
            queryClient.setQueryData([CART_KEY], context.previousCart);
        },
        onSettled: () => {
            queryClient.invalidateQueries([CART_KEY]);
        }
    });

    // ⚡ Add item to cart (optimistic updates for both cases)
    const addToCart = (item) => {
        if (!user) {
            const updatedCart = [...localCart, item];
            updateLocalCart(updatedCart);
        } else {
            addToDB(item);
        }
    };

    // ❌ Remove item from cart (optimistic updates for both cases)
    const removeFromCart = (productId) => {
        if (!user) {
            const updatedCart = localCart.filter(item => item.productId !== productId);
            updateLocalCart(updatedCart);
        } else {
            removeFromDB(productId);
        }
    };

    // 🔄 Sync localStorage cart to DB after login (batch update)
    useEffect(() => {
        if (user && localCart.length > 0) {
            const syncCart = async () => {
                try {
                    await Promise.all(localCart.map(item => addToDB(item)));
                    localStorage.removeItem(CART_KEY);
                    setLocalCart([]);
                } catch (error) {
                    console.error('Failed to sync cart:', error);
                }
            };
            syncCart();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // Only run when user changes

    return {
        cartItems: user ? dbCart : localCart,
        addToCart,
        removeFromCart,
        // Optional: Add these for more control
        updateLocalCart,
        isSyncing: user && localCart.length > 0
    };
};