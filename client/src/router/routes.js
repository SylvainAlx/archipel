export const routes = [
  { path: "/", priority: 1.0 },
  { path: "/citizen/:id", priority: 0.8 },
  { path: "/explore", priority: 0.8 },
  { path: "/explore/:id", priority: 0.8 },
  { path: "/nation/:id", priority: 0.8 },
  { path: "/place/:id", priority: 0.8 },
  { path: "/login", priority: 0.5 },
  { path: "/register", priority: 0.5 },
  { path: "/recovery", priority: 0.5 },
  { path: "/termsofservice", priority: 0.3 },
  { path: "/releasenotes", priority: 0.3 },
  { path: "/admin", priority: 0.1 },
];
