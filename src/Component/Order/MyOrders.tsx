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

const MyOrders=() => {
  return (
    <div className="flex flex-col min-h-screen">
    <Header/>

      <main className="flex-grow px-[130px] py-4 space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex gap-4 border p-4 rounded shadow-sm items-center"
          >
            <img
              src={order.image}
              alt={order.title}
              className="w-24 h-25 object-cover rounded"
            />
            <div className="flex justify-between w-full items-start">
              <div>
                <h2 className="text-lg font-semibold">{order.title}</h2>
                <p className="text-gray-600 mb-2">by {order.author}</p>
                <div className="text-base">
                  <span className="text-black font-bold">Rs. {order.price}</span>
                  <span className="line-through text-gray-400 ml-2">
                    Rs. {order.originalPrice}
                  </span>
                </div>
              </div>
              <div className="text-sm text-green-600 font-medium">
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
