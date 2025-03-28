import React, { useEffect, useState } from "react";
import image1 from "../../assets/bookImage.png";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Breadcrumbs from "../Common/Breadcrumbs";
import { getWishlist, removeWishlist } from "../../Utils/API.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type WishlistItem = {
  _id: string; 
  product_id: {
    _id: string;
    bookName: string;
    author: string;
    discountPrice: number;
    price: number;
  } | null; 
  user_id: string;
  createdAt: string;
  updatedAt: string;
};

const MyWatchlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }
      const data = await getWishlist(token);
      const validWishlist = Array.isArray(data)
        ? data.filter((item): item is WishlistItem => item.product_id !== null && typeof item.product_id === "object")
        : [];
      
      setWishlist(validWishlist);
      if (validWishlist.length === 0) {
        setError("No valid wishlist items found.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch wishlist";
      setError(errorMessage);
      console.error("Fetch wishlist error:", errorMessage);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (bookId: string) => {
    try {
      await removeWishlist(bookId); 
      toast.success("Item removed from wishlist", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      await fetchWishlist(); 
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to remove item from wishlist";
      console.error("Remove wishlist error:", err);
      toast.error(errorMessage);
      await fetchWishlist();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header container="home"/>
      <Breadcrumbs container="wishlist" />
      <main className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[130px] py-4 sm:py-6">
        <h1 className="text-base sm:text-lg md:text-[18px] font-medium text-black mb-0 bg-[#E4E4E4] h-10 sm:h-[46px] flex items-center px-4">
          My Wishlist ({wishlist.length})
        </h1>

        {loading ? (
          <div className="text-center py-10">Loading wishlist...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-10 text-gray-600">Your wishlist is empty or contains no valid items.</div>
        ) : (
          <div className="flex flex-col gap-4 max-w-[1100px] mt-4">
            {wishlist.map((order) => (
              <div
                key={order.product_id?._id || order._id} 
                className="flex flex-col sm:flex-row items-start border border-gray-300 rounded-md p-4 bg-white"
              >
                <img
                  src={image1}
                  alt={order.product_id?.bookName || "Book"}
                  className="w-16 sm:w-20 h-24 sm:h-28 object-cover rounded mx-auto sm:mx-0"
                />
                <div className="flex flex-col sm:flex-row justify-between w-full mt-4 sm:mt-0 sm:ml-4 gap-4">
                  <div>
                    <h2 className="text-sm sm:text-base md:text-[16px] font-medium text-center sm:text-left">
                      {order.product_id?.bookName || "Unknown Book"}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 text-center sm:text-left">
                      by {order.product_id?.author || "Unknown Author"}
                    </p>
                    <div className="text-sm sm:text-base text-center sm:text-left">
                      <span className="text-black font-semibold">
                        Rs. {order.product_id?.discountPrice || "N/A"}
                      </span>
                      <span className="line-through text-gray-400 ml-2 text-xs sm:text-sm">
                        Rs. {order.product_id?.price || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0 flex justify-center sm:justify-end">
                    <button
                      onClick={() => handleRemoveFromWishlist(order._id)} 
                      className="hover:text-red-500 transition-colors"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MyWatchlist;