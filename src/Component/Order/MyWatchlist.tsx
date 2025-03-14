import React from "react";
import image1 from "../../assets/bookImage.png";
import image2 from "../../assets/bookImage2.png";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Common/Breadcrumbs";

type Order = {
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
  originalPrice: number;
  orderDate: string;
};

const orders: Order[] = [
  {
    id: 1,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    image: image1,
    price: 1500,
    originalPrice: 2800,
    orderDate: "May 21",
  },
  {
    id: 2,
    title: "React Material-UI",
    author: "Cookbook",
    image: image2,
    price: 780,
    originalPrice: 1000,
    orderDate: "April 06",
  },
  {
    id: 2,
    title: "React Material-UI",
    author: "Cookbook",
    image: image2,
    price: 780,
    originalPrice: 1000,
    orderDate: "April 06",
  }
];

const MyWatchlist = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Breadcrumbs container="wishlist" />
      <main className="flex-grow px-[130px] py-6">
        <h1 className="text-[18px] font-medium text-black mb-0 bg-[#E4E4E4] h-[46px]">
          My Wishlist ({orders.length})
        </h1>

    
        <div className="flex flex-col gap-4 max-w-[1100px]">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-start border border-gray-300 rounded-md p-4 bg-white"
            >
              <img
                src={order.image}
                alt={order.title}
                className="w-20 h-28 object-cover rounded"
              />
              <div className="flex justify-between w-full ml-4">
                <div>
                  <h2 className="text-[16px] font-medium">{order.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">by {order.author}</p>
                  <div className="text-base">
                    <span className="text-black font-semibold">Rs. {order.price}</span>
                    <span className="line-through text-gray-400 ml-2 text-sm">
                      Rs. {order.originalPrice}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-1 whitespace-nowrap">
                    <button>🗑</button>
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
