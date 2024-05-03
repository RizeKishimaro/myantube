import PlayIcon from '../components/PlayBtn';
import ForwardIcon from '../components/ForwardBtn';
import BackwardIcon from '../components/BackwardBtn';
import PausedIcon from '../components/PausedBtn';
import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);

  const playAudio = () => {
    if (!audioRef.current.paused) {
      setPlaying(false)
      audioRef.current.pause();
    } else if (audioRef.current.paused && audioRef.current.currentTime >= 0) {
      setPlaying(true);
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleTimeClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
function showVisualizer() {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtxRef.current.createMediaElementSource(audioRef.current);
    analyserRef.current = audioCtxRef.current.createAnalyser();
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const barWidth = (canvas.width / bufferLength) * 2.5;

    const drawVisualizer = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      requestAnimationFrame(drawVisualizer);
    };

    drawVisualizer();
  }
}

  useEffect(() => {

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });

    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      // Check if the context is not already closed
        console.log("closed")
      audioCtxRef.current.close();
    }
    };
  }, []);

  return (
    <div className='p-5'>
      <audio ref={audioRef} src='DJVI_-_Lonely_Diva_[Free_Download](128k).mp3'></audio>
        <div className="relative bg-gray-700 p-8 rounded-lg shadow-md w-80">
          <canvas ref={canvasRef} width={300} height={150} style={{ width: '100%', height: '100%' }}></canvas>

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4">
            <img src="https://i1.sndcdn.com/artworks-000458441142-f0ea4q-t500x500.jpg" alt="idk - Highvyn, Taylor Shin" className={`${playing ? "animate-rotate":""} w-24 h-24 rounded-full shadow-lg`} />
          </div>

          <h2 className="text-xl font-semibold text-center">idk</h2>
          <p className="text-gray-600 text-sm text-center">Highvyn, Taylor Shin</p>
          <div className="mt-6 flex justify-center items-center">
            <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
              <ForwardIcon />
            </button>
            <button className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none mx-4" onClick={()=>{showVisualizer();playAudio();}}>
              {playing ? <PausedIcon /> : <PlayIcon />}
            </button>
            <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
              <BackwardIcon />
            </button>
          </div>
          <div className="mt-6 bg-gray-200 h-2 rounded-full" onClick={handleTimeClick}>
            <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
    </div>
  );
};

export default MusicPlayer;

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

