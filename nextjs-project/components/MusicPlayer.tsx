'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface Song {
  title: string
  artist: string
  cover: string
  src: string
}

const songs: Song[] = [
  {
    title: "Still D.R.E.",
    artist: "Dr. Dre ft. Snoop Dogg",
    cover: "/assets/still.jpeg", 
    src: "/assets/still-dre.mp3"     
  },
  {
    title: "Love Yourself",
    artist: "Justin Bieber",
    cover: "/assets/love.jpeg", 
    src: "/assets/Love-yourself.mp3"      
  }
]

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  const loadSong = (songIndex: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.src = songs[songIndex].src
      audio.load()
    }
  }

  const playPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextSong = () => {
    const newIndex = (currentSong + 1) % songs.length
    setCurrentSong(newIndex)
    loadSong(newIndex)
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play()
      }, 100)
    }
  }

  const prevSong = () => {
    const newIndex = (currentSong - 1 + songs.length) % songs.length
    setCurrentSong(newIndex)
    loadSong(newIndex)
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play()
      }, 100)
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = parseFloat(e.target.value)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
      }

      const handleLoadedMetadata = () => {
        setDuration(audio.duration)
      }

      const handleEnded = () => {
        nextSong()
      }

      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [currentSong])

  useEffect(() => {
    loadSong(currentSong)
  }, [])

  const currentSongData = songs[currentSong]

  return (
    <div className="bg-spotify-gray rounded-2xl h-[88vh] w-80 p-5 flex flex-col justify-between shadow-2xl">
      {/* Album Cover */}
      <div className="w-full max-w-[300px] mx-auto">
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <Image
            src={currentSongData.cover}
            alt="Album Cover"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Song Info */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-1">
          {currentSongData.title}
        </h2>
        <p className="text-sm text-spotify-light-gray">
          {currentSongData.artist}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between gap-2 mx-0 my-4">
        <span className="text-xs text-spotify-light-gray min-w-[35px]">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={handleProgressChange}
          className="flex-1 h-1 bg-gray-600 rounded-sm appearance-none cursor-pointer"
        />
        <span className="text-xs text-spotify-light-gray min-w-[35px]">
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex justify-around items-center">
        <button
          onClick={prevSong}
          className="text-white text-2xl hover:text-spotify-green hover:scale-110 transition-all duration-200"
        >
          ⏮
        </button>
        <button
          onClick={playPause}
          className="text-white text-2xl hover:text-spotify-green hover:scale-110 transition-all duration-200"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={nextSong}
          className="text-white text-2xl hover:text-spotify-green hover:scale-110 transition-all duration-200"
        >
          ⏭
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  )
}
