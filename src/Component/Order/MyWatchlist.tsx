import React, { useEffect, useState } from "react";
import image1 from "../../assets/bookImage.png";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Breadcrumbs from "../Common/Breadcrumbs";
import { getWishlist, removeWishlist } from "../../Utils/API.js";

type Order = {
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
  originalPrice: number;
  orderDate: string;
};

const MyWatchlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getWishlist(token);
      setWishlist(data);
    } catch (err: any) {
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      await removeWishlist(id);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.product_id._id !== id));
      await fetchWishlist();
    } catch (err: any) {
      await fetchWishlist();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Breadcrumbs container="wishlist" />
      <main className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[130px] py-4 sm:py-6">
        <h1 className="text-base sm:text-lg md:text-[18px] font-medium text-black mb-0 bg-[#E4E4E4] h-10 sm:h-[46px] flex items-center px-4">
          My Wishlist ({wishlist.length})
        </h1>

        <div className="flex flex-col gap-4 max-w-[1100px] mt-4">
          {wishlist.map((order) => (
            <div
              key={order.product_id.id}
              className="flex flex-col sm:flex-row items-start border border-gray-300 rounded-md p-4 bg-white"
            >
              <img
                src={image1}
                alt={order.product_id.bookName}
                className="w-16 sm:w-20 h-24 sm:h-28 object-cover rounded mx-auto sm:mx-0"
              />
              <div className="flex flex-col sm:flex-row justify-between w-full mt-4 sm:mt-0 sm:ml-4 gap-4">
                <div>
                  <h2 className="text-sm sm:text-base md:text-[16px] font-medium text-center sm:text-left">
                    {order.product_id.bookName}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 text-center sm:text-left">
                    by {order.product_id.author}
                  </p>
                  <div className="text-sm sm:text-base text-center sm:text-left">
                    <span className="text-black font-semibold">Rs. {order.product_id.discountPrice}</span>
                    <span className="line-through text-gray-400 ml-2 text-xs sm:text-sm">
                      Rs. {order.product_id.price}
                    </span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0 flex justify-center sm:justify-end">
                  <button 
                    onClick={() => handleRemoveFromWishlist(order.product_id._id)}
                    className="hover:text-red-500 transition-colors"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyWatchlist;