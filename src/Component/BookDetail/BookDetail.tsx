import React, { useState, useEffect } from 'react';
import bookImage from '../../assets/bookImage.png';
import { FaHeart } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { FaMinus } from 'react-icons/fa6';
import { IoAdd } from 'react-icons/io5';
import Header from '../Common/Header';
import Feedback from './Feedback';
import FeedbackForm from './FeedbackForm';
import Breadcrumbs from '../Common/Breadcrumbs';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart, addWishlist, removeWishlist } from '../../Utils/API.js';

function BookDetail() {
  const [imageActive, setImageActive] = useState(0);
  const [addToCartState, setAddToCartState] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state;

  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);

  const handleAddToCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await addToCart(book._id);
      if (response.success) {
        setAddToCartState(true);
        navigate('/cart', {
          state: {
            cartItems: [{
              id: book._id,
              name: book.bookName,
              author: book.author,
              price: book.discountPrice,
              originalPrice: book.price,
              image: book.pic || bookImage,
              quantity: cartCount
            }]
          }
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to add item to cart';
      setError(errorMessage);
      if (errorMessage === 'No authentication token found. Please log in.' || err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const incrementCart = () => setCartCount(prevCount => prevCount + 1);
  const decrementCart = () => {
    if (cartCount > 1) setCartCount(prevCount => prevCount - 1);
  };

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        const response = await removeWishlist(book._id);
        setIsWishlisted(false);
      } else {
        const response = await addWishlist(book._id);
        setIsWishlisted(true);
      }
    } catch (error) {
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header container='home' />
      <Breadcrumbs container="bookPage" />

      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[90px] py-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="w-full md:w-[40%] flex flex-col">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
                <div
                  onClick={() => setImageActive(0)}
                  className={`cursor-pointer h-[68px] p-2 flex justify-center items-center border-2 ${
                    imageActive === 0 ? 'border-red-500' : 'border-[#E0E0E0]'
                  }`}
                >
                  <img className="w-10" src={book.pic} alt="thumbnail-1" />
                </div>
                <div
                  onClick={() => setImageActive(1)}
                  className={`cursor-pointer h-[68px] p-2 flex justify-center items-center border-2 ${
                    imageActive === 1 ? 'border-red-500' : 'border-[#E0E0E0]'
                  }`}
                >
                  <img className="w-10" src={bookImage} alt="thumbnail-2" />
                </div>
              </div>
              <div className="w-full sm:w-[82%] flex justify-center items-center p-4 sm:p-8 border-2 border-[#E0E0E0] order-1 sm:order-2">
                <img className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px]" src={imageActive ? bookImage : book.pic} alt="active-book" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center sm:justify-end">
              {addToCartState ? (
                <div className="h-10 w-full sm:w-32 md:w-40 flex items-center justify-between">
                  <div
                    onClick={decrementCart}
                    className="cursor-pointer w-8 h-8 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full"
                  >
                    <FaMinus className={`${cartCount === 1 ? 'text-[#DBDBDB]' : 'text-black'} text-base`} />
                  </div>
                  <div className="w-10 h-8 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 select-none">
                    <p className="text-lg">{cartCount}</p>
                  </div>
                  <div
                    onClick={incrementCart}
                    className="cursor-pointer w-8 h-8 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full"
                  >
                    <IoAdd className="text-lg" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className={`h-10 w-full sm:w-32 md:w-40 bg-[#A03037] text-white flex items-center justify-center text-sm ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Adding...' : 'ADD TO CART'}
                </button>
              )}
              <div 
                onClick={handleWishlist} 
                className="h-10 w-full sm:w-32 md:w-40 bg-[#373434] cursor-pointer text-white flex items-center justify-center gap-2 text-sm select-none"
              >
                <FaHeart className="text-white" />
                <p>{isWishlisted ? "WISHLISTED" : "WISHLIST"}</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-[60%] flex flex-col gap-6">
            <div className="flex flex-col gap-1 border-b-2 border-[#E0E0E0]">
              <p className="text-xl sm:text-2xl md:text-3xl text-[#373434]">{book.bookName}</p>
              <p className="text-[#878787] text-sm sm:text-base md:text-lg">by {book.author}</p>
              <div className="flex text-xs sm:text-sm items-center gap-2">
                <div className="flex h-5 px-2 items-center justify-center text-white text-xs bg-[#388E3C] rounded-sm">
                  <span>4.5</span>
                  <IoStar className="text-white text-xs ml-0.5" />
                </div>
                <p className="text-[#878787]">{book.quantity}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 mb-5">
                <p className="font-semibold text-[#373434] text-xl sm:text-2xl md:text-3xl">Rs {book.discountPrice}</p>
                <p className="text-[#878787] text-xs sm:text-sm line-through">Rs {book.price}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-b-2 border-[#E0E0E0]">
              <p className="text-[#878787] text-sm">Book Details</p>
              <p className="text-[#373434] text-xs sm:text-sm mb-10">{book.description}</p>
            </div>
            <div>
              <FeedbackForm productId={book._id}/>
              <Feedback bookId={book._id} />
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default BookDetail;