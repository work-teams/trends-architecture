import React, { useState } from 'react';

function WebcamCapture({ onCapture }) {
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = (show) => {
    setShowAlert(show);
  };

  const getScreenshot = () => {
    // Get screenshot from webcam and return data URL
    // Replace this with your webcam capture code
    const imageSrc = 'data:image/jpeg;base64,...';
    onCapture && onCapture(imageSrc);
    return imageSrc;
  };

  return (
    <div className="webcam-capture">
      <button onClick={getScreenshot} className="btn btn-primary">
        <i className="fas fa-camera-retro mr-2"></i>Capture
      </button>
      {showAlert && (
        <Alert variant="info">Image captured successfully!</Alert>
      )}
    </div>
  );
}

export default WebcamCapture;