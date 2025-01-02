"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImage = exports.alterImageType = exports.cropImage = exports.resizeImage = exports.convertImageToSharp = exports.getImageMetadata = void 0;
const sharp_1 = __importDefault(require("sharp"));
/**
 * Function to read a given file and extract its metadata
 * @param file - The File of an image
 * @returns {Metadata} Image Metadata
 */
const getImageMetadata = async (file) => {
    // Retrieve metadata
    try {
        const imageData = await file.arrayBuffer();
        return await (0, sharp_1.default)(imageData).metadata();
    }
    catch (error) {
        throw new Error("An error occured while reading the image metadata");
    }
};
exports.getImageMetadata = getImageMetadata;
const convertImageToSharp = async (file) => {
    // Convert Image to Sharp
    try {
        return (0, sharp_1.default)(file.buffer);
    }
    catch (error) {
        throw new Error("An error occured while converting the image to sharp");
    }
};
exports.convertImageToSharp = convertImageToSharp;
/**
 * Function to resize an image to the given dimensions
 * @param dimensions
 * @returns
 */
const resizeImage = async (image, dimensions) => {
    // If both dimensions are not provided, throw an error
    if (!dimensions.width && !dimensions.height) {
        throw new Error("Altered Dimensions are required to resize the image");
    }
    // Perform Image Resizing
    try {
        // Retrieve Image Data
        return image.resize(dimensions);
    }
    catch (error) {
        throw new Error("An error occured while resizing the image");
    }
};
exports.resizeImage = resizeImage;
/**
 *
 */
const cropImage = async (image, dimensions) => {
    // Perform Image Cropping
    try {
        return image.extract(dimensions);
    }
    catch (error) {
        throw new Error("An error occured while cropping the image");
    }
};
exports.cropImage = cropImage;
const alterImageType = async (image, type) => {
    // Alter Image Type
    try {
        return image.toFormat(type);
    }
    catch (error) {
        throw new Error("An error occured while altering the image type");
    }
};
exports.alterImageType = alterImageType;
const saveImage = async (image, path) => {
    // Save Image
    try {
        await image.toFile(path);
    }
    catch (error) {
        throw new Error("An error occured while saving the image");
    }
};
exports.saveImage = saveImage;
