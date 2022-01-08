import { NextFunction, Request, Response } from "express";
import { BaseError } from "../../BaseError";

export default () => (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof BaseError) {
        return response.status(err.statusCode).json({
            error: true,
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
}
