export const PREFIX_ROUTES = {
  MAIN: "",
  AUTH: "/auth",
};

const ROUTES = {
  MAIN: {
    LOGIN: `${PREFIX_ROUTES.MAIN}/auth`,
    HOME: `${PREFIX_ROUTES.MAIN}/`,
    PROD: `${PREFIX_ROUTES.MAIN}/product`,
    SHOP: `${PREFIX_ROUTES.MAIN}/shop`,
    CUSTOMER: `${PREFIX_ROUTES.MAIN}/customer`,
    CARTS: `${PREFIX_ROUTES.MAIN}/carts`,
  },
  NOT_FOUND: {
    NOT_FOUND: "*",
    USE_ROLE: "/not-admin",
  },
};

export default ROUTES;
