/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SignUpImport } from "./routes/sign-up";
import { Route as LoginImport } from "./routes/login";
import { Route as IndexImport } from "./routes/index";
import { Route as DashboardIndexImport } from "./routes/dashboard/index";
import { Route as CoursesCourseIdImport } from "./routes/courses/$courseId";

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  path: "/sign-up",
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const DashboardIndexRoute = DashboardIndexImport.update({
  path: "/dashboard/",
  getParentRoute: () => rootRoute,
} as any);

const CoursesCourseIdRoute = CoursesCourseIdImport.update({
  path: "/courses/$courseId",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    "/sign-up": {
      id: "/sign-up";
      path: "/sign-up";
      fullPath: "/sign-up";
      preLoaderRoute: typeof SignUpImport;
      parentRoute: typeof rootRoute;
    };
    "/courses/$courseId": {
      id: "/courses/$courseId";
      path: "/courses/$courseId";
      fullPath: "/courses/$courseId";
      preLoaderRoute: typeof CoursesCourseIdImport;
      parentRoute: typeof rootRoute;
    };
    "/dashboard/": {
      id: "/dashboard/";
      path: "/dashboard";
      fullPath: "/dashboard";
      preLoaderRoute: typeof DashboardIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  LoginRoute,
  SignUpRoute,
  CoursesCourseIdRoute,
  DashboardIndexRoute,
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/sign-up",
        "/courses/$courseId",
        "/dashboard/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.tsx"
    },
    "/courses/$courseId": {
      "filePath": "courses/$courseId.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
