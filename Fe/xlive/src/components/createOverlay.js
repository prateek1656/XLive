// OverlayForm.js
import React, { useState } from 'react';
import './OverlayForm.css';

function OverlayForm() {
  const [overlay, setOverlay] = useState({
    name: '',
    content: '',
    position_x: 0,
    position_y: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOverlay({ ...overlay, [name]: value });
  };

  const handleMouseOver = (e) => {
    // Update overlay position and display coordinates
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setOverlay({ ...overlay, position_x: x, position_y: y });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send overlay data to your backend API
    console.log('Overlay Data:', overlay);
  };

  return (
    <div className="overlay-form">
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
        <div className="overlay-preview" onMouseMove={handleMouseOver}>
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

export default OverlayForm;
