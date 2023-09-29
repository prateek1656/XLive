import React, { useState, useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoPlayer from './videoPlayer';

export default function Home() {
	const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [streamInterval, setStreamInterval] = useState(null);

    // useEffect(() => {
    //     if (isPlaying) {
    //         const canvas = canvasRef.current;
    //         const context = canvas.getContext('2d');
    //         const img = new Image();

    //         img.onload = function () {
    //             context.clearRect(0, 0, canvas.width, canvas.height);
    //             context.drawImage(img, 0, 0, canvas.width, canvas.height);
    //         };

    //         img.src = 'http://127.0.0.1:5001/feed';

    //         const interval = setInterval(() => {
    //             img.src = 'http://127.0.0.1:5001/feed';
    //         }, 1000);

    //         setStreamInterval(interval);
    //     } else {
    //         clearInterval(streamInterval);
    //     }
    // }, [isPlaying, streamInterval]);

    // const togglePlayPause = () => {
    //     setIsPlaying(!isPlaying);
    // };


  return (
    <div>
      <h1>Live Stream</h1>
     <VideoPlayer/>
	 {/* <img src="http://127.0.0.1:5001/feed" alt="MJPEG Stream" />  */}
    </div>

  );
}
