import React, { useState, useEffect, useRef } from 'react';
import PlayIcon from '../components/PlayBtn';
import ForwardIcon from '../components/ForwardBtn';
import BackwardIcon from '../components/BackwardBtn';
import PausedIcon from '../components/PausedBtn';
import InfiniteScroll from '../components/InfiniteScroll';

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLyric, setCurrentLyric] = useState('');
  const [songName,setSongName] = useState(null)
  const [artist,setArtist] = useState(null)
  const [art,setArt]= useState(null)
  const [id,setId] = useState(null)
  const [currentIndex,setCurrentIndex] = useState(0)
  const [lyric, setLyric] = useState(null)
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);
  const lrcFileRef = useRef(null);
const songs = [{
      songName: "Akahitoha",
      artist: "Demisukikun",
      art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoi51VT6I3n8MvoBY1u8nBHbbKe-t7Dh6tvl3xhAPLvQlsqRMb7LsZ2w-4&s=10",
      id: "akahitoha.mp3",
      lrcFile: "akahitoha.lrc"
    },
      {
        songName: "Yumeto Hazakura",
        artist: "Wotamin",
        art:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFiiCSa_8qBDMQnWwXgchZit22cm2wWNYrv3mbOppS2NZTrfOPRJ2R8Lo&s=10",
        id: "yumetohazakura.mp3",
        lrcFile: "yumeto.lrc"
      },
      {
        songName: "You are worthless child",
        artist: "Kikuo",
        art: "child.jpeg",
        id: "child.mp3",
        lrcFile: "child.lrc"
      }
    ];
  const playAudio = () => {
    if (!audioRef.current.paused) {
      setPlaying(false)
      audioRef.current.pause();
    } else if (audioRef.current.paused && audioRef.current.currentTime >= 0) {
      setPlaying(true);
      audioRef.current.play();
    }
  };
const changeMusic = () =>{
    setCurrentLyric(null);
    setLyric(songs[currentIndex].lrcFile)
      setSongName(songs[currentIndex].songName);
      setArtist(songs[currentIndex].artist);
    setArt(songs[currentIndex].art);
    setId(songs[currentIndex].id)

  }
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
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    updateCurrentLyric(audioRef.current.currentTime);
    if(audioRef.current.ended) skipNext() 
  };
  const updateCurrentLyric = (currentMusicTime) => {
  const timeInSeconds = Math.floor(currentMusicTime);
  const currentLine = lrcFileRef.current.find(({ timestamp }) => {
    const lineStartTime = timeToSeconds(timestamp);
    const lineEndTime = lineStartTime +2 ; // Adjust the margin of error as needed
    return lineStartTime <= timeInSeconds && timeInSeconds <= lineEndTime;
  });
  if (currentLine) {
    setCurrentLyric(currentLine.lyric);
  }
};
const skipNext = ()=>{
    setCurrentIndex((prev)=> prev+1 <= songs.length ? songs.length -1: prev+ 1)
    changeMusic()
    audioRef.current.pause()
    setPlaying(false)
  }
  const skipPrevious = () => {
    setCurrentIndex((prev)=> prev+1>= songs.length ?0: prev+ 1)
    audioRef.current.pause();
    changeMusic()
    setPlaying(false)
  }
  const loadLrcFile = async () => {
    try {
      const response = await fetch(lyric);
      const lrcText = await response.text();
      const lines = lrcText.split('\n');
      const linesWithTimestamps = lines.reduce((acc, line) => {
        const matches = line.match(/\[(\d+:\d+\.\d+)\](.*)/);
        if (matches) {
          const timestamp = matches[1];
          const lyric = matches[2];
          acc.push({ timestamp, lyric });
        }
        return acc;
      }, []);
      lrcFileRef.current = linesWithTimestamps;
    } catch (error) {
      console.error('Error loading .lrc file:', error);
    }
  };

  useEffect(() => {
    changeMusic()
    loadLrcFile();
  }, [lyric,currentIndex]);
  useEffect(() => {
    audioRef.current.addEventListener("ended",changeMusic )
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current.duration);
    });

    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const timeToSeconds = (timestamp) => {
    const [minutes, seconds] = timestamp.split(':').map(parseFloat);
    return minutes * 60 + seconds;
  };

  const handleTimeClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className='p-5 h-screen'>
      <audio ref={audioRef} src={id}></audio>
      <div className="relative bg-gray-700 p-8 rounded-lg shadow-md w-80 h-4/6  ">
        <canvas ref={canvasRef} height={150} style={{width: "100%"}}></canvas>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4">
          <img src={art} alt={songName} className={`${playing ? "animate-rotate":""} w-24 h-24 rounded-full shadow-lg`} />
        </div>

        <h2 className="text-xl font-semibold text-center">{songName}</h2>
        <p className="text-gray-600 text-sm text-center">{artist}</p>

        <div className="mt-4 h-1/6 text-center transition ease-linear delay-200">
          <p className="text-white h-full">{currentLyric}</p>
        </div>

        <div className="mt-6 flex justify-center items-center">
          <button className={`p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none ${songs.length >= currentIndex && "disabled"}`} onClick={skipPrevious}>
            <ForwardIcon />
          </button>
          <button className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none mx-4" onClick={() => { showVisualizer(); playAudio(); }}>
            {playing ? <PausedIcon /> : <PlayIcon />}
          </button>
          <button className={`p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none ${songs.length >= currentIndex && "disabled"}`} onClick={skipNext}>
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
      <InfiniteScroll />
    </div>
  );
};

export default MusicPlayer;

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


