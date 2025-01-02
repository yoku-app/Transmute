/** src/middlewares/errors.ts **/

import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "./types/error.interface";

const isCustomError = (error: unknown): error is ErrorResponse => {
return error instanceof ErrorResponse;
};

/**
 * Global Error Handling Middleware Functionality to catch thrown errors
 * @param {T extends Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Check if the error is a custom thrown error
    if (!isCustomError(err)) {
        res.status(500).json({ errors: [{ message: "Something went wrong" }] });
        return;
    }

    if (err.shouldLogError()) {
        console.error(err);
        //Handle Error Logging Services
    }

    // Returning Appropriate Error Response
    res.status(err.getStatus()).json({ errors: err.serializeErrors() });
};
