import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Icon from "/Group.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUserSecret } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const oauthLink = `${import.meta.env.VITE_APP_BACKEND_URL}/auth/google`;
  const forgotPasswordLink = `${import.meta.env.VITE_APP_BACKEND_URL}/user/forgot-password`;
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;  // Ensure this is correctly set in your environment variables

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${backendUrl}/login`, { email, password });

      const data = response.data;
      localStorage.setItem('token', data.token);
      // Redirect to the home page or other protected page
      navigate('/');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
    }
  };

  return (
    <div className='px-4 py-8'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 rounded-full w-auto"
            src="https://i.pinimg.com/236x/8b/7b/68/8b7b688981e734ce6367f771f9a1cd28.jpg"
            alt="westream"
          />
          <h2 className="mt-10 text-white text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <label className="input input-bordered flex items-center gap-2">
              <FontAwesomeIcon icon={faUserSecret} />
              <input
                type="email"
                className="grow focus:ring-0 border-0"
                placeholder="Email"
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FontAwesomeIcon icon={faKey} />
              <input
                type="password"
                autoComplete='current-password'
                className="grow focus:ring-0 border-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <Link to={oauthLink}>
            <div className='w-full h-16'>
              <p className='text-center text-white separator my-5'>or</p>
              <div>
                <div className='flex flex-row w-full h-full rounded-xl overflow-hidden'>
                  <div className='bg-blue-600 p-2 h-10 text-center'>
                    <img className="w-6" src={Icon} alt="google" />
                  </div>
                  <div className='bg-white w-full text-center p-2'>
                    <p className='text-center font-medium text-black my-auto'>Sign In With Google</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="text-center">
        <p>Don't have an Account? <Link to="/auth/signup" className='text-blue-500 underline'>SignUp Here</Link></p>
      </div>
    </div>
  );
}

export default SignIn;
