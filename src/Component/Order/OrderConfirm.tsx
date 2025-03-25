import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Common/Footer'
import orderPlacedImage from '../../assets/orderplaced.png'
import Header from '../Common/Header'

const contactDetails = {
    emailId: "admin@bookstore.com",
    phoneNo: "+91 9876543210",
    address: "42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034"
}

const OrderConfirm = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='max-w-6xl min-h-[84.85vh] mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col gap-6 sm:gap-10 items-center'>
                <img 
                    src={orderPlacedImage} 
                    alt='Order Placed' 
                    className='w-[50%] sm:w-[35%] md:w-[25%] object-cover' 
                />
                <p className='text-center text-sm sm:text-base md:text-lg text-[#333232] w-full sm:w-2/3 md:w-1/3 font-medium'>
                    hurray!!! your order is confirmed <br />
                    the order id is #123456
                    save the order id for further
                    communication.
                </p>

                <table className="w-full sm:w-[80%] md:w-[60%] border-collapse border border-gray-300 text-left">
                    <thead className="bg-gray-200 text-center">
                        <tr>
                            <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-[#333232] text-[10px] sm:text-xs font-semibold">Email Us</th>
                            <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-[#333232] text-[10px] sm:text-xs font-semibold">Contact Us</th>
                            <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-[#333232] text-[10px] sm:text-xs font-semibold">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-[#333232] text-[10px] sm:text-xs font-normal">{contactDetails.emailId}</td>
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-[#333232] text-[10px] sm:text-xs font-normal">{contactDetails.phoneNo}</td>
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-[#333232] text-[10px] sm:text-xs font-normal">{contactDetails.address}</td>
                        </tr>
                    </tbody>
                </table>

                <button
                    className='bg-[#3371B5] text-xs sm:text-sm uppercase py-2 px-4 sm:px-7 rounded-sm text-white'
                    onClick={() => navigate('/home')}
                >
                    Continue shopping
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default OrderConfirm