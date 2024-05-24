import React from 'react'
import { Link } from 'react-router-dom'

const VideoInfo = ({id,image,title,views,uploaderImage,uploaderName,totalTime}) => {
  totalTime="4:32"

  return (
    <Link to={`watch?id=${id}`}>
  <div className='flex flex-col my-3 bg-gray-800 py-2'>
      <div className='h-52 relative'>
        <img className='w-full h-full object-cover' src={image} alt={title} />
        <span className='absolute bottom-0 right-0 bg-gray-500 px-1'>{totalTime}</span>
      </div>
      <div className='flex mt-2'>
        <div className='w-full ms-4 flex'>
          <div className='h-full mt-2 w-9 overflow-hidden'>
            <img className='rounded-full' src={`http://127.0.0.1:3000/${uploaderImage}`} alt={uploaderName} />

          </div>
          <div className='ms-3 d-block '>
            <p className='text-white text-md font-medium'>{title}</p>
            <p className='text-white text-sm opacity-70'>{uploaderName}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default VideoInfo
