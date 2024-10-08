import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload success:', response.data);
      setUploadSuccess('Upload Successful!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadSuccess('Upload Failed.');
    } finally {
      setUploading(false);
    }
  };

  const thumbs = files.map(file => (
    <div key={file.name} style={{ margin: '10px' }}>
      <img src={file.preview} alt={file.name} width={100} />
    </div>
  ));

  return (
    <div>
      <div
        {...getRootProps({ className: 'dropzone' })}
        style={{
          border: '2px dashed #cccccc',
          padding: '20px',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some images here, or click to select files</p>
      </div>
      <aside style={{ display: 'flex', marginTop: '10px' }}>{thumbs}</aside>
      {files.length > 0 && (
        <button onClick={handleUpload} disabled={uploading} style={{ marginTop: '20px' }}>
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
      )}
      {uploadSuccess && <p>{uploadSuccess}</p>}
    </div>
  );
};

export default ImageUpload;
