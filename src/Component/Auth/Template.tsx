import React, { useState } from 'react';
import loginSignUpImage from '../../assets/loginSignupImage.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoEyeOff, IoEye } from "react-icons/io5";
import { loginApiCall, signupApiCall } from '../../Utils/API.js';

type authTemplateProps = {
  container: string;
}

function Template({ container }: authTemplateProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: ""
  });
  
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^\d{10}$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!emailRegex.test(formData.email)) {
      setError(prev => ({ ...prev, email: "Invalid email format" }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, email: "" }));
    }

    if (!passwordRegex.test(formData.password)) {
      setError(prev => ({ 
        ...prev, 
        password: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, password: "" }));
    }

    if (isValid) {
      try {
        const res = await loginApiCall({ 
          email: formData.email, 
          password: formData.password 
        });
        navigate("/home");
      } catch (err: any) {
        setError(prev => ({ ...prev, email: err.response?.data?.message || "Login failed. Please check your credentials." }));
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!formData.fullName) {
      setError(prev => ({ ...prev, fullName: "Full name is required" }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, fullName: "" }));
    }

    if (!emailRegex.test(formData.email)) {
      setError(prev => ({ ...prev, email: "Invalid email format" }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, email: "" }));
    }

    if (!passwordRegex.test(formData.password)) {
      setError(prev => ({ 
        ...prev, 
        password: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, password: "" }));
    }

    if (!phoneRegex.test(formData.phone)) {
      setError(prev => ({ ...prev, phone: "Please enter a valid 10-digit phone number" }));
      isValid = false;
    } else {
      setError(prev => ({ ...prev, phone: "" }));
    }

    if (isValid) {
      try {
        const res = await signupApiCall({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });
        navigate("/");
      } catch (err: any) {
        setError(prev => ({ ...prev, email: err.response?.data?.message || "Signup failed. Email might already exist." }));
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#9D9D9D] px-4 py-6'>
      <div className='flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-6 md:gap-8'>
        
        <div className='bg-[#F5F5F5] w-full mr-[-80px] md:w-1/3 max-w-sm h-auto sm:h-[391px] rounded-3xl shadow-xl flex flex-col space-y-6 items-center justify-center p-4'>
          <div className='flex justify-center'>
            <img 
              className='rounded-full w-3/4 sm:w-[55%] max-w-[200px]' 
              src={loginSignUpImage} 
              alt='login-signup-image' 
            />
          </div>
          <div className='text-center'>
            <p className='font-semibold text-[#0A0102] text-sm sm:text-base md:text-lg'>
              ONLINE BOOK SHOPPING
            </p>
          </div>
        </div>

        
        <div className='bg-[#F5F5F5] w-full max-w-sm md:w-96 h-auto rounded-[7px] shadow-xl px-3 py-4 md:ml-4 lg:ml-8'>
          <div className='w-full'>
            <div className='flex justify-center font-semibold text-lg sm:text-xl md:text-2xl px-4 sm:px-12 py-5 pb-0 space-x-8 sm:space-x-14'>
              <div>
                <NavLink to={'/'}>
                  <p className={container === "login" ? "text-black cursor-pointer" : "text-[#878787] cursor-pointer"}>
                    LOGIN
                  </p>
                  {container === "login" && (
                    <div className='border-b-[6px] sm:border-b-[8px] rounded-xl ml-4 sm:ml-7 border-[#A03037] w-[32%] mt-1'/>
                  )}
                </NavLink>
              </div>
              <div>
                <NavLink to={'/register'}>
                  <p className={container === "register" ? "text-black cursor-pointer" : "text-[#878787] cursor-pointer"}>
                    SIGNUP
                  </p>
                  {container === "register" && (
                    <div className='border-b-[6px] sm:border-b-[8px] rounded-xl ml-4 sm:ml-8 border-[#A03037] w-[32%] mt-1'/>
                  )}
                </NavLink>
              </div>
            </div>
          </div>

          <div className='w-full flex-col flex justify-center'>
            <form 
              className='w-full px-4 sm:px-7 py-3' 
              onSubmit={container === "login" ? handleLogin : handleSignup}
            >
              {container === "register" && (
                <div className='flex w-full flex-col space-y-4'>
                  <div className='flex flex-col'>
                    <label className='text-xs sm:text-sm font-normal' htmlFor='fullName'>Full Name</label>
                    <input 
                      type='text' 
                      id='fullName' 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className='w-full h-9 sm:h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 text-xs sm:text-sm' 
                    />
                    {error.fullName && <p className='text-red-600 text-xs mt-1'>{error.fullName}</p>}
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-xs sm:text-sm font-normal' htmlFor='email'>Email Id</label>
                    <input 
                      type='text' 
                      id='email' 
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full h-9 sm:h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 text-xs sm:text-sm' 
                    />
                    {error.email && <p className='text-red-600 text-xs mt-1'>{error.email}</p>}
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-xs sm:text-sm font-normal' htmlFor='password'>Password</label>
                    <div className='relative'>
                      <input 
                        type={passwordVisible ? "text" : "password"} 
                        id='password' 
                        value={formData.password}
                        onChange={handleInputChange}
                        className='w-full h-9 sm:h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 text-xs sm:text-sm' 
                      />
                      {passwordVisible ? (
                        <IoEyeOff onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-2 top-2 sm:top-3 cursor-pointer text-[#9D9D9D]' />
                      ) : (
                        <IoEye onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-2 top-2 sm:top-3 cursor-pointer text-[#9D9D9D]' />
                      )}
                    </div>
                    {error.password && <p className='text-red-600 text-xs mt-1'>{error.password}</p>}
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-xs sm:text-sm font-normal' htmlFor='phone'>Mobile Number</label>
                    <input 
                      type='text' 
                      id='phone' 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full h-9 sm:h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 text-xs sm:text-sm' 
                    />
                    {error.phone && <p className='text-red-600 text-xs mt-1'>{error.phone}</p>}
                  </div>
                  <button 
                    type="submit" 
                    className='bg-[#A03037] text-xs sm:text-sm text-white w-full h-9 sm:h-10 rounded-sm mt-3'
                  >
                    Signup
                  </button>
                </div>
              )}
              {container === "login" && (
                <div className='flex w-full flex-col space-y-4'>
                  <div className='flex flex-col'>
                    <label className='text-xs sm:text-sm font-normal' htmlFor='email'>Email Id</label>
                    <input 
                      type='text' 
                      id='email' 
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full h-9 sm:h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 text-xs sm:text-sm' 
                    />
                    {error.email && <p className='text-red-600 text-xs mt-1'>{error.email}</p>}
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-xs sm:text-sm font-normal' htmlFor='password'>Password</label>
                    <div className='relative'>
                      <input 
                        type={passwordVisible ? "text" : "password"} 
                        id='password' 
                        value={formData.password}
                        onChange={handleInputChange}
                        className='w-full h-9 sm:h-10 border-2 rounded-sm p-2 outline-none focus:border-red-600 text-xs sm:text-sm' 
                      />
                      {passwordVisible ? (
                        <IoEyeOff onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-2 top-2 sm:top-3 cursor-pointer text-[#9D9D9D]' />
                      ) : (
                        <IoEye onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-2 top-2 sm:top-3 cursor-pointer text-[#9D9D9D]' />
                      )}
                    </div>
                    {error.password && <p className='text-red-600 text-xs mt-1'>{error.password}</p>}
                    <NavLink to={'forgotPassword'}>
                      <p className='text-right text-xs sm:text-sm text-[#9D9D9D] mt-1 cursor-pointer'>Forget Password?</p>
                    </NavLink>
                  </div>
                  <button 
                    type="submit" 
                    className='bg-[#A03037] text-xs sm:text-sm text-white w-full h-9 sm:h-10 rounded-sm mt-3'
                  >
                    Login
                  </button>
                  <div className='relative flex items-center justify-center my-3'>
                    <div className='absolute border-t border-[#E1E4EA] w-[80%]'></div>
                    <p className='relative bg-white px-2 sm:px-4 text-[#343434] font-bold text-base sm:text-lg z-10'>OR</p>
                  </div>
                  <div className='flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4'>
                    <button className='bg-[#4266B2] text-white text-xs sm:text-sm w-full sm:w-[40%] py-2 sm:py-3 rounded-sm'>Facebook</button>
                    <button className='bg-[#E4E4E4] text-black text-xs sm:text-sm w-full sm:w-[40%] py-2 sm:py-3 rounded-sm'>Google</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;