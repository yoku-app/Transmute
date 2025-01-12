export interface Dimension<T> {
    width: T;
    height: T;
}

export interface ImageDimensions extends Dimension<number | undefined> {}

export interface ImageCrop extends Dimension<number> {
    left: number;
    top: number;
}

export const acceptedImageTypes = [
    "jpeg",
    "png",
    "gif",
    "jpg",
    "webp",
] as const;

export type ImageType = (typeof acceptedImageTypes)[number];
