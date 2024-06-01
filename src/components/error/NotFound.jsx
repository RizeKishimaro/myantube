import React from 'react'

const NotFound = () => {
  return (
    <div className="h-screen bg-black flex justify-center align-middle">
    <div className='my-auto'>
      
    <div className='text-center'>
      <img src="/public/humm.png" alt="humm" className='h-40 mx-auto'/>
    </div>
      <div>
        <div className='flex text-pink-600 justify-center font-bold text-6xl tracking-widest'><span>4</span> <p className='transform rotate-12'>0</p> <span>4</span></div>
      </div>
      <div>
        <p>Humm....There is nothing here but Trash.</p>
      </div>
    </div>
    </div>
  )
}

export default NotFound
