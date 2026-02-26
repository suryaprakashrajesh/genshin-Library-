const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'images', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Ensure database file exists
const dbPath = path.join(__dirname, 'database.json');
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Create unique filenames
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
});
const upload = multer({ storage: storage });

// API Endpoint to get all images
app.get('/api/images', (req, res) => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        const images = JSON.parse(data);
        res.json(images);
    } catch (err) {
        console.error("Error reading database:", err);
        res.status(500).json({ error: "Failed to read database" });
    }
});

// API Endpoint to upload an image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
    }

    const tags = req.body.tags || "Gallery Image";
    const element = req.body.element || "Pyro";

    // Create the image URL path relative to the index.html file
    const newImage = {
        url: `images/uploads/${req.file.filename}`,
        tags: tags,
        element: element,
        createdAt: new Date().toISOString()
    };

    try {
        // Read current DB
        const data = fs.readFileSync(dbPath, 'utf8');
        const images = JSON.parse(data);

        // Add new image
        images.push(newImage);

        // Write back to DB
        fs.writeFileSync(dbPath, JSON.stringify(images, null, 2));

        res.json({ success: true, image: newImage });
    } catch (err) {
        console.error("Error saving to database:", err);
        res.status(500).json({ error: "Failed to save to database" });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
