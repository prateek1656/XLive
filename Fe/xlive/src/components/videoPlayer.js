import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer() {
  useEffect(() => {
    // Initialize the video player
    const player = videojs('my-video', {
      techOrder: ['html5'],
      controls: true,
      autoplay: false,
      sources: [
        {
          src: 'http://127.0.0.1:5001/hls',
        //   src: 'http://pendelcam.kip.uni-heidelberg.de/mjpg/video.mjpg',
          type: 'application/x-mpegURL', // Use 'application/dash+xml' for DASH
        },
      ],
    });

    // Clean up when the component unmounts
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  return (
    <div>
      <h1>Live Stream</h1>
      <video
        id="my-video"
        className="video-js vjs-default-skin"
        controls
        preload="auto"
      ></video>
    </div>
  );
}
