const host = "http://localhost:5000/api/v1";

export const loginRoute = `${host}/auth/login`;
export const refreshTokenRoute = `${host}/auth/refresh_token`;
export const logoutRoute = `${host}/auth/logout`;

export const createTemplateRoute = `${host}/template/create`;
export const getAllTemplateRoute = `${host}/template/get-all`;
export const getTemplateByIdRoute = `${host}/template/get`;

export const createProductRoute = `${host}/product/create`;
export const getProductByUser = `${host}/product/get`;
export const getProductById = `${host}/product/get/product`;
export const saveProductRoute = `${host}/product/save`;
export const saveProductNameRoute = `${host}/product/save-name`;
export const cloneTemplateRoute = `${host}/product/clone`;

export const createBlogRoute = `${host}/blog/create`;
export const getAllBlogRoute = `${host}/blog/get-all`;
export const getBlogByIdRoute = `${host}/blog/get`;
export const getBlogCmtByIdRoute = `${host}/comment/blog`;
export const getProcessingBlogRoute = `${host}/blog/processing`;
export const getAcceptedBlogRoute = `${host}/blog/accepted`;
export const acceptBlogRoute = `${host}/blog/approve-accept`;

export const getAllOrderRoute = `${host}/order/get-all-order`;
export const getAllUserRoute = `${host}/user/get-all`;

export const uploadImageRoute = `${host}/upload`;
