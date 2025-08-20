
/*
import { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import login from "../assets/images/login.svg";
import { useNavigate } from 'react-router-dom';

export const Login = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      setIsFormValid(email.trim() !== '' && password.trim() !== '');
    } else {
      setIsFormValid(
        firstName.trim() !== '' &&
        lastName.trim() !== '' &&+
        email.trim() !== '' &&
        password.trim() !== '' &&
        confirmPassword.trim() !== '' &&
        password === confirmPassword
      );
    }
  }, [email, password, confirmPassword, firstName, lastName, isLogin]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isLogin) {
        // Registration
        const userData = {
          customer_name: `${firstName} ${lastName}`,
          email,
          password_hash: password
        };

        const response = await fetch("http://localhost:5000/register", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
          setIsLogin(true);
          setError('');
          setFirstName('');
          setLastName('');
          setPassword('');
          setConfirmPassword('');
        } else {
          setError(result.error || result.message);
        }
      } else {
        // Login
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password_hash: password }),
        });

        const responseData = await response.json();
        console.log(responseData, "responseDataaaa");

        if (response.ok) {
          if (responseData.message === 'Login successful') {
         
            sessionStorage.setItem("customer_id", responseData.customerId);
            sessionStorage.setItem("cart_id", responseData.cartId);

            onClose();
            navigate('/home');
          } else {
            setError(responseData.message);
          }
        } else {
          setError(responseData.message || 'An error occurred. Please try again later.');
        }
      }
    } catch (err) {
      setError('Network server error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleToLogin = () => {
    setIsLogin(true);
    setError('');
    setFirstName('');
    setLastName('');
    setConfirmPassword('');
    setPassword('');
  };

  const handleToRegister = () => {
    setIsLogin(false);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex rounded-lg w-[40%] h-[70%] relative max-w-auto bg-white shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
          disabled={loading}
        >
          <IoMdClose className="h-6 w-6" />
        </button>

        <div className="w-[45%]">
          <img src={login} alt="Login" className="bg-[url('https://content.dmart.in/website/_next/static/media/auth-background.f7749174.png')]" style={{ height: "673px" }} />
        </div>

        <div className="w-1/2 py-4 text-center">
          <p className="font-semibold text-gray-800 mb-4">
            {isLogin ? "Login to Your Account" : "Help Us Know You Better"}
          </p>
          <hr className="max-w-auto" />

          {!isLogin ? (
            <form onSubmit={handleSubmit}>
              <div className="mt-6 text-start ml-8">
                <div className='flex gap-4'>
                  <input
                    className='border text-sm rounded-md block w-full p-2'
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    className='border text-sm rounded-md block w-full p-2'
                    value={lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                </div>
                <div className='my-4'>
                  <input
                    className='border text-sm rounded-md block w-full p-2'
                    type="email"
                    name='email'
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </div>

                <div className='flex my-4 gap-2'>
                  <input
                    className='border text-sm rounded-md block w-full p-2'
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    placeholder="Password"
                  />
                  <input
                    className='border text-sm rounded-md block w-full p-2'
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                  />
                </div>

                <p className='text-sm mt-10'>By continuing, you agree to our Terms, Refunds, and Privacy Policy</p>
              </div>

              {error && <div className="text-red-500 pl-10">{error}</div>}

              <div>
                <button 
                  className={`w-[80%] text-white rounded-sm text-sm px-5 py-2.5 text-center ${isFormValid ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'}`}
                  type="submit"
                  disabled={!isFormValid || loading}
                >
                  {loading ? 'Processing...' : 'Register'}
                </button>
              </div>

              <div className='mt-8'>
                <button type="button" onClick={handleToLogin} className="text-black-500">
                  Already have an account? Login
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center">
                <section className="bg-white rounded-lg p-4 mx-2 my-4 max-w-md w-full">
                  <div className="mb-6">
                    <input
                      name="email"
                      type="email"
                      placeholder='Email'
                      className="border text-sm rounded-lg block w-full p-2.5"
                      value={email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      name="password"
                      type="password"
                      placeholder='Password'
                      className="border text-sm rounded-lg block w-full p-2.5"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    className={`w-[90%] text-white rounded-sm text-sm px-5 py-2.5 mt-6 ${isFormValid ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'}`}
                    disabled={!isFormValid || loading}
                  >
                    {loading ? 'Processing...' : 'Login'}
                  </button>

                  <button type="button" onClick={handleToRegister} className="text-black-500 mt-4">
                    Don't have an account? Register
                  </button>
                </section>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

*/


//web api
import { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import login from "../assets/images/login.svg";
import { useNavigate } from 'react-router-dom';

export const Login = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      setIsFormValid(username.trim() !== '' && password.trim() !== '');
    } else {
      setIsFormValid(
        firstName.trim() !== '' &&
        lastName.trim() !== '' &&
        username.trim() !== '' &&
        email.trim() !== '' &&
        password.trim() !== '' &&
        confirmPassword.trim() !== '' &&
        password === confirmPassword
      );
    }
  }, [email, username, password, confirmPassword, firstName, lastName, isLogin]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isLogin) {
        // Registration
        const userData = {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
          role: "Customer"
        };

        const response = await fetch("https://localhost:7001/api/User/register", {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
          setIsLogin(true);
          setError('Registration successful! Please login.');
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          setError(result.message || 'Registration failed');
        }
      } else {
        // Login using Basic Authentication
        const credentials = btoa(`${username}:${password}`);

        const response = await fetch("https://localhost:7001/api/User/login", {
          method: "GET",
          headers: { 
            "Authorization": `Basic ${credentials}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Login response:', responseData);
          
          // FIXED: Store the correct customer ID from the response
          // Assuming your API returns user data with customerId field
          // Adjust the field name based on your actual API response structure
          const customerId = responseData.customerId || responseData.id || responseData.userId;
          
          if (customerId) {
            sessionStorage.setItem("customer_id", customerId.toString());
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("isLoggedIn", "true");
            
            console.log('Stored customer_id:', customerId);
          } else {
            console.error('No customer ID found in login response');
            setError('Login successful but customer ID not found');
            return;
          }
          
          onClose();
          navigate('/home');
        } else {
          const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
          setError(errorData.message || 'Invalid credentials');
        }
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleToLogin = () => {
    setIsLogin(true);
    setError('');
    setFirstName('');
    setLastName('');
    setConfirmPassword('');
    setPassword('');
  };

  const handleToRegister = () => {
    setIsLogin(false);
    setError('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex rounded-lg w-[40%] h-[70%] relative max-w-auto bg-white shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
          disabled={loading}
        >
          <IoMdClose className="h-6 w-6" />
        </button>

        <div className="w-[45%]">
          <img src={login} alt="Login" className="bg-[url('https://content.dmart.in/website/_next/static/media/auth-background.f7749174.png')]" style={{ height: "673px" }} />
        </div>

        <div className="w-1/2 py-4 text-center">
          <p className="font-semibold text-gray-800 mb-4">
            {isLogin ? "Login to Your Account" : "Help Us Know You Better"}
          </p>
          <hr />

          {!isLogin ? (
            <form onSubmit={handleSubmit}>
              <div className="mt-6 text-start ml-8">
                <div className='flex gap-4'>
                  <input
                    className='border text-sm rounded-md block w-full p-2'
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    className='border text-sm rounded-md block w-full p-2'
                    value={lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className='my-4'>
                  <input
                    className='border text-sm rounded-md block w-full p-2'
                    type="text"
                    name='username'
                    value={username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                  />
                </div>
                <div className='my-4'>
                  <input
                    className='border text-sm rounded-md block w-full p-2'
                    type="email"
                    name='email'
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className='flex my-4 gap-2'>
                  <input
                    className='border text-sm rounded-md block w-full p-2'
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                  />
                  <input
                    className='border text-sm rounded-md block w-full p-2'
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <p className='text-sm mt-10'>By continuing, you agree to our Terms, Refunds, and Privacy Policy</p>
              </div>

              {error && <div className="text-red-500 pl-10 text-sm mt-2">{error}</div>}

              <div className="mt-4">
                <button 
                  className={`w-[80%] text-white rounded-sm text-sm px-5 py-2.5 text-center ${isFormValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                  type="submit"
                  disabled={!isFormValid || loading}
                >
                  {loading ? 'Processing...' : 'Register'}
                </button>
              </div>

              <div className='mt-8'>
                <button type="button" onClick={handleToLogin} className="text-blue-500 hover:text-blue-700">
                  Already have an account? Login
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center">
                <section className="bg-white rounded-lg p-4 mx-2 my-4 max-w-md w-full">
                  <div className="mb-6">
                    <input
                      name="username"
                      type="text"
                      placeholder='Username'
                      className="border text-sm rounded-lg block w-full p-2.5"
                      value={username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      name="password"
                      type="password"
                      placeholder='Password'
                      className="border text-sm rounded-lg block w-full p-2.5"
                      value={password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                  <button
                    type="submit"
                    className={`w-[90%] text-white rounded-sm text-sm px-5 py-2.5 mt-6 ${username && password ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                    disabled={!username || !password || loading}
                  >
                    {loading ? 'Processing...' : 'Login'}
                  </button>

                  <button type="button" onClick={handleToRegister} className="text-blue-500 hover:text-blue-700 mt-4">
                    Don't have an account? Register
                  </button>
                </section>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};







// import { useState, useEffect } from 'react';
// import { IoMdClose } from "react-icons/io";
// import login from "../assets/images/login.svg";
// import { useNavigate } from 'react-router-dom';

// export const Login = ({ onClose }) => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const navigate = useNavigate();

//   const handleNameChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "firstName") {
//       setFirstName(value);
//     } else if (name === "lastName") {
//       setLastName(value);
//     }
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/customer/email", {
//           method: 'GET',
//           headers: {
//             'email': email,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         if (data.length > 0) {
//           setError('This email is already registered');
//         } else {
//           setError("");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (email && !isLogin) {
//       fetchData();
//     }
//   }, [email, isLogin]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (!isLogin) {
//         // Registration 
//         if (!firstName || !lastName) {
//           setError('First name and last name are required');
//           return;
//         }
//         if (!email || !password || !confirmPassword) {
//           setError('Email and password are required');
//           return;
//         }
//         if (password !== confirmPassword) {
//           setError('Passwords do not match');
//           return;
//         }

//         const userData = { customer_name: `${firstName} ${lastName}`, email, password_hash: password };
//         const response = await fetch("http://localhost:5000/register", {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(userData),
//         });

//         const result = await response.json();

//         if (response.ok) {
//           setIsLogin(true);
//           setError('');
//           setFirstName('');
//           setLastName('');
//           setPassword('');
//           setConfirmPassword('');
//         } else {
//           setError(result.error || result.message);
//         }
//       } else {
//         // Login 
//         if (!email || !password) {
//           setError('Email and password are required');
//           return;
//         }

//         const response = await fetch("http://localhost:5000/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             password_hash: password,
//           }),
//         });

//         const responseData = await response.json();

//         if (response.ok) {
//           if (responseData.message === 'Successfully logged in') {
//             onClose();
//             navigate('/home');
//           } else {
//             setError(responseData.message);
//           }
//         } else {
//           setError(responseData.message);
//         }
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToLogin = () => {
//     setIsLogin(true);
//     setError('');
//     setFirstName('');
//     setLastName('');
//     setConfirmPassword('');
//     setPassword('');
//   };

//   const handleToRegister = () => {
//     setIsLogin(false);
//     setError('');
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setFirstName('');
//     setLastName('');
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="flex rounded-lg w-[40%] h-[70%] relative max-w-auto bg-white shadow-lg">
//         <button
//           className="absolute top-4 right-4 text-gray-600"
//           onClick={onClose}
//           disabled={loading}
//         >
//           <IoMdClose className="h-6 w-6" />
//         </button>

//         <div className="w-[45%]">
//           <img src={login} alt="Login" className="bg-[url('https://content.dmart.in/website/_next/static/media/auth-background.f7749174.png')]" style={{ height: "673px" }} />
//         </div>

//         <div className="w-1/2 py-4 text-center">
//           <p className="font-semibold text-gray-800 mb-4">
//             {isLogin ? "Login to Your Account" : "Help Us Know You Better"}
//           </p>
//           <hr className="max-w-auto" />
//           {!isLogin ? (
//             <form onSubmit={handleSubmit}>
//               <div className="mt-6 text-start ml-8 ">
//                 <div className='flex gap-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2 '
//                     type="text"
//                     name="firstName"
//                     value={firstName}
//                     onChange={handleNameChange}
//                     placeholder="First Name"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     className='border text-sm rounded-md block w-full p-2'
//                     value={lastName}
//                     onChange={handleNameChange}
//                     placeholder="Last Name"
//                   />
//                 </div>
//                 <div className='my-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="email"
//                     name='email'
//                     value={email}
//                     onChange={handleEmailChange}
//                     placeholder="Email"
//                   />
//                 </div>
//                 {error && <div className="text-red-500 pl-10">{error}</div>}

//                 <div className='flex my-4 gap-2'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Password"
//                   />

//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     placeholder="Confirm Password"
//                   />
//                 </div>


//                 <p className='text-sm rounded-md block w-full p-2 mt-10'>By continuing, you agree to our Terms, Refunds and Privacy Policy</p>
//               </div>
//               <div >
//                 <button className='w-[80%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 text-center' type="submit" disabled={loading}>{loading ? 'Processing...' : 'Register'}</button>
//               </div>

//               <div className='mt-8'>
//                 <button
//                   type="button"
//                   onClick={handleToLogin}
//                   className="text-black-500"
//                 >
//                   Already have an account? Login
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="flex justify-center ">
//                 <section className="bg-white rounded-lg p-4 mx-2 my-4 max-w-md w-full">
//                   {/* <p className="text-2xl text-center font-semibold dark:text-slate-100 underline underline-offset-8">Login</p> */}
//                   <div className="mb-6">
//                     {/* <label htmlFor="email" className="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-gray-300">Email</label> */}
//                     <input
//                       name="email"
//                       type="email"
//                       id="email"
//                       placeholder='Email'
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={email}
//                       onChange={handleEmailChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-6">
//                     {/* <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label> */}
//                     <input
//                       name="password"
//                       type="password"
//                       id="password"
//                       placeholder='password'
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={password}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                   </div>

//                   {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}
//                   <button
//                     type="submit"
//                     className='w-[90%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 mt-6 text-center'
//                     disabled={loading}
//                   >
//                     {loading ? 'Processing...' : 'Login'}
//                   </button>

//                   <button
//                     type="button"
//                     onClick={handleToRegister}
//                     className="text-black-500 mt-4"
//                   >
//                     Don't have an account? Register
//                   </button>
//                 </section>
//               </div>


//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };




// import { useState, useEffect } from 'react';
// import { IoMdClose } from "react-icons/io";
// import login from "../assets/images/login.svg";
// import { useNavigate } from 'react-router-dom';

// export const Login = ({ onClose }) => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [isFormValid, setIsFormValid] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isLogin) {
//       setIsFormValid(email.trim() !== '' && password.trim() !== '');
//     } else {
//       setIsFormValid(
//         firstName.trim() !== '' &&
//         lastName.trim() !== '' &&
//         email.trim() !== '' &&
//         password.trim() !== '' &&
//         confirmPassword.trim() !== '' &&
//         password === confirmPassword
//       );
//     }
//   }, [email, password, confirmPassword, firstName, lastName, isLogin]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "firstName") setFirstName(value);
//     else if (name === "lastName") setLastName(value);
//     else if (name === "email") setEmail(value);
//     else if (name === "password") setPassword(value);
//     else if (name === "confirmPassword") setConfirmPassword(value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (!isLogin) {
//         // Registration
//         const userData = { 
//           customer_name: `${firstName} ${lastName}`, 
//           email, 
//           password_hash: password 
//         };

//         const response = await fetch("http://localhost:5000/register", {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(userData),
//         });

//         const result = await response.json();

//         if (response.ok) {
//           setIsLogin(true);
//           setError('');
//           setFirstName('');
//           setLastName('');
//           setPassword('');
//           setConfirmPassword('');
//         } else {
//           setError(result.error || result.message);
//         }
//       } else {
//         // Login
//         const response = await fetch("http://localhost:5000/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password_hash: password }),
//         });

//         const responseData = await response.json();

//         if (response.ok) {
//           if (responseData.message === 'Successfully logged in') {
//             onClose();
//             navigate('/home');
//           } else {
//             setError(responseData.message);
//           }
//         } else {
//           setError(responseData.message);
//         }
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToLogin = () => {
//     setIsLogin(true);
//     setError('');
//     setFirstName('');
//     setLastName('');
//     setConfirmPassword('');
//     setPassword('');
//   };

//   const handleToRegister = () => {
//     setIsLogin(false);
//     setError('');
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setFirstName('');
//     setLastName('');
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="flex rounded-lg w-[40%] h-[70%] relative max-w-auto bg-white shadow-lg">
//         <button
//           className="absolute top-4 right-4 text-gray-600"
//           onClick={onClose}
//           disabled={loading}
//         >
//           <IoMdClose className="h-6 w-6" />
//         </button>

//         <div className="w-[45%]">
//           <img src={login} alt="Login" className="bg-[url('https://content.dmart.in/website/_next/static/media/auth-background.f7749174.png')]" style={{ height: "673px" }} />
//         </div>

//         <div className="w-1/2 py-4 text-center">
//           <p className="font-semibold text-gray-800 mb-4">
//             {isLogin ? "Login to Your Account" : "Help Us Know You Better"}
//           </p>
//           <hr className="max-w-auto" />

//           {!isLogin ? (
//             <form onSubmit={handleSubmit}>
//               <div className="mt-6 text-start ml-8">
//                 <div className='flex gap-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="text"
//                     name="firstName"
//                     value={firstName}
//                     onChange={handleInputChange}
//                     placeholder="First Name"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     className='border text-sm rounded-md block w-full p-2'
//                     value={lastName}
//                     onChange={handleInputChange}
//                     placeholder="Last Name"
//                   />
//                 </div>
//                 <div className='my-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="email"
//                     name='email'
//                     value={email}
//                     onChange={handleInputChange}
//                     placeholder="Email"
//                   />
//                 </div>

//                 <div className='flex my-4 gap-2'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     name="password"
//                     value={password}
//                     onChange={handleInputChange}
//                     placeholder="Password"
//                   />
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     name="confirmPassword"
//                     value={confirmPassword}
//                     onChange={handleInputChange}
//                     placeholder="Confirm Password"
//                   />
//                 </div>

//                 <p className='text-sm mt-10'>By continuing, you agree to our Terms, Refunds, and Privacy Policy</p>
//               </div>

//               {error && <div className="text-red-500 pl-10">{error}</div>}

//               <div>
//                 <button 
//                   className={`w-[80%] text-white rounded-sm text-sm px-5 py-2.5 text-center ${isFormValid ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'}`}
//                   type="submit"
//                   disabled={!isFormValid || loading}
//                 >
//                   {loading ? 'Processing...' : 'Register'}
//                 </button>
//               </div>

//               <div className='mt-8'>
//                 <button type="button" onClick={handleToLogin} className="text-black-500">
//                   Already have an account? Login
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="flex justify-center">
//                 <section className="bg-white rounded-lg p-4 mx-2 my-4 max-w-md w-full">
//                   <div className="mb-6">
//                     <input
//                       name="email"
//                       type="email"
//                       placeholder='Email'
//                       className="border text-sm rounded-lg block w-full p-2.5"
//                       value={email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="mb-6">
//                     <input
//                       name="password"
//                       type="password"
//                       placeholder='Password'
//                       className="border text-sm rounded-lg block w-full p-2.5"
//                       value={password}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   {error && <p className="text-red-500 text-sm">{error}</p>}

//                   <button
//                     type="submit"
//                     className={`w-[90%] text-white rounded-sm text-sm px-5 py-2.5 mt-6 ${isFormValid ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'}`}
//                     disabled={!isFormValid || loading}
//                   >
//                     {loading ? 'Processing...' : 'Login'}
//                   </button>

//                   <button type="button" onClick={handleToRegister} className="text-black-500 mt-4">
//                     Don't have an account? Register
//                   </button>
//                 </section>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };



// import { useState, useEffect } from 'react';
// import { IoMdClose } from "react-icons/io";
// import login from "../assets/images/login.svg";
// import { useNavigate } from 'react-router-dom';

// export const Login = ({ onClose }) => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const navigate = useNavigate();

//   const handleNameChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "firstName") {
//       setFirstName(value);
//     } else if (name === "lastName") {
//       setLastName(value);
//     }
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   // Email validation (regex pattern)
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setLoading(true);

//     // Validate email and password 
//     if (!email || !isValidEmail(email)) {
//       setError('Please enter a valid email address.');
//       setLoading(false);
//       return;
//     }

//     if (!password) {
//       setError('Password cannot be empty.');
//       setLoading(false);
//       return;
//     }

//     try {
//       if (!isLogin) {
//         // Registration
//         if (!firstName || !lastName) {
//           setError('First name and last name are required');
//           setLoading(false);
//           return;
//         }
//         if (!email || !password || !confirmPassword) {
//           setError('Email and password are required');
//           setLoading(false);
//           return;
//         }
//         if (password !== confirmPassword) {
//           setError('Passwords do not match');
//           setLoading(false);
//           return;
//         }

//         const userData = { customer_name: `${firstName} ${lastName}`, email, password_hash: password };
//         const response = await fetch("http://localhost:5000/register", {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(userData),
//         });

//         const result = await response.json();

//         if (response.ok) {
//           setIsLogin(true);
//           setError('');
//           setFirstName('');
//           setLastName('');
//           setPassword('');
//           setConfirmPassword('');
//         } else {
//           setError(result.error || result.message);
//         }
//       } else {
//         // Login
//         const response = await fetch("http://localhost:5000/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             password_hash: password,
//           }),
//         });

//         const responseData = await response.json();

//         if (response.ok) {
//           if (responseData.message === 'Successfully logged in') {
//             onClose();
//             navigate('/home');
//           } else {
//             setError('check credentials');
//           }
//         } else {
//           setError('Invalid credentials.');
//         }
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToLogin = () => {
//     setIsLogin(true);
//     setError('');
//     setFirstName('');
//     setLastName('');
//     setConfirmPassword('');
//     setPassword('');
//   };

//   const handleToRegister = () => {
//     setIsLogin(false);
//     setError('');
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setFirstName('');
//     setLastName('');
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="flex rounded-lg w-[40%] h-[70%] relative max-w-auto bg-white shadow-lg">
//         <button
//           className="absolute top-4 right-4 text-gray-600"
//           onClick={onClose}
//           disabled={loading}
//         >
//           <IoMdClose className="h-6 w-6" />
//         </button>

//         <div className="w-[45%]">
//           <img src={login} alt="Login" className="bg-[url('https://content.dmart.in/website/_next/static/media/auth-background.f7749174.png')]" style={{ height: "673px" }} />
//         </div>

//         <div className="w-1/2 py-4 text-center">
//           <p className="font-semibold text-gray-800 mb-4">
//             {isLogin ? "Login to Your Account" : "Help Us Know You Better"}
//           </p>
//           <hr className="max-w-auto" />
//           {!isLogin ? (
//             <form onSubmit={handleSubmit}>
//               <div className="mt-6 text-start ml-8 ">
//                 <div className='flex gap-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2 '
//                     type="text"
//                     name="firstName"
//                     value={firstName}
//                     onChange={handleNameChange}
//                     placeholder="First Name"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     className='border text-sm rounded-md block w-full p-2'
//                     value={lastName}
//                     onChange={handleNameChange}
//                     placeholder="Last Name"
//                   />
//                 </div>
//                 <div className='my-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="email"
//                     name='email'
//                     value={email}
//                     onChange={handleEmailChange}
//                     placeholder="Email"
//                   />
//                 </div>
//                 {error && <div className="text-red-500 pl-10">{error}</div>}

//                 <div className='flex my-4 gap-2'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Password"
//                   />

//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     placeholder="Confirm Password"
//                   />
//                 </div>

//                 <p className='text-sm rounded-md block w-full p-2 mt-10'>By continuing, you agree to our Terms, Refunds and Privacy Policy</p>
//               </div>
//               <div >
//                 <button className='w-[80%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 text-center' type="submit" disabled={loading}>{loading ? 'Processing...' : 'Register'}</button>
//               </div>

//               <div className='mt-8'>
//                 <button
//                   type="button"
//                   onClick={handleToLogin}
//                   className="text-black-500"
//                 >
//                   Already have an account? Login
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="flex justify-center ">
//                 <section className="bg-white rounded-lg p-4 mx-2 my-4 max-w-md w-full">
//                   <div className="mb-6">
//                     <input
//                       name="email"
//                       type="email"
//                       id="email"
//                       placeholder='Email'
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                       value={email}
//                       onChange={handleEmailChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-6">
//                     <input
//                       name="password"
//                       type="password"
//                       id="password"
//                       placeholder='Password'
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                       value={password}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                   </div>

//                   {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}
//                   <button
//                     type="submit"
//                     className='w-[90%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 mt-6 text-center'
//                     disabled={loading}
//                   >
//                     {loading ? 'Processing...' : 'Login'}
//                   </button>

//                   <button
//                     type="button"
//                     onClick={handleToRegister}
//                     className="text-black-500 mt-4"
//                   >
//                     Don't have an account? Register
//                   </button>
//                 </section>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };














// import { useState, useEffect } from 'react';
// import { IoMdClose } from "react-icons/io";
// import login from "../assets/images/login.svg";
// import { useNavigate } from 'react-router-dom';

// export const Login = ({ onClose }) => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const navigate = useNavigate();

//   const handleNameChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "firstName") {
//       setFirstName(value);
//     } else if (name === "lastName") {
//       setLastName(value);
//     }
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/customer/email", {
//           method: 'GET',
//           headers: {
//             'email': email,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         if (data.length > 0) {
//           setError('This email is already registered');
//         } else {
//           setError("");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (email && !isLogin) {
//       fetchData();
//     }
//   }, [email, isLogin]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (!isLogin) {

//         if (!firstName || !lastName) {
//           setError('First name and last name are required');
//           return;
//         }
//         if (!email || !password || !confirmPassword) {
//           setError('Email and password are required');
//           return;
//         }
//         if (password !== confirmPassword) {
//           setError('Passwords do not match');
//           return;
//         }

//         const userData = { customer_name: `${firstName} ${lastName}`, email, password_hash: password };
//         const response = await fetch("http://localhost:5000/register", {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(userData),
//         });

//         const result = await response.json();

//         if (response.ok) {
//           setIsLogin(true);
//           setError('');
//           setFirstName('');
//           setLastName('');
//           setPassword('');
//           setConfirmPassword('');
//         } else {
//           setError(result.error || result.message);
//         }
//       } else {

//         if (!email || !password) {
//           setError('Email and password are required');
//           return;
//         }

//         const response = await fetch("http://localhost:5000/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             password_hash: password,
//           }),
//         });

//         const responseData = await response.json();

//         if (response.ok) {
//           if (responseData.message === 'Successfully logged in') {

//             onClose();
//             navigate('/home');
//           } else {
//             setError(responseData.message);
//           }
//         } else {
//           setError(responseData.message);
//         }
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="flex rounded-lg w-[40%] h-[70%] relative max-w-auto bg-white shadow-lg">
//         <button
//           className="absolute top-4 right-4 text-gray-600"
//           onClick={onClose}
//           disabled={loading}
//         >
//           <IoMdClose className="h-6 w-6" />
//         </button>

//         <div className="w-[45%]">
//           <img src={login} alt="Login" className="bg-[url('https://content.dmart.in/website/_next/static/media/auth-background.f7749174.png')]" style={{ height: "673px" }} />
//         </div>

//         <div className="w-1/2 py-4 text-center">
//           <p className="font-semibold text-gray-800 mb-4">
//             {isLogin ? "Login to Your Account" : "Help Us Know You Better"}
//           </p>
//           <hr className="max-w-auto" />
//           {!isLogin ? (
//             <form onSubmit={handleSubmit}>
//               <div className="mt-6 text-start ml-8 ">
//                 <div className='flex gap-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2 '
//                     type="text"
//                     name="firstName"
//                     value={firstName}
//                     onChange={handleNameChange}
//                     placeholder="First Name"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     className='border text-sm rounded-md block w-full p-2'
//                     value={lastName}
//                     onChange={handleNameChange}
//                     placeholder="Last Name"
//                   />
//                 </div>
//                 <div className='my-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="email"
//                     name='email'
//                     value={email}
//                     onChange={handleEmailChange}
//                     placeholder="Email"
//                   />
//                 </div>
//                 {error && <div className="text-red-500 pl-10">{error}</div>}

//                 <div className='flex my-4 gap-2'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Password"
//                   />

//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     placeholder="Confirm Password"
//                   />
//                 </div>


//                 <p className='text-sm rounded-md block w-full p-2 mt-10'>By continuing, you agree to our Terms, Refunds and Privacy Policy</p>
//               </div>
//               <div >
//                 <button className='w-[80%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 text-center' type="submit" disabled={loading}>{loading ? 'Processing...' : 'Register'}</button>
//               </div>

//               <div className='mt-8'>
//                 <button>login</button>
//               </div>

//             </form>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="flex justify-center bg-gray-50">
//                 <section className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//                   <p className="text-2xl text-center font-semibold dark:text-slate-100 underline underline-offset-8">Login</p>
//                   <div className="mb-6">
//                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
//                     <input
//                       name="email"
//                       type="email"
//                       id="email"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={email}
//                       onChange={handleEmailChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-6">
//                     <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
//                     <input
//                       name="password"
//                       type="password"
//                       id="password"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={password}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                   </div>

//                   {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}
//                   <button
//                     type="submit"
//                     className='w-[80%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 text-center'
//                     disabled={loading}
//                   >
//                     {loading ? 'Processing...' : 'Login'}
//                   </button>
//                 </section>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// import { useState,useEffect } from 'react';
// import { IoMdClose } from "react-icons/io";
// import login from "../assets/images/login.svg";
// import { useNavigate } from 'react-router-dom';

// export const Login = ({ onClose }) => {

//   const [isLogin, setIsLogin] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const navigate=useNavigate()
  

        
//       const handlenameChange = (event) => {
//         const { name, value } = event.target;
    
//         if (name === "firstName") {
//             setFirstName(value);
//         } else if (name === "lastName") {
//             setLastName(value);
//         }
//     };  
     
//   //       const handleEmailChange = (event) => {
//   //           setEmail(event.target.value);
//   //           const email = dataa.find((user) => user.email === event.target.value);
//   //   setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
//   //   if(email){
//   //     setError('this email is already registered');
     
//   // }
//   //       };
     
//         const handlePasswordChange = (event) => {
//           setPassword(event.target.value);
//         };
     
//         const handleConfirmPasswordChange = (event) => {
//             setConfirmPassword(event.target.value);
//         }; 
 

//         useEffect(() => {
//           const fetchData= async () => {
//             try {
//               const response = await fetch("http://localhost:5000/customer/email", {
//                 method:'GET',
//                 headers: {
//                   'email': email,
//               },
//               });
//               if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             console.log(data, "data------------------");

//             if (data.length > 0) {
//                 setError('This email is already registered');
//             } else {
//                 setError("");
//             }
//             }catch (error) {
//               console.error("Error fetching data:", error);
//             }
//           };


//            if (email) {
//             fetchData();
//         }
 
//         }, [email]);
 
//     const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
     
//       if (!isLogin) {


//         if (!firstName || !lastName) {
//           setError('First name and last name are required');
//           return;
//         }
//         if (!email || !password) {
//           setError('Email and password are required');
//           return;
//         }
//         if (password !== confirmPassword) {
//           setError('Passwords do not match');
//           return;
//         }


//         const userData = { customer_name: `${firstName} ${lastName}`, email, password_hash: password };

//         const response = await fetch("http://localhost:5000/register", {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(userData),
//         });

//         const result = await response.json();

//         if (response.ok) {
//           setIsLogin(true);
//           setError('');
//           setFirstName('');
//           setLastName('');
//           setPassword('');
//           setConfirmPassword('');

//         } else {
//           setError(result.error || result.message);
//         }
//       }

//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };


   
 
//   const  handleEmailKeyPress= (event) => {

    
      
//     console.log(event.key,"event key ");
//     if (event.key === "Enter"  ) {
//       console.log("entered a key down");
//         setEmail(event.target.value);
//       console.log(email,"email got");


//     }
    
 
// };




// async function handleLogin(event) {
//   event.preventDefault()
//   const email=event.target.email.value
// const password=event.target.password.value;
// try{
// const response=await fetch("http://localhost:5000/login",{
//   method:"POST",
//   headers:{
//     "content-type":"application/json",
//   },
//   body:JSON.stringify({
//     email:email,
//     password_hash:passw
//   })

// })
// }  catch(){

// }
// }





//   return ( 
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="flex rounded-lg w-[40%] h-[70%] relative max-w-auto bg-white shadow-lg">
//         <button
//           className="absolute top-4 right-4 text-gray-600"
//           onClick={onClose}
//           disabled={loading}
//         >
//           <IoMdClose className="h-6 w-6" />
//         </button>

//         <div className="w-[45%]">
//           <img src={login} alt="Login" className="bg-[url('https://content.dmart.in/website/_next/static/media/auth-background.f7749174.png')]" style={{ height: "673px" }} />
//         </div>

//         <div className="w-1/2 py-4 text-center">
//           <p className="font-semibold text-gray-800 mb-4">
//             {isLogin ? "Login to Your Account" : "Help Us Know You Better"}
//           </p>
//           <hr className="max-w-auto" />
//           {!isLogin ? (
//             <form onSubmit={handleSubmit}>

//               <div className="mt-6 text-start ml-8 ">
//                 <div className='flex gap-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2 '
//                     type="text"
//                     name="firstName"


//                     value={firstName}
//                     onChange={handlenameChange}
//                     placeholder="First Name"
//                   />
//                   <input
//                     type="text"    
//                     name="lastName"

//                     className='border text-sm rounded-md block w-full p-2'
//                     value={lastName}
//                     onChange={handlenameChange}
//                     placeholder="Last Name"
//                   />
//                 </div>
//                 <div className='my-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="email"
//                     name='email'
//                     // value="amaranadh@gmail.com"
//                     onKeyDown={handleEmailKeyPress}
//                     placeholder="Email"
//                   />
             
//                 </div>
//                 {error && <div className="text-red-500 pl-10">{error}</div>}
              
//                 <div className='flex my-4 gap-2'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Password"
//                   />

//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     placeholder="Confirm Password"
//                   />
//                 </div>

//                 <p className='text-sm rounded-md block w-full p-2 mt-10'>By continuing, you agree to our Terms, Refunds and Privacy Policy</p>

//               </div>
//               {/* {error && <p>{error}</p>} */}
//               <button className='w-[80%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 text-center' type="submit" disabled={loading}>{loading ? 'Processing...' : 'Register'}</button>
//             </form>
//           ) : (

//             <form onSubmit={handleSubmit}>
//                            <div className="my-4">
//                             <input
//                               className='border text-sm rounded-md block w-full p-2'
//                               type="email"
//                               value={email}
//                               // onChange={handleEmailChange}
//                               placeholder="Email"
//                             />
//                           </div>
//                           <div className="my-4">
//                             <input
//                               className='border text-sm rounded-md block w-full p-2'
//                               type="password"
//                               value={password}
//                               onChange={handlePasswordChange}
//                               placeholder="Password"
//                             />
//                           </div>
//                           {error && <div className="text-red-500 pl-10">{error}</div>}
//                           <button className='w-[80%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 text-center' type="submit" disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
//                        </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };



// import { useState, useEffect } from 'react';
// import { IoMdClose } from "react-icons/io";
// import login from "../assets/images/login.svg";

// export const Login = ({ onClose }) => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [isEmailValid, setIsEmailValid] = useState(true);
//   const [dataa, setData] = useState([]);

//   const handlenameChange = (event) => {
//     const { name, value } = event.target;

//     if (name === "firstName") {
//       setFirstName(value);
//     } else if (name === "lastName") {
//       setLastName(value);
//     }
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//     const email = dataa.find((user) => user.email === event.target.value);
//     setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
//     if (email) {
//       setError('This email is already registered');
//     }
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/customer");
//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (!isLogin) {
//         if (!firstName || !lastName) {
//           setError('First name and last name are required');
//           return;
//         }
//         if (!email || !password) {
//           setError('Email and password are required');
//           return;
//         }
//         if (password !== confirmPassword) {
//           setError('Passwords do not match');
//           return;
//         }

//         const userData = { customer_name: `${firstName} ${lastName}`, email, password_hash: password };

//         const response = await fetch("http://localhost:5000/register", {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(userData),
//         });

//         const result = await response.json();

//         if (response.ok) {
//           setIsLogin(true);
//           setError('');
//           setFirstName('');
//           setLastName('');
//           setPassword('');
//           setConfirmPassword('');
//         } else {
//           setError(result.error || result.message);
//         }
//       }

//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="flex rounded-lg w-[40%] h-[70%] relative max-w-auto bg-white shadow-lg">
//         <button
//           className="absolute top-4 right-4 text-gray-600"
//           onClick={onClose}
//           disabled={loading}
//         >
//           <IoMdClose className="h-6 w-6" />
//         </button>

//         <div className="w-[45%]">
//           <img src={login} alt="Login" className="bg-[url('https://content.dmart.in/website/_next/static/media/auth-background.f7749174.png')]" style={{ height: "673px" }} />
//         </div>

//         <div className="w-1/2 py-4 text-center">
//           <p className="font-semibold text-gray-800 mb-4">
//             {isLogin ? "Login to Your Account" : "Help Us Know You Better"}
//           </p>
//           <hr className="max-w-auto" />
//           {!isLogin ? (
//             <form onSubmit={handleSubmit}>
//               <div className="mt-6 text-start ml-8 ">
//                 <div className='flex gap-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2 '
//                     type="text"
//                     name="firstName"
//                     value={firstName}
//                     onChange={handlenameChange}
//                     placeholder="First Name"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     className='border text-sm rounded-md block w-full p-2'
//                     value={lastName}
//                     onChange={handlenameChange}
//                     placeholder="Last Name"
//                   />
//                 </div>
//                 <div className='my-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     placeholder="Email"
//                   />
//                 </div>
//                 {error && <div className="text-red-500 pl-10">{error}</div>}

//                 <div className='flex my-4 gap-2'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Password"
//                   />

//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     placeholder="Confirm Password"
//                   />
//                 </div>

//                 <p className='text-sm rounded-md block w-full p-2 mt-10'>By continuing, you agree to our Terms, Refunds and Privacy Policy</p>
//               </div>
//               <button className='w-[80%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 text-center' type="submit" disabled={loading}>{loading ? 'Processing...' : 'Register'}</button>
//             </form>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="my-4">
//                 <input
//                   className='border text-sm rounded-md block w-full p-2'
//                   type="email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   placeholder="Email"
//                 />
//               </div>
//               <div className="my-4">
//                 <input
//                   className='border text-sm rounded-md block w-full p-2'
//                   type="password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   placeholder="Password"
//                 />
//               </div>
//               {error && <div className="text-red-500 pl-10">{error}</div>}
//               <button className='w-[80%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 text-center' type="submit" disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };




// import { useState,useEffect } from 'react';
// import { IoMdClose } from "react-icons/io";
// import login from "../assets/images/login.svg";
// import { useNavigate } from 'react-router-dom';


// export const Login = ({ onClose }) => {
// const navigate=useNavigate();
//   const [isLogin, setIsLogin] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isEmailValid,setisEmailValid]=useState(true)
//   const [isUsername,setIsUsername]=useState(true)
//   const [data,SetData]=useState([])

 


//         const handleFirstnameChange = (event) => {
//             setFirstName(event.target.value);
//         };

//         const handleLastnameChange = (event) => {
//           setLastName(event.target.value);
//       };
        
     
//       const handleEmailChange = (event) => {
//                 setEmail(event.target.value);
//                 const emailExist = data.find((user) => user.email === event.target.value);
//                 console.log(emailExist, "....")
//                 if(emailExist){
//                     setError('this email is already registered');
                   
//                 }
         
//             };



            
//             const handlePasswordChange = (event) => {
//                       setPassword(event.target.value);
//                   };
     
//         const handleConfirmPasswordChange = (event) => {
//             setConfirmPassword(event.target.value);
//         }; 
 
 
//     const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
     
//       if (!isLogin) {


//         if (!firstName || !lastName) {
//           setError('First name and last name are required');
//           return;
//         }
//         if (!email || !password) {
//           setError('Email and password are required');
//           return;
//         }
//         if (password !== confirmPassword) {
//           setError('Passwords do not match');
//           return;
//         }


//         const userData = { customer_name: `${firstName} ${lastName}`, email, password_hash: password };

//         const response = await fetch("http://localhost:5000/register", {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(userData),
//         });

//         const result = await response.json();

//         if (response.ok) {
//           setIsLogin(true);
//           setError('');
//           setFirstName('');
//           setLastName('');
//           setPassword('');
//           setConfirmPassword('');

//         } else {
//           setError(result.error || result.message);
//         }
//       }

//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="flex rounded-lg w-[40%] h-[70%] relative max-w-auto bg-white shadow-lg">
//         <button
//           className="absolute top-4 right-4 text-gray-600"
//           onClick={onClose}
//           disabled={loading}
//         >
//           <IoMdClose className="h-6 w-6" />
//         </button>

//         <div className="w-[45%]">
//           <img src={login} alt="Login" className="bg-[url('https://content.dmart.in/website/_next/static/media/auth-background.f7749174.png')]" style={{ height: "673px" }} />
//         </div>

//         <div className="w-1/2 py-4 text-center">
//           <p className="font-semibold text-gray-800 mb-4">
//             {isLogin ? "Login to Your Account" : "Help Us Know You Better"}
//           </p>
//           <hr className="max-w-auto" />
//           {!isLogin ? (
//             <form onSubmit={handleSubmit}>

//               <div className="mt-6 text-start ml-8 ">
//                 <div className='flex gap-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2 '
//                     type="text"
//                     value={firstName}
//                     onChange={handleFirstnameChange}
//                     placeholder="First Name"
//                   />
//                   <input
//                     type="text"
//                     className='border text-sm rounded-md block w-full p-2'
//                     value={lastName}
//                     onChange={handleLastnameChange}
//                     placeholder="Last Name"
//                   />
//                 </div>
//                 <div className='my-4'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     placeholder="Email"
//                   />
//                 </div>


//                 <div className='flex my-4 gap-2'>
//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Password"
//                   />

//                   <input
//                     className='border text-sm rounded-md block w-full p-2'
//                     type="password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     placeholder="Confirm Password"
//                   />
//                 </div>

//                 <p className='text-sm rounded-md block w-full p-2 mt-10'>By continuing, you agree to our Terms, Refunds and Privacy Policy</p>

//               </div>
//               {error && <p>{error}</p>}
//               <button className='w-[80%] text-white bg-green-500 rounded-sm text-sm px-5 py-2.5 text-center' type="submit" disabled={loading}>{loading ? 'Processing...' : 'Register'}</button>
//             </form>
//           ) : (


//             <p>Login </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

