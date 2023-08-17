/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {

  
  ignoredRouteFiles: ["**/.*"],

  // path: '/posts'
  // path: '/posts/:postId',
  // loaderData: require.resolve('../app/routes/posts/$postId'),
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",

  serverModuleFormat: "cjs",
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};

// export const showPost = (id: number) => {
//   return {
//     path: `/posts/${id}`,
//     component: () => import('./app/routes/posts/$postsId'),
//   };
// };


// remix server cant connect to the url