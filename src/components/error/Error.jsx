import React from 'react'

const Error = () => {
  return (
    <div className="h-screen bg-black flex justify-center align-middle">
    <div className='my-auto'>

    <div className='text-center'>
      <img src="/thumbup.png" alt="humm" className='h-40 mx-auto'/>
    </div>
      <div>
        <div className='flex text-pink-600 justify-center font-bold text-6xl tracking-widest'>
        <span>5</span> 
        <p className='transform rotate-12'>0</p> 
        <span>0</span>

        </div>
      </div>
      <div>
        <p className='text-center'>You messed up something now we need to fix it again.Thank You!</p>
      </div>
    </div>
    </div>
  )
}

export default Error
