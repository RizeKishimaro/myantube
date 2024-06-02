import React, { useRef, useState, useEffect } from "react";
import PlayIcon from "../components/PlayBtn";
import PausedIcon from "../components/PausedBtn";
import ForwardIcon from "../components/ForwardBtn";
import BackwardIcon from "../components/BackwardBtn";
import InfoBar from "../components/InfoBar";
import { useSearchParams } from "react-router-dom";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerctl = useRef(null);
  const progressBar = useRef(null);
  const [waiting, setWaiting] = useState(false)
  const [bufferedPercentage, setBufferedPercentage] = useState(0); // New state for buffered data
  const [poster, setPoster] = useState(null)
  const [searchParam] = useSearchParams();
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [durationInMinutes, setDurationInMinutes] = useState(0);
  const [formattedCurrentTime, setFormattedCurrentTime] = useState("0:00");
  const [formattedDuration, setFormattedDuration] = useState("0:00");
  const [volume, setVolume] = useState(0.5); // Initial volume set to 50%
  const [bufferedSize, setBufferedSize] = useState(0);
  const BUFFER_THRESHOLD = 50 * 1024 * 1024; // 50MB buffer threshold
  const urlId = searchParam.get("id")
  useEffect(() => {
    setFormattedCurrentTime(formatTime(currentTime));
  }, [currentTime]);
  useEffect(() => {
    let timer;
    if (showControls) {
      timer = setTimeout(() => setShowControls(false), 5000); // Hide controls after 5 seconds of inactivity
    }
    return () => clearTimeout(timer);
  }, [showControls]);
  useEffect(() => {
    const video = videoRef.current;

    video.addEventListener("ended", () => {
      setPaused(false);
    });
    video.addEventListener("playing",()=>{
      setPaused(true)
    })
    video.addEventListener("progress", handleProgress);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("progress", handleProgress);  
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);
  useEffect(()=>{
    const video = videoRef.current;
    video.addEventListener("ended",()=>{
      setBufferedPercentage(0)
    })
  },[bufferedPercentage])
  const handleProgress = () => {
  const video = videoRef.current;
  if (video.buffered.length > 0) {
    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
    const bufferedPercent = (bufferedEnd / video.duration) * 100;
    setBufferedPercentage(bufferedPercent);
  }
};

  const handlePlay = () => {
    if (bufferedSize >= BUFFER_THRESHOLD) {
      // Pause the video or take other actions when buffer threshold is reached
      alert("Buffer threshold reached. Pausing video.");
    }
  };
  const handleVolumeChange = (e) => {
    const videoEl = videoRef.current;
    videoEl.volume = parseFloat(e.target.value);
    setVolume(parseFloat(e.target.value)); // Update volume state with new value
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    setDuration(video.duration);
    // Calculate duration in minutes
    const durationMinutes = Math.floor(video.duration / 60);
    setDurationInMinutes(durationMinutes);
    setFormattedDuration(formatTime(video.duration));
  };

  const togglePlay = () => {
    const video = videoRef.current;

    if (video.paused) {
      setPaused(true);
      video.play();
    } else {
      setPaused(false);
      video.pause();
    }
    setShowControls(true);
  };

  const showButtons = () => {
    setShowControls(true);
    // Show controls when video is clicked
  };

  const seekForward = () => {
    const video = videoRef.current;
    const time = video.currentTime += 10; // Seek forward by 10 seconds
    setCurrentTime(time)
    setShowControls(true); // Show controls when forward button is clicked
  };

  const seekBackward = () => {
    const video = videoRef.current;
    const time = video.currentTime -= 10;
    setCurrentTime(time)
    setShowControls(true); // Show controls when backward button is clicked
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
  };

  const handleSeekStart = () => {
    setIsDragging(true);
  };

  const handleSeekEnd = () => {
    setIsDragging(false);
  };

  const handleDragSeek = (e) => {
    if (isDragging) {
      const video = videoRef.current;
      const seekTime =
        (e.touches[0].clientX / progressBar.current.offsetWidth) * duration;
      video.currentTime = seekTime;
      setCurrentTime(seekTime)
    }
  };

const handleSeek = (e) => {
  const video = videoRef.current;
  const seekTime = (e.clientX / progressBar.current.offsetWidth) * duration;
  video.currentTime = seekTime;
  setCurrentTime(seekTime); // Update current time
};

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  };

  const requestFullScreen = () => {
    const videoEl = videoRef.current;

    try {
      if (videoEl.requestFullscreen) {
        videoEl.requestFullscreen();
      } else if (videoEl.mozRequestFullScreen) {
        /* Firefox */
        videoEl.mozRequestFullScreen();
      } else if (videoEl.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        videoEl.webkitRequestFullscreen();
      } else if (videoEl.msRequestFullscreen) {
        /* IE/Edge */
        videoEl.msRequestFullscreen();
      }
    } catch (err) {
      console.log(err);
      window.alert("Your Browser does not support fullscreen mode.");
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="relative"
        onMouseMove={() => setShowControls(true)}
        onTouchMove={() => {
          setShowControls(true);
        }}
      >
        {waiting && <span className="loading loading-dots loading-lg absolute left-[45%] bottom-[45%]"></span>}
        <video
          autoPlay
          onWaiting={()=>{setWaiting(true)}}
          onCanPlay={()=>{setWaiting(false)}}
          ref={videoRef}
          onPlay={handlePlay}
          onClick={showButtons}
          onTimeUpdate={handleTimeUpdate}
          onDoubleClick={requestFullScreen}
          className="w-full h-[300px] bg-cover"
          poster={poster}
        >
          <source src={`${import.meta.env.VITE_APP_BACKEND_URL}/stream?video=${urlId}`}></source>
          Your browser does not support the video tag.
        </video>
        {showControls && (
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col items-center"
            ref={playerctl}
          >
            <div
              className="bg-black bg-opacity-50 h-2 w-full cursor-pointer mb-2 relative flex align-middle"
              onMouseDown={handleSeekStart}
              onMouseUp={handleSeekEnd}
              onMouseLeave={handleSeekEnd}
              onMouseMove={handleDragSeek}
              onTouchStart={handleSeekStart}
              onClick={(e) => {
                setIsDragging(false);
                handleSeek(e);
              }}
              onTouchEnd={handleSeekEnd}
              onTouchMove={handleDragSeek}
              ref={progressBar}
            >
              <div className="h-full bg-cyan-300 opacity-75 absolute" style={{width: `${bufferedPercentage}%`}}>
                
              </div>
              <div
                className="h-full bg-cyan-500 z-40"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              ></div>
              <div className="z-50">
                <img className="w-10 mt-[-7px] ml-[-10px]" src="elixir.gif" />
              </div>
            </div>
            <div className="flex items-center  ">
              <div className="ml-3 text-white absolute left-0 ">
                {formattedCurrentTime}/{formattedDuration}
              </div>
              <div className="">
                <button
                  onClick={seekBackward}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full mr-4"
                >
                  <ForwardIcon />
                </button>
                <button
                  onClick={togglePlay}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  {paused ? <PausedIcon /> : <PlayIcon />}
                </button>
                <button
                  onClick={seekForward}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full ml-4"
                >
                  <BackwardIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <InfoBar setPoster={setPoster} />
    </div>
  );
};

export default VideoPlayer;
