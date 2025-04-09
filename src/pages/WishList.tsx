import React, { useState, useEffect } from 'react';
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';
import Breadcrumbs from '../components/Same/Breadcrumbs';
import { getWishlist, removeWishlist } from '../utils/API';
import WishListContainer from '../components/Same/WishListContainer';

function WishList() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const data = await getWishlist(token);
      setWishlist(data);
    } catch (err: any) {
      console.error('Fetch Wishlist Error:', err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      await removeWishlist(id);
      setWishlist((prev) => prev.filter((item) => item.product_id?._id !== id));
      await fetchWishlist(); 
    } catch (err: any) {
      console.error('Remove Wishlist Error:', err);
      await fetchWishlist();
    }
  };

  const renderWishlistContent = () => {
    if (loading) {
      return <p className="p-4">Loading...</p>;
    }

    if (!wishlist || wishlist.length === 0) {
      return <p className="p-4 text-center text-gray-500">Your wishlist is empty.</p>;
    }

    return wishlist.map((item) => {
      if (!item.product_id) return null;

      return (
        <div key={item.product_id._id}>
          <WishListContainer
            order={item}
            container="wishlist"
            onRemove={handleRemoveFromWishlist}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <Header container="home" />
      <div className="min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col gap-2 mt-2">
        <Breadcrumbs container="wishlist" />
        <div className="mt-5">
          <div className="p-4 bg-[#F5F5F5] border-2 border-[#E4E4E4]">
            <p className="font-bold">My Wishlist</p>
          </div>
          {renderWishlistContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WishList;