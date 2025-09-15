import React, { useState, useRef, useEffect } from 'react';

const VideoComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });
  };

  // Smooth cursor following animation
  useEffect(() => {
    if (!isHovered) return;

    const animate = () => {
      setSmoothPosition(prev => ({
        x: prev.x + (cursorPosition.x - prev.x) * 0.15,
        y: prev.y + (cursorPosition.y - prev.y) * 0.15
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cursorPosition, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Video container with curved corners and shadow */}
      <div 
        className="relative overflow-hidden rounded-3xl shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          className="w-full h-auto object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          {/* Sample video sources - replace with your video URLs */}
          <source
            src="video1.mp4"
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-[500px] flex items-center justify-center text-white text-xl font-semibold">
            Video Preview
          </div>
        </video>
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
            style={{
              left: `${smoothPosition.x}px`,
              top: `${smoothPosition.y}px`,
              opacity: isHovered ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.5})`
            }}
          >
            <div className="w-14 h-14 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-xl hover:bg-opacity-100 transition-all duration-200 backdrop-blur-sm border border-white border-opacity-30">
              <svg 
                className="w-5 h-5 text-gray-800 ml-0.5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  VideoComponent;