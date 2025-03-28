import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookCover from '../../assets/bookImage.png';
import { FaPlus, FaMinus, FaMapMarkerAlt } from 'react-icons/fa';
import { getCartItems, removeFromCart, updateCartItemQuantity } from '../../Utils/API.js';
import Header from '../Common/Header.js';
import Breadcrumbs from '../Common/Breadcrumbs.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface CartItem {
  id: string;
  name: string;
  author: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC = () => {
  const navigate = useNavigate();
  const [isAddressVisible, setIsAddressVisible] = useState<boolean>(false);
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState<boolean>(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState<number>(0);

  
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getCartItems();
        if (response.success && Array.isArray(response.result)) {
          const cartItems: CartItem[] = response.result
            .filter((item: any) => item.product_id && typeof item.product_id === 'object')
            .map((item: any) => ({
              id: item._id,
              name: item.product_id.bookName || 'Unknown Book',
              author: item.product_id.author || 'Unknown Author',
              price: item.product_id.discountPrice || 0,
              originalPrice: item.product_id.price || 0,
              image: item.product_id.bookImage || bookCover,
              quantity: item.quantityToBuy || 1,
            }));
          setItems(cartItems);
        } else {
          setError(response.message || 'Failed to fetch cart items');
          setItems([]); // Reset items on failure
        }
      } catch (err) {
        const errorMessage =
          (err as any).response?.data?.message || (err as any).message || 'Failed to fetch cart items';
        setError(errorMessage);
        setItems([]); // Reset items on error
        console.error("Cart fetch error:", errorMessage); 
        if (errorMessage === 'No authentication token found. Please log in.') {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate, cartUpdateTrigger]);

  const toggleAddressVisibility = () => setIsAddressVisible(!isAddressVisible);
  const toggleOrderSummaryVisibility = () => setIsOrderSummaryVisible(!isOrderSummaryVisible);

  const updateQuantity = async (id: string, delta: number) => {
    const item = items.find(item => item.id === id);
    if (!item || item.quantity + delta <= 0) return;

    const newQuantity = item.quantity + delta;

    try {
      const response = await updateCartItemQuantity(id, newQuantity);
      if (response.success) {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
        setCartUpdateTrigger(prev => prev + 1);
      } else {
        setError(response.message || 'Failed to update quantity');
      }
    } catch (err) {
      const errorMessage =
        (err as any).response?.data?.message || (err as any).message || 'Failed to update quantity';
      setError(errorMessage);
      if (errorMessage === 'No authentication token found. Please log in.') {
        navigate('/login');
      }
    }
  };

  const removeItem = async (id: string) => {
    try {
      const response = await removeFromCart(id);
      if (response.success) {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        setCartUpdateTrigger(prev => prev + 1);
        toast.success('Removed from cart', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        setError(response.message || 'Failed to remove item from cart');
      }
    } catch (err) {
      const errorMessage =
        (err as any).response?.data?.message || (err as any).message || 'Failed to remove item from cart';
      setError(errorMessage);
      if (errorMessage === 'No authentication token found. Please log in.') {
        navigate('/login');
      }
    }
  };

  const clearCart = async () => {
    try {
      const removePromises = items.map(item => removeFromCart(item.id));
      await Promise.all(removePromises);
      setItems([]);
      setCartUpdateTrigger(prev => prev + 1);
    } catch (err) {
      const errorMessage =
        (err as any).response?.data?.message || (err as any).message || 'Failed to clear cart';
      setError(errorMessage);
      if (errorMessage === 'No authentication token found. Please log in.') {
        navigate('/login');
      }
    }
  };

  const handleCheckout = async () => {
    try {
      await clearCart();
      toast.success('Order placed successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/confirmorder');
    } catch (err) {
      const errorMessage =
        (err as any).response?.data?.message || (err as any).message || 'Failed to place order';
      toast.error(errorMessage);
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = items.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Header container="home" onCartUpdate={cartUpdateTrigger} />
      <div className="container px-4 min-h-screen m-auto">
        <Breadcrumbs container="cart" />
        <main className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[55px] py-4 sm:py-6">
          {loading ? (
            <div className="text-center py-10">Loading cart items...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <>
              <div className="border border-gray-300 p-4 sm:p-6 md:p-6 w-full bg-white rounded-md mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-lg font-semibold mb-2 sm:mb-0">My cart ({items.length})</h2>
                  <div className="relative w-full sm:w-72">
                    <select className="w-full border px-4 py-2 rounded appearance-none pr-10">
                      <option>Use current location</option>
                    </select>
                    <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {items.length === 0 ? (
                  <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map(item => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 sm:w-24 sm:h-28 object-cover"
                        />
                        <div className="flex flex-col justify-between w-full">
                          <div>
                            <h3 className="text-base font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">by {item.author}</p>
                            <p className="text-lg font-bold mt-2">
                              Rs. {item.price}
                              <span className="line-through text-gray-400 text-sm ml-2">
                                Rs. {item.originalPrice}
                              </span>
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-4">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className={`w-7 h-7 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full ${
                                item.quantity === 1 ? 'text-[#DBDBDB]' : 'text-black'
                              }`}
                            >
                              <FaMinus />
                            </button>
                            <div className="w-8 h-7 select-none flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2">
                              <p className="text-lg">{item.quantity}</p>
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center bg-[#FAFAFA] border-[#DBDBDB] border-2 rounded-full"
                            >
                              <FaPlus />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-blue-500 text-sm ml-4"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border border-gray-300 p-4 sm:p-6 w-full bg-white rounded-md mt-5">
                <h2
                  className="text-base font-semibold mb-4 cursor-pointer flex items-center justify-between"
                  onClick={toggleAddressVisibility}
                >
                  Customer Details
                </h2>
                {isAddressVisible && (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <textarea
                        placeholder="Address (Area and Street)"
                        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City/Town</label>
                      <input
                        type="text"
                        placeholder="City/District/Town"
                        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        placeholder="State"
                        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <div className="flex items-center">
                          <input type="radio" name="addressType" value="home" className="mr-2" />
                          <label>Home</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" name="addressType" value="work" className="mr-2" />
                          <label>Work</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" name="addressType" value="other" className="mr-2" />
                          <label>Other</label>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {items.length > 0 && (
                <div className="border border-gray-300 p-4 sm:p-6 w-full bg-white rounded-md mt-10">
                  <h2
                    className="text-lg font-semibold mb-4 cursor-pointer flex items-center justify-between"
                    onClick={toggleOrderSummaryVisibility}
                  >
                    Order Summary
                  </h2>
                  {isOrderSummaryVisible && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Price ({items.length} item{items.length > 1 ? 's' : ''})</span>
                        <span>Rs. {totalAmount + totalDiscount}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Discount</span>
                        <span className="text-green-600">- Rs. {totalDiscount}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Delivery Charges</span>
                        <span className="text-green-600">FREE</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total Amount</span>
                        <div className="gap-4 md:flex items-center">
                          <span>Rs. {totalAmount}</span>
                          <button
                            className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded hover:bg-blue-700"
                            onClick={handleCheckout}
                          >
                            CHECKOUT
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartItem;