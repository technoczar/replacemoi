const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Enable CORS to allow requests from the React app
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Static folder for serving uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle image upload request
app.post('/upload', upload.array('images', 10), (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files uploaded.');
  }
  const fileUrls = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
  res.send({ files: fileUrls });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
