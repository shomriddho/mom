import React, { useState, useRef, useEffect } from 'react';
import { faDownload, faPause, faPlay, faInfo, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AudioPlayerProps {
  src: any;
  title: string;
  description: string;
  lyrics: string;
  subtitle?: string;
  tags?: string[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  description,
  lyrics,
  subtitle,
  tags,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateTime);
          audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
        }
      };
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 md:p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold ">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none"
          onClick={() => setShowDescription(!showDescription)}
        >
          <FontAwesomeIcon icon={faInfo} className="me-2" />
          {showDescription ? 'Hide Info' : 'Show Info'}
        </button>
      </div>
      {showDescription && (
        <div className="text-sm text-gray-700 mb-4">
          <p className="mb-2">Description:</p>
          <p>{description}</p>
        </div>
      )}
      {tags && (
        <div className="mb-4 ">
          <p className="text-lg text-gray-600">Tags:</p>
          <div className="flex flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 font-medium px-2 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      <audio ref={audioRef} src={src} />
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4 md:mb-0 flex items-center focus:outline-none"
          onClick={togglePlay}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="me-2" />
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="w-full md:flex-1 md:ml-4 md:mr-2">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-3 rounded-lg overflow-hidden appearance-none bg-gray-300 focus:outline-none mb-2 md:mb-0"
          />
          <div className="flex justify-between">
            <span className="text-xs text-gray-600">{formatTime(currentTime)}</span>
            <span className="text-xs text-gray-600">{formatTime(duration)}</span>
          </div>
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center focus:outline-none"
          onClick={handleDownload}
        >
          <FontAwesomeIcon icon={faDownload} className="me-2" />
          Download
        </button>
      </div>
      <div className="mt-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none"
          onClick={() => setShowLyrics(!showLyrics)}
        >
          <FontAwesomeIcon icon={faMusic} className="me-2" />
          {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
        </button>
        {showLyrics && (
          <div className="mt-4 whitespace-pre-line">
            <p className="mb-2">Lyrics:</p>
            {lyrics}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
