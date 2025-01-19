import { Sharp } from "sharp";
import { BadRequestError } from "../types/error.interface";

export const parseParamAndCallback = async <T>(
    param: string,
    image: Sharp,
    msg: string,
    cb: (image: Sharp, params: T) => Promise<Sharp>,
    validate?: (params: T) => boolean
): Promise<Sharp> => {
    try {
        const params: T = JSON.parse(param) as T;
        if (validate && !validate(params)) {
            throw new BadRequestError(msg);
        }
        return cb(image, params);
    } catch (error) {
        throw new BadRequestError(msg);
    }
};
