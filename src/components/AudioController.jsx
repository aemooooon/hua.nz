import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext';

const AudioController = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showControls, setShowControls] = useState(false);
    
    const { audioEnabled, setAudioEnabled } = useApp();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
                setAudioEnabled(true);
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
    };

    return (
        <div 
            className="fixed bottom-6 left-6 z-50 flex items-center space-x-2 transition-all duration-300"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* 音乐文件 */}
            <audio
                ref={audioRef}
                onEnded={handleAudioEnd}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                loop
            >
                <source src="/audio.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* 主播放按钮 */}
            <button
                onClick={togglePlay}
                className="w-12 h-12 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-all duration-300 backdrop-blur-sm"
                title={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? (
                    <FaPause className="text-green-400 text-lg ml-0.5" />
                ) : (
                    <FaPlay className="text-green-400 text-lg ml-1" />
                )}
            </button>

            {/* 扩展控件 */}
            <div className={`flex items-center space-x-2 transition-all duration-300 ${
                showControls ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}>
                {/* 静音按钮 */}
                <button
                    onClick={toggleMute}
                    className="w-8 h-8 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-all duration-300 backdrop-blur-sm"
                    title={isMuted ? 'Unmute' : 'Mute'}
                >
                    {isMuted ? (
                        <FaVolumeMute className="text-green-400 text-sm" />
                    ) : (
                        <FaVolumeUp className="text-green-400 text-sm" />
                    )}
                </button>

                {/* 音量滑块 */}
                <div className="bg-green-500/20 border border-green-500/50 rounded-full px-3 py-2 backdrop-blur-sm">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-green-500/30 rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, #7ca65c 0%, #7ca65c ${volume * 100}%, rgba(124, 166, 92, 0.3) ${volume * 100}%, rgba(124, 166, 92, 0.3) 100%)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AudioController;
