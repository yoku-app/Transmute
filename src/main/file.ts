import multer, { type Multer } from "multer";

export const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
];

export const upload: Multer = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        // 10MB File Size Limit
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPEG, JPG, PNG, GIF, and WEBP files are allowed."));
        }
    },

 });
