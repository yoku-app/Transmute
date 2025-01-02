"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const file_1 = require("./file");
const image_util_1 = require("./image.util");
const app = (0, express_1.default)();
app.get("/health", (req, res) => {
    res.send("Image Processing Service is running");
});
app.post("/api/transform", file_1.upload.single("image"), async (req, res) => {
    // Retrieve Image File
    const file = req.file;
    const mimeType = file?.mimetype;
    // Check if the file exists
    if (!file || !mimeType) {
        res.status(400).send("No image file provided");
        return;
    }
    // Retrieve Image Transformations
    const { dimensions, crop, format } = req.body;
    // Perform Image Transformations
    try {
        // Convert Image to Sharp
        //Creates a mutable reference that can be used to chain operations
        let image = await (0, image_util_1.convertImageToSharp)(file);
        // Resize Image
        if (dimensions) {
            image = await (0, image_util_1.resizeImage)(image, dimensions);
        }
        // Crop Image
        if (crop) {
            image = await (0, image_util_1.cropImage)(image, crop);
        }
        if (format) {
            image = image.toFormat(format);
        }
        // Convert Image to Buffer
        const transformedImage = await image.toBuffer();
        // Send Image as Response
        res.set("Content-Type", format ? `image/${format}` : mimeType);
        res.send(transformedImage);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.listen(config_1.config.port, () => {
    console.log(`Server running on ${config_1.config.host}`);
});
