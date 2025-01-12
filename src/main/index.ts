import bodyParser from "body-parser";
import cors from "cors";
import express, { Response } from "express";
import "express-async-errors";
import { Sharp } from "sharp";
import { config } from "./config";
import { errorHandler } from "./error";
import { upload } from "./file";
import { BadRequestError } from "./types/error.interface";
import {
    acceptedImageTypes,
    ImageCrop,
    ImageDimensions,
    ImageType,
} from "./types/image.interface";
import { RequestBody } from "./types/interface";
import {
    alterImageType,
    convertImageToSharp,
    cropImage,
    resizeImage,
} from "./util/image.util";
import { parseParamAndCallback } from "./util/util";

const app = express();
const { origin, host, port } = config;

interface ImageTransformRequest {
    resize?: string;
    crop?: string;
    format?: ImageType;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: origin }));

app.get("/api/image/health", (req, res) => {
    res.json({ message: "Image Processing Service is running" });
});

app.post(
    "/api/image/transform",
    upload.single("image"),
    async (
        req: RequestBody<ImageTransformRequest>,
        res: Response
    ): Promise<void> => {
        // Retrieve Image File
        const file = req.file;
        const mimeType = file?.mimetype;

        // Check if the file exists
        if (!file || !mimeType) {
            throw new BadRequestError("Image file is required");
        }

        // Retrieve Image Transformations
        const { resize, crop, format } = req.body;

        if (!format && !resize && !crop) {
            throw new BadRequestError(
                "At least one transformation parameter is required"
            );
        }

        // Creates a mutable reference of the Sharp object that can be used to chain operations together
        let image: Sharp = await convertImageToSharp(file);

        // Crop Image
        if (crop) {
            image = await parseParamAndCallback<ImageCrop>(
                crop,
                image,
                "Invalid crop parameter",
                cropImage
            );
        }

        // Resize Image
        if (resize) {
            image = await parseParamAndCallback<ImageDimensions>(
                resize,
                image,
                "Invalid resize parameter",
                resizeImage
            );
        }

        if (format) {
            if (!acceptedImageTypes.includes(format)) {
                throw new BadRequestError("Invalid image format provided");
            }

            image = await alterImageType(image, format);
        }

        // Convert Image to Buffer
        const transformedImage = await image.toBuffer();

        // Send Image as Response
        res.set("Content-Type", format ? `image/${format}` : mimeType);
        res.send(transformedImage);
    }
);

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running on ${host}`);
});
