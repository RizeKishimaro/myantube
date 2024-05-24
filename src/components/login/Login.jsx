import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Icon from "./../../../public/Group.svg"
import { Link } from 'react-router-dom'

const Login = () => {
  const oauthLink = `${import.meta.env.VITE_APP_BACKEND_URL}/auth/google`;
  const forgotPasswordLink = `${import.meta.env.VITE_APP_BACKEND_URL}/user/forgot-password`
  return (
    <div className='px-4 py-8'>
  <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 rounded-full w-auto"
            src="https://i.pinimg.com/236x/8b/7b/68/8b7b688981e734ce6367f771f9a1cd28.jpg"
            alt="westream"
          />
          <h2 className="mt-10 text-white text-center text-2xl font-bold leading-9 tracking-tight ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium leading-6 ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-white text-sm font-medium leading-6">
                  Password
                </label>
                <div className="text-sm">
                  <Link to={forgotPasswordLink} className="font-semibold text-indigo-400 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
          <div className='w-full h-16 '>
            <p className='text-center text-white separator my-5'>or</p>
            <div>
              <div className='flex flex-row w-full h-full rounded-xl overflow-hidden'>
                <div className='bg-blue-600 p-2 h-10 text-center'>
                  <img className="w-6 " src={Icon} alt="google"/>
                </div>
                <div className='bg-white w-full text-center p-2'>
                 <p className='text-center font-medium  text-black my-auto'>Sign In With Google</p> 
                </div>
              </div>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
