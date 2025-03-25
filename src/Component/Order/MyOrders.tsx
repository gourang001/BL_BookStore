import React from "react";
import image1 from "../../assets/bookImage.png";
import image2 from "../../assets/bookImage2.png";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

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
    id: 3,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    image: image1,
    price: 1500,
    originalPrice: 2800,
    orderDate: "May 21",
  },
  {
    id: 4,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    image: image1,
    price: 1500,
    originalPrice: 2800,
    orderDate: "May 21",
  }
];

const MyOrders = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header container="home"/>

      <main className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[130px] py-4 space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col sm:flex-row gap-4 border p-4 rounded shadow-sm"
          >
            <img
              src={order.image}
              alt={order.title}
              className="w-24 h-32 sm:h-25 object-cover rounded mx-auto sm:mx-0"
            />
            <div className="flex flex-col sm:flex-row justify-between w-full items-start gap-4">
              <div className="text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <h2 className="text-base sm:text-lg font-semibold">{order.title}</h2>
                  <p className="text-gray-600 text-sm sm:text-base">by {order.author}</p>
                </div>
                <div className="text-sm sm:text-base mt-2">
                  <span className="text-black font-bold">Rs. {order.price}</span>
                  <span className="line-through text-gray-400 ml-2">
                    Rs. {order.originalPrice}
                  </span>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-green-600 font-medium text-center sm:text-right w-full sm:w-auto">
                ● Order Placed on {order.orderDate}
              </div>
            </div>
          </div>
        ))}
      </main>

      <Footer/>
    </div>
  );
};

export default MyOrders;