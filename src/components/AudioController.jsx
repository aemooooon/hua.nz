import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';

// 导入音频文件
import huiseguijiSrc from '../assets/Beyond-huiseguiji.mp3';
import shibanwochuangdangSrc from '../assets/Beyond-sheibanwochuangdang.mp3';

const AudioController = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showControls, setShowControls] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    
    const { setAudioEnabled } = useAppStore();

    // 播放列表 - 按指定顺序：先灰色轨迹，后十般若传当
    const playlist = [
        {
            src: huiseguijiSrc,
            title: '灰色轨迹',
            artist: 'Beyond'
        },
        {
            src: shibanwochuangdangSrc,
            title: '十般若传当',
            artist: 'Beyond'
        }
    ];

    const currentTrack = playlist[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    // 当切换歌曲时，重新加载音频源
    useEffect(() => {
        if (audioRef.current) {
            const wasPlaying = isPlaying;
            if (wasPlaying) {
                audioRef.current.pause();
            }
            audioRef.current.src = currentTrack.src;
            audioRef.current.load();
            
            if (wasPlaying) {
                audioRef.current.play().catch(console.error);
            }
        }
    }, [currentTrackIndex, currentTrack.src, isPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(console.error);
                setAudioEnabled(true);
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prevIndex) => 
            prevIndex < playlist.length - 1 ? prevIndex + 1 : 0
        );
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prevIndex) => 
            prevIndex > 0 ? prevIndex - 1 : playlist.length - 1
        );
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    const handleAudioEnd = () => {
        // 自动播放下一首歌曲
        if (currentTrackIndex < playlist.length - 1) {
            nextTrack();
        } else {
            // 播放完所有歌曲后，停止播放
            setIsPlaying(false);
        }
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
                preload="metadata"
            >
                <source src={currentTrack.src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* 歌曲信息显示 */}
            {showControls && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <div className="text-green-400 text-xs font-mono">
                        <div className="font-semibold">{currentTrack.title}</div>
                        <div className="opacity-75">{currentTrack.artist}</div>
                        <div className="opacity-50">{currentTrackIndex + 1}/{playlist.length}</div>
                    </div>
                </div>
            )}

            {/* 上一首按钮 */}
            {showControls && (
                <button
                    onClick={prevTrack}
                    className="w-8 h-8 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-all duration-300 backdrop-blur-sm"
                    title="Previous Track"
                >
                    <FaStepBackward className="text-green-400 text-sm" />
                </button>
            )}

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

            {/* 下一首按钮 */}
            {showControls && (
                <button
                    onClick={nextTrack}
                    className="w-8 h-8 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-all duration-300 backdrop-blur-sm"
                    title="Next Track"
                >
                    <FaStepForward className="text-green-400 text-sm" />
                </button>
            )}

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
