import { NextApiRequest, NextApiResponse } from "next";
export interface NextApiRouteRequest extends NextApiRequest {
    params?: Record<string, any>;
    locals?: Record<string, any>;
}
export declare type NextApiRouteHandler = (req: NextApiRouteRequest, res: NextApiResponse) => void | Promise<void> | boolean | Promise<boolean>;
export declare type NextApiRouteExtraHandler = (pathNameOrPattern: string, ...nextApiHandlers: NextApiRouteHandler[]) => NextApiRouteMethodProxyType;
export declare type NextApiRouteMaybePosibleMethod = "get" | "post" | "put" | "patch" | "delete" | "options" | "connect" | "all" | "handle";
export declare type NextApiRouteMethodProxyType = {
    [key in NextApiRouteMaybePosibleMethod]: NextApiRouteExtraHandler;
} & {
    handle: NextApiRouteHandler;
};
export declare class NextapiRouteTimeoutError extends Error {
}
export declare class NextapiRouteNotFoundError extends Error {
}
export declare type NextapiRouteOnErrorCallback = (error: Error, req: NextApiRouteRequest, res: NextApiResponse) => void;
export declare type NextapiRouteOptions = {
    key?: string;
    timeout?: number;
    onError?: NextapiRouteOnErrorCallback;
};
export declare function NextApiRoute(options?: NextapiRouteOptions): NextApiRouteMethodProxyType;
export default NextApiRoute;
