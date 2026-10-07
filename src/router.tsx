import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Soft cross-fade on real page changes only (not search-param or hash updates).
    defaultViewTransition: { types: ({ pathChanged }) => (pathChanged ? ["page"] : false) },
  });

  return router;
};
