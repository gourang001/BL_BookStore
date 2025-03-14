import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Link } from 'react-router-dom';

function PleaseLogin() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center text-center bg-white px-4 py-12">
        <h2 className="text-lg font-semibold mb-2">PLEASE LOG IN</h2>
        <p className="text-sm text-gray-600 mb-6">Login to view items in your wishlist.</p>

        <img
        src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
        alt="Login Required"
        className="w-20 h-20 mb-4"
        />

        <Link to="/">
          <button className="border border-red-600 text-red-600 px-6 py-2 text-sm rounded hover:bg-red-100 transition">
            LOGIN/SIGNUP
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default PleaseLogin;
