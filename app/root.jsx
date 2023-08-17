import * as React from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
// import {$postId} from '../app/routes/posts/$postsId';
// import {Outlet} from "remix";
// import {$postId} from "./app/routes/posts/$postId";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <h2> Global Container </h2> */}
        <Outlet />
       
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
