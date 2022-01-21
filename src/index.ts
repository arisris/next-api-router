import type { NextApiRequest, NextApiResponse } from "next";

export interface NextApiRouterRequest extends NextApiRequest {
  params?: Record<any, any>;
}
export type NextApiRouteHandler = (
  req: NextApiRouterRequest,
  res: NextApiResponse
) => void | Promise<void>;
export class TimeoutError extends Error {}
type OnErrorCallback = (
  e: Error,
  req: NextApiRouterRequest,
  res: NextApiResponse
) => void;
export default function NextApiRouter(options?: {
  key?: string;
  timeout?: number;
  onError?: OnErrorCallback;
}) {
  let { key, timeout, onError } = Object.assign(
      {
        key: "any",
        timeout: 10000,
        onError: (e: Error, _: NextApiRouterRequest, res: NextApiResponse) => {
          if (e instanceof TimeoutError) {
            res.status(500).send("<h3>Timeout Error</h3>");
          } else {
            throw e;
          }
        },
      },
      options
    ),
    routes = [],
    handle: NextApiRouteHandler = async (req, res) => {
      try {
        let q = req.query[key];
        let baseUrl = req.url
          .split("/")
          .filter((u) =>
            q && Array.isArray(q) ? !q.some((i) => i === u) : !q.includes(u)
          )
          .join("/");
        delete req.query[key];
        // Regex its taken from original itty-router package. Not Modified
        let regex = (u: string) =>
            RegExp(
              `^${(baseUrl + u)
                .replace(/(\/?)\*/g, "($1.*)?")
                .replace(/\/$/, "")
                .replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3")
                .replace(/\.(?=[\w(])/, "\\.")
                .replace(/\)\.\?\(([^\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`
            ),
          match: RegExpExecArray,
          next: any,
          timeOut: NodeJS.Timeout;
        if (timeout) {
          timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            onError(new TimeoutError("Request timeout"), req, res);
          }, timeout);
        }
        for (let [method, pathname, handlers] of routes) {
          if (
            (method === req.method || method === "ALL") &&
            (match = regex(pathname).exec(req.url))
          ) {
            req.params = match.groups;
            for (let handler of handlers) {
              next = await handler(req, res);
              if (res.writableFinished) {
                if (timeOut) clearTimeout(timeOut);
                break;
              }
              if (next) continue;
            }
          }
        }
      } catch (e) {
        return onError(e, req, res);
      }
    },
    get = (obj: { handle: NextApiRouteHandler }, prop: string, c: any) =>
      prop === "handle"
        ? obj.handle.bind(obj)
        : (url: string, ...handlers: any) =>
            routes.push([prop.toUpperCase(), url, handlers]) && c;
  type HH = (m: string, ...k: NextApiRouteHandler[]) => void;
  return new Proxy<{
    [k: string]: NextApiRouteHandler & HH;
  }>(
    {
      // @ts-ignore
      handle,
    },
    { get }
  );
}
