/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/_index'
import { Route as AuthImport } from './routes/_auth'

// Create Virtual Routes

const FlowRouteLazyImport = createFileRoute('/flow')()
const TourIndexLazyImport = createFileRoute('/tour/')()
const IndexIndexLazyImport = createFileRoute('/_index/')()
const IndexPostsRouteLazyImport = createFileRoute('/_index/posts')()
const IndexAboutRouteLazyImport = createFileRoute('/_index/about')()
const AuthSignUpRouteLazyImport = createFileRoute('/_auth/sign-up')()
const AuthLoginRouteLazyImport = createFileRoute('/_auth/login')()
const IndexPostsIndexLazyImport = createFileRoute('/_index/posts/')()
const IndexPostsIdRouteLazyImport = createFileRoute('/_index/posts/$id')()
const IndexPostsIdIndexLazyImport = createFileRoute('/_index/posts/$id/')()
const IndexPostsIdEditRouteLazyImport = createFileRoute(
  '/_index/posts/$id/edit',
)()

// Create/Update Routes

const FlowRouteLazyRoute = FlowRouteLazyImport.update({
  path: '/flow',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/flow/route.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  id: '/_index',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const TourIndexLazyRoute = TourIndexLazyImport.update({
  path: '/tour/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tour/index.lazy').then((d) => d.Route))

const IndexIndexLazyRoute = IndexIndexLazyImport.update({
  path: '/',
  getParentRoute: () => IndexRoute,
} as any).lazy(() => import('./routes/_index/index.lazy').then((d) => d.Route))

const IndexPostsRouteLazyRoute = IndexPostsRouteLazyImport.update({
  path: '/posts',
  getParentRoute: () => IndexRoute,
} as any).lazy(() =>
  import('./routes/_index/posts/route.lazy').then((d) => d.Route),
)

const IndexAboutRouteLazyRoute = IndexAboutRouteLazyImport.update({
  path: '/about',
  getParentRoute: () => IndexRoute,
} as any).lazy(() =>
  import('./routes/_index/about/route.lazy').then((d) => d.Route),
)

const AuthSignUpRouteLazyRoute = AuthSignUpRouteLazyImport.update({
  path: '/sign-up',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/sign-up/route.lazy').then((d) => d.Route),
)

const AuthLoginRouteLazyRoute = AuthLoginRouteLazyImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/login/route.lazy').then((d) => d.Route),
)

const IndexPostsIndexLazyRoute = IndexPostsIndexLazyImport.update({
  path: '/',
  getParentRoute: () => IndexPostsRouteLazyRoute,
} as any).lazy(() =>
  import('./routes/_index/posts/index.lazy').then((d) => d.Route),
)

const IndexPostsIdRouteLazyRoute = IndexPostsIdRouteLazyImport.update({
  path: '/$id',
  getParentRoute: () => IndexPostsRouteLazyRoute,
} as any).lazy(() =>
  import('./routes/_index/posts/$id_/route.lazy').then((d) => d.Route),
)

const IndexPostsIdIndexLazyRoute = IndexPostsIdIndexLazyImport.update({
  path: '/',
  getParentRoute: () => IndexPostsIdRouteLazyRoute,
} as any).lazy(() =>
  import('./routes/_index/posts/$id_/index.lazy').then((d) => d.Route),
)

const IndexPostsIdEditRouteLazyRoute = IndexPostsIdEditRouteLazyImport.update({
  path: '/edit',
  getParentRoute: () => IndexPostsIdRouteLazyRoute,
} as any).lazy(() =>
  import('./routes/_index/posts/$id_/edit/route.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_index': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/flow': {
      preLoaderRoute: typeof FlowRouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      preLoaderRoute: typeof AuthLoginRouteLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/sign-up': {
      preLoaderRoute: typeof AuthSignUpRouteLazyImport
      parentRoute: typeof AuthImport
    }
    '/_index/about': {
      preLoaderRoute: typeof IndexAboutRouteLazyImport
      parentRoute: typeof IndexImport
    }
    '/_index/posts': {
      preLoaderRoute: typeof IndexPostsRouteLazyImport
      parentRoute: typeof IndexImport
    }
    '/_index/': {
      preLoaderRoute: typeof IndexIndexLazyImport
      parentRoute: typeof IndexImport
    }
    '/tour/': {
      preLoaderRoute: typeof TourIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_index/posts/$id': {
      preLoaderRoute: typeof IndexPostsIdRouteLazyImport
      parentRoute: typeof IndexPostsRouteLazyImport
    }
    '/_index/posts/': {
      preLoaderRoute: typeof IndexPostsIndexLazyImport
      parentRoute: typeof IndexPostsRouteLazyImport
    }
    '/_index/posts/$id/edit': {
      preLoaderRoute: typeof IndexPostsIdEditRouteLazyImport
      parentRoute: typeof IndexPostsIdRouteLazyImport
    }
    '/_index/posts/$id/': {
      preLoaderRoute: typeof IndexPostsIdIndexLazyImport
      parentRoute: typeof IndexPostsIdRouteLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthRoute.addChildren([AuthLoginRouteLazyRoute, AuthSignUpRouteLazyRoute]),
  IndexRoute.addChildren([
    IndexAboutRouteLazyRoute,
    IndexPostsRouteLazyRoute.addChildren([
      IndexPostsIdRouteLazyRoute.addChildren([
        IndexPostsIdEditRouteLazyRoute,
        IndexPostsIdIndexLazyRoute,
      ]),
      IndexPostsIndexLazyRoute,
    ]),
    IndexIndexLazyRoute,
  ]),
  FlowRouteLazyRoute,
  TourIndexLazyRoute,
])

/* prettier-ignore-end */
