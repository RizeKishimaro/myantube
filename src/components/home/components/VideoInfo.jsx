import React from 'react'
import { Link } from 'react-router-dom'
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    
    const formattedHours = hours.toString().padStart(1, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


const VideoInfo = ({id,image,title,views,duration,uploaderImage,uploaderName,totalTime}) => {
  console.log(duration)
  const formattedTime = formatTime(duration);
  return (
    <Link to={`watch?id=${id}`}>
  <div className='flex flex-col my-3 bg-gray-800 py-2'>
      <div className='h-auto overflow-hidden relative text-center'>
        <img className=' h-auto bg-cover' src={image} alt={title} />
        <span className='absolute bottom-0 right-0 bg-gray-500 px-1'>{formattedTime}</span>
      </div>
      <div className='flex mt-2'>
        <div className='w-full ms-4 flex'>
          <div className='h-full mt-2 w-9 overflow-hidden'>
            <img className='rounded-full ' src={`${import.meta.env.VITE_APP_BACKEND_URL}/${uploaderImage}`} alt={uploaderName} />
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
