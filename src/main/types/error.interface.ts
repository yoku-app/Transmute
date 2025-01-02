export abstract class ErrorResponse extends Error {
    private statusCode: number;
    private logError: boolean = true;

    constructor(message: string, statusCode: number, logError: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.logError = logError;
        Object.setPrototypeOf(this, ErrorResponse.prototype);
    }

    public abstract serializeErrors(): { message: string; field?: string }[];

    public getStatus(): number {
        return this.statusCode;
    }

    public shouldLogError(): boolean {
        return this.logError;
    }
}

export class BadRequestError extends ErrorResponse {
    constructor(public message: string) {
        super(message, 400);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export class OperationError extends ErrorResponse {
    constructor(public message: string) {
        super(message, 500);
        Object.setPrototypeOf(this, OperationError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export class NotFoundError extends ErrorResponse {
    constructor(public message: string) {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
