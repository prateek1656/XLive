import React, { useEffect, useState } from 'react';

export default function AllOverlays() {
    const [overlays, setOverlays] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch the list of overlays from the API
      fetch("http://127.0.0.1:5001/overlays")
        .then((response) => response.json())
        .then((data) => {
          setOverlays(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching overlays:', error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <p>Loading overlays...</p>;
    }
    return (
        <div>
      <h2>Your Overlays</h2>
      <ul>
        {overlays.map((overlay) => (
          <li key={overlay._id}>
            <p>Name: {overlay.name}</p>
            <p>Position X: {overlay.position_x}</p>
            <p>Position Y: {overlay.position_y}</p>
            <p>Content: {overlay.content}</p>
          </li>
        ))}
      </ul>
        </div>
    )
}