import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../../../public/Group.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const oauthLink = `${import.meta.env.VITE_APP_BACKEND_URL}/auth/google`;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
          <h2 className="mt-10 text-white text-center text-2xl font-bold leading-9 tracking-tight ">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <label className="input input-bordered flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                className="grow border-0 focus:ring-0"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="text"
                className="grow border-0 focus:ring-0"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FontAwesomeIcon icon={faKey} />
              <input
                type="password"
                className="grow border-0 focus:ring-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FontAwesomeIcon icon={faKey} />
              <input
                type="password"
                className="grow border-0 focus:ring-0"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded checkbox checkbox-primary"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-white">
                I agree to the <a href="#" className="font-medium text-indigo-400 hover:text-indigo-500">terms and conditions</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isChecked}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                  isChecked ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'bg-gray-500 cursor-not-allowed'
                }`}
              >
                Sign up
              </button>
            </div>
          </form>

          <Link to={oauthLink}>
            <div className='w-full h-16 '>
              <p className='text-center text-white separator my-5'>or</p>
              <div>
                <div className='flex flex-row w-full h-full rounded-xl overflow-hidden'>
                  <div className='bg-blue-600 p-2 h-10 text-center'>
                    <img className="w-6 " src={Icon} alt="google" />
                  </div>
                  <div className='bg-white w-full text-center p-2'>
                    <p className='text-center font-medium text-black my-auto'>Sign Up With Google</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className='text-center text-white'>
        <p>Already have an account? <Link to="/auth/signin" className='text-blue-500 underline'>Signin Here</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
