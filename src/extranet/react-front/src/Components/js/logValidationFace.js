import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';

const webcamRef = useRef(null);
const [capturedImage, setCapturedImage] = useState(null);
const [cameraActive, setCameraActive] = useState(true);
const [loading, setLoading] = useState(false);

const capture = () => {
  setLoading(true);
  const imageSrc = webcamRef.current.getScreenshot();
  if (imageSrc) {
    setTimeout(() => {
      setCapturedImage(imageSrc);
      setCameraActive(false);
      setLoading(false);
    }, 1000);
  } else {
    setLoading(false);
  }
  generateRandomNumber();
};

const cancelCapture = () => {
  setCapturedImage(null);
  setCameraActive(true);
};

const saveImage = () => {
  if (capturedImage) {
    const a = document.createElement('a');
    a.href = capturedImage;
    a.download = 'captured-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export {
    capture,
    cancelCapture,
    saveImage,
};