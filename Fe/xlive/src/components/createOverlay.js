import React, { useState, useRef } from 'react';
import './AddOverlay.css';

function CreateOverlays() {
  const [overlay, setOverlay] = useState({
    name: '',
    content: '',
    position_x: 0,
    position_y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const overlayRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOverlay({ ...overlay, [name]: value });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = overlayRef.current.getBoundingClientRect();
      const x = e.clientX ;
      const y = e.clientY ;
    //   const x = e.clientX - rect.width / 2;
    //   const y = e.clientY - rect.height / 2;
      setOverlay({ ...overlay, position_x: x, position_y: y });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send overlay data to your backend API
    try {
      const response = await fetch('http://127.0.0.1:5001/overlays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(overlay),
      });
      if (response.ok) {
        // Overlay created successfully, handle the response as needed
        console.log('Overlay created successfully');
      } else {
        // Handle any error response
        console.error('Error creating overlay');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-overlays">
      <h2>Create Overlay</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={overlay.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <input
            type="text"
            id="content"
            name="content"
            value={overlay.content}
            onChange={handleChange}
          />
        </div>
        <div
          className="overlay-preview"
          ref={overlayRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            className="overlay"
            style={{ left: overlay.position_x, top: overlay.position_y }}
          >
            {overlay.content}
          </div>
        </div>
        <div className="coordinates">
          Coordinates: X: {overlay.position_x}, Y: {overlay.position_y}
        </div>
        <button type="submit">Create Overlay</button>
      </form>
    </div>
  );
}

export default CreateOverlays;
