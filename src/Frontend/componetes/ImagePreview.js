import React from 'react';

function ImagePreview({ capturedImage, onSaveImage, onCancelCapture }) {
  return (
    <div className="image-preview">
      {capturedImage && (
        <div className="preview-container">
          <img src={capturedImage} alt="Captured Image" className="preview-image" />
          <div className="preview-controls">
            <button onClick={onSaveImage} className="btn btn-success">
              <i className="fas fa-save mr-2"></i>Save
            </button>
            <button onClick={onCancelCapture} className="btn btn-danger ml-2">
              <i className="fas fa-arrow-left mr-2"></i>Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePreview;