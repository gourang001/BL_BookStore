import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Breadcrumbs from "../Common/Breadcrumbs";

const UserProfile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Breadcrumbs container="profile" />
      <div className="flex-grow px-4 sm:px-8 md:px-16 lg:px-64 py-8 bg-white text-sm text-gray-800">
        
        
        <div className="bg-white border border-gray-300 rounded p-4 sm:p-6 mb-6 w-full max-w-[512px] mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-sm sm:text-base">Personal Details</h2>
            <button className="text-xs sm:text-sm text-red-500 font-medium">Save</button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-1 text-xs sm:text-sm"> VaticanFull Name</p>
              <input
                type="text"
                name="fullName"
                defaultValue=""
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-xs sm:text-sm"
              />
            </div>


            <div>
              <p className="text-gray-500 mb-1 text-xs sm:text-sm">Email ID</p>
              <input
                type="email"
                name="email"
                defaultValue="abc@example.com"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-xs sm:text-sm"
              />
            </div>

            
            <div>
              <p className="text-gray-500 mb-1 text-xs sm:text-sm">Password</p>
              <input
                type="password"
                name="password"
                defaultValue=""
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-xs sm:text-sm"
              />
            </div>


            <div>
              <p className="text-gray-500 mb-1 text-xs sm:text-sm">Mobile Number</p>
              <input
                type="text"
                name="mobile"
                defaultValue="98xxxxxx49"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        
        <div className="bg-white border border-gray-300 rounded p-4 sm:p-6 w-full max-w-[512px] mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-sm sm:text-base">Address Details</h2>
            <button className="border border-red-500 text-red-500 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
              Add New Address
            </button>
          </div>

          <div className="mb-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">1. WORK</span>
            <button className="text-xs sm:text-sm text-red-500 font-medium">Save</button>
          </div>


          <div className="mb-4">
            <p className="text-gray-500 text-xs mb-1">Address</p>
            <input
              type="text"
              name="address"
              defaultValue="H.No 31,V.P.O Binjalpur,Sector 4, Opp to Indian Bank"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-gray-500 text-xs mb-1">City/Town</p>
              <input
                type="text"
                name="city"
                defaultValue="Ambala"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-xs sm:text-sm"
              />
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">State</p>
              <input
                type="text"
                name="state"
                defaultValue="Haryana"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            {["Home", "Work", "Other"].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
