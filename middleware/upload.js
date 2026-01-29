const multer = require('multer');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'madrasa_students', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed formats
        // public_id: (req, file) => 'computed-filename-using-request', // Optional custom filename
    },
});

// Cloudinary handles file types via allowed_formats, but we can keep the filter if needed.
// However, allowed_formats in params is usually sufficient for extension checking.
// The existing checkFileType function verified mimetype and extname manually.
// With CloudinaryStorage, simple format validation is built-in.

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Increased limit to 5MB for cloud storage if needed, or keep 1MB
});

module.exports = upload;
