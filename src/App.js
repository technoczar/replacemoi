import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css'; // Create a CSS file for styling

function App() {
  const [image, setImage] = useState('image.jpg'); // Default image

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Update image state
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleReplaceClick = () => {
    document.getElementById('fileInput').click(); // Trigger file input
  };

  return (
    <div className="App">
      <h1>Image Uploader</h1>
      <img src={image} alt="Uploaded" style={{ maxWidth: '500px' }} />
      <br />
      <button onClick={handleReplaceClick}>Replace</button>
      <input {...getInputProps()} id="fileInput" style={{ display: 'none' }} />
      <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', marginTop: '20px' }}>
        <p>Drag & drop an image here, or click to select one</p>
      </div>
    </div>
  );
}

export default App;
