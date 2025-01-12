import sharp, { type Metadata, Sharp } from "sharp";
import { BadRequestError, OperationError } from "../types/error.interface";
import {
    ImageCrop,
    ImageDimensions,
    ImageType,
} from "../types/image.interface";

export const convertImageToSharp = async (
    file: Express.Multer.File
): Promise<Sharp> => {
    // Convert Image to Sharp
    try {
        return sharp(file.buffer);
    } catch (error) {
        throw new OperationError(
            "An error occured while converting the image to sharp"
        );
    }
};

/**
 * Function to resize an image to the given dimensions
 * @param dimensions
 * @returns
 */
export const resizeImage = async (
    image: Sharp,
    dimensions: ImageDimensions
): Promise<Sharp> => {
    // If both dimensions are not provided, throw an error
    if (!dimensions.width && !dimensions.height) {
        throw new BadRequestError(
            "Altered Dimensions are required to resize the image"
        );
    }

    // Perform Image Resizing
    try {
        // Retrieve Image Data
        return image.resize(dimensions);
    } catch (error) {
        throw new OperationError("An error occured while resizing the image");
    }
};

/**
 *
 */
export const cropImage = async (image: Sharp, dimensions: ImageCrop) => {
    // Perform Image Cropping

    // Assert cropping dimensions do not exceed current image dimensions
    const metadata: Metadata = await image.metadata();
    const { width, height } = metadata;

    if (!width || !height) {
        throw new OperationError(
            "An error occured while retrieving the image metadata"
        );
    }

    if (
        dimensions.width + dimensions.left > width ||
        dimensions.height + dimensions.top > height
    ) {
        throw new BadRequestError(
            "Cropping dimensions exceed the current image dimensions"
        );
    }

    try {
        return image.extract(dimensions);
    } catch (error) {
        throw new OperationError("An error occured while cropping the image");
    }
};

export const alterImageType = async (
    image: Sharp,
    type: ImageType
): Promise<Sharp> => {
    // Alter Image Type
    try {
        return image.toFormat(type);
    } catch (error) {
        throw new OperationError(
            "An error occured while altering the image type"
        );
    }
};

export const saveImage = async (image: Sharp, path: string) => {
    // Save Image
    try {
        await image.toFile(path);
    } catch (error) {
        throw new OperationError("An error occured while saving the image");
    }
};
