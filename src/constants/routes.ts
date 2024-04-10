export const prefixPath = '';
export const prefixPathAdmin = '/admin';

export const ROUTES = {
  // public routes
  ERROR: `${prefixPath}/404`,
  LOGIN: `${prefixPath}/login`,
  SIGNUP: `${prefixPath}/register`,

  // user routes
  HOME: `${prefixPath}/`,
  USER: {
    PROFILE: `${prefixPath}/user/profile`,
    SETTING: `${prefixPath}/user/setting`,
  },

  // admin routes
  ADMIN: `${prefixPathAdmin}/admin`,
  SYSTEM: `${prefixPathAdmin}/system`,
  BARGE_NOTION: `${prefixPathAdmin}/barge-notion`,
  BARGE_PLAN: `${prefixPathAdmin}/barge-plan`,
  PLAN: `${prefixPathAdmin}/plan`,
  TOOL: `${prefixPathAdmin}/tool`,
  CATEGORIES: {
    INDEX: `${prefixPathAdmin}/categories`,
    OPERATIONS: `${prefixPathAdmin}/categories/operations`,
    CUSTOMER: `${prefixPathAdmin}/categories/customer`,
    CONTAINER_SIZE: `${prefixPathAdmin}/categories/container-size`,
    SECTOR: `${prefixPathAdmin}/categories/sector`,
    COMMODITY: `${prefixPathAdmin}/categories/commodity`,
    PORT: `${prefixPathAdmin}/categories/port`,
    CONTAINER_STATUS: `${prefixPathAdmin}/categories/container-status`,
    DELIVERY_PLAN: `${prefixPathAdmin}/categories/delivery-plan`,
    CONTAINER_DIRECTION: `${prefixPathAdmin}/categories/container-direction`,
    LOADING_INSTRUCTION: `${prefixPathAdmin}/categories/loading-instruction`,
    VENDOR: `${prefixPathAdmin}/categories/vendor`,
  },
};
