import { type Request } from "express";
import { type ParamsDictionary } from "express-serve-static-core";

/**
 * Overload Type for Request Body to Explicity Define the Request Body Type and any subsequent types (ie. Params, Query, Response)
 */
export type RequestBody<
    B,
    P = ParamsDictionary,
    Q = qs.ParsedQs,
    R = any
> = Request<P, R, B, Q>;
