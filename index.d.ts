import { NextApiRequest, NextApiResponse } from "next";
export interface NextApiRouterRequest extends NextApiRequest {
    params?: Record<any, any>;
}
export declare type NextApiRouteHandler = (req: NextApiRouterRequest, res: NextApiResponse) => void | Promise<void>;
export declare class TimeoutError extends Error {
}
export declare type OnErrorCallback = (e: Error, req: NextApiRouterRequest, res: NextApiResponse) => void;
export declare function NextApiRouter(options?: {
    key?: string;
    timeout?: number;
    onError?: OnErrorCallback;
}): {
    [k: string]: NextApiRouteHandler & ((m: string, ...k: NextApiRouteHandler[]) => void);
};
export default NextApiRouter;
