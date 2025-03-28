import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginApiCall = async (payload) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/bookstore_user/login`,
            payload
        );
        const token = response.data.result.accessToken;
        if (token) {
            localStorage.setItem('token', token);
        }

        const userName = response.data.result?.fullName || 
                        response.data.fullName || 
                        payload.email.split('@')[0];
        if (userName) {
            localStorage.setItem('userName', userName);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signupApiCall = async (payload) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/bookstore_user/registration`,
            payload
        );
        const token = response.data.accessToken;
        if (token) {
            localStorage.setItem('token', token);
        } 
        
        const userName = response.data.result?.fullName || 
                        response.data.fullName || 
                        payload.email.split('@')[0];
        if (userName) {
            localStorage.setItem('userName', userName);
            console.log('Username stored:', userName);
        } 

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllBooks = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/bookstore_user/get/book`
        );
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

export const getBookReviews = async (bookId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${BASE_URL}/bookstore_user/get/feedback/${bookId}`,
            {
                headers: {
                    "x-access-token": token,
                    "accept": "application/json"
                }
            }
        );
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

export const addFeedback = async (productId, feedback) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }
        const response = await axios.post(
            `${BASE_URL}/bookstore_user/add/feedback/${productId}`,
            feedback, 
            {
                headers: {
                    "x-access-token": token,
                    "accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addToCart = async (productId) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }
        const response = await axios.post(
            `${BASE_URL}/bookstore_user/add_cart_item/${productId}`,
            {},
            {   
                headers: {
                    "x-access-token": token,
                    "accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCartItems = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }
        const response = await axios.get(
            `${BASE_URL}/bookstore_user/get_cart_items`,
            {
                headers: {
                    "x-access-token": token,
                    "accept": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeFromCart = async (cartItemId) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }
        const response = await axios.delete(
            `${BASE_URL}/bookstore_user/remove_cart_item/${cartItemId}`,
            {
                headers: {
                    "x-access-token": token,
                    "accept": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addWishlist = async (bookId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${BASE_URL}/bookstore_user/add_wish_list/${bookId}`,
            { bookId },
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                }
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const removeWishlist = async (bookId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
            `${BASE_URL}/bookstore_user/remove_wishlist_item/${bookId}`,
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                }
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getWishlist = async (token) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/bookstore_user/get_wishlist_items`,
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                },
            }
        );
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/bookstore_user/cart_item_quantity/${cartItemId}`,
        {
            method: "PUT",
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify({ quantityToBuy: quantity }),
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update cart item quantity");
    }
    return response.json();
};
