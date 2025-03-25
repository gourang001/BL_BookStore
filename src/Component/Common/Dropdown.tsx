import React, { useState, useEffect } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { IoBagOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { Popover } from 'antd';
import { NavLink } from 'react-router-dom';

type DropdownProps = {
  username?: string; 
};

function Dropdown({ username: propUsername }: DropdownProps) {
  const [username, setUsername] = useState(propUsername || ''); 

  
  useEffect(() => {
    if (propUsername) {
      setUsername(propUsername);
    } else {
      const storedUsername = localStorage.getItem('userName');
      if (storedUsername) {
        const displayName = storedUsername.split('5413')[0]; 
        setUsername(displayName);
      }
    }
  }, [propUsername]);

  
  const handleLogout = () => {
    localStorage.removeItem('userName'); 
    setUsername(''); 
  };

  
  const loggedIn = (
    <div className='flex flex-col items-start gap-5 py-2 px-3 w-[200px]'>
      <div className='flex flex-col items-start gap-2 w-full'>
        <p className='text-sm text-black font-semibold mb-2'>
          Hello {username || 'User'}
        </p>
        <NavLink to={'/profile'}>
          <div className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
            <div>
              <FaRegUser />
            </div>
            <p>Profile</p>
          </div>
        </NavLink>
        <NavLink to={'/order'}>
          <div className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
            <div>
              <IoBagOutline />
            </div>
            <p>My Orders</p>
          </div>
        </NavLink>
        <NavLink to={'/watchlist'}>
          <div className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
            <div>
              <IoMdHeartEmpty />
            </div>
            <p>My Wishlist</p>
          </div>
        </NavLink>
        <NavLink to={'/'}>
          <button
            onClick={handleLogout}
            className='text-[#A03037] font-semibold border-[#A03037] border-2 text-sm py-1 px-9 mt-2'
          >
            Logout
          </button>
        </NavLink>
      </div>
    </div>
  );

  
  const guest = (
    <div className='flex flex-col items-start gap-5 p-3'>
      <div className='flex flex-col items-start gap-1 border-b-2 w-full pb-4'>
        <p className='font-semibold text-sm'>Welcome</p>
        <p className='text-[#878787] font-semibold'>To access account and manage orders</p>
        <NavLink to={'/'}>
          <button className='text-[#A03037] font-semibold border-[#A03037] border-2 text-sm py-1 px-4 mt-2'>
            LOGIN/SIGNUP
          </button>
        </NavLink>
      </div>
      <div className='flex flex-col items-start gap-2 w-full'>
        <NavLink to={'/plz'}>
          <div className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
            <div>
              <IoBagOutline />
            </div>
            <p>My Orders</p>
          </div>
        </NavLink>
        <NavLink to={'/plz'}>
          <div className='flex items-center gap-2 text-sm text-[#878787] font-semibold'>
            <div>
              <IoMdHeartEmpty />
            </div>
            <p>Wishlist</p>
          </div>
        </NavLink>
      </div>
    </div>
  );

  
  const content = username ? loggedIn : guest;

  return (
    <Popover placement="bottom" content={content} trigger={'click'}>
      <div className='flex flex-col items-center justify-center cursor-pointer'>
        <div className='flex items-center justify-center h-6'>
          <FaRegUser className='text-white text-xl' />
        </div>
        <p className='text-white hidden md:block text-xs mt-1'>
          {username || 'Profile'} 
        </p>
      </div>
    </Popover>
  );
}

export default Dropdown;