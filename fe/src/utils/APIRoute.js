const host = "http://localhost:5000/api/v1";

export const loginRoute = `${host}/auth/login`;

export const createTemplateRoute = `${host}/template/create`;
export const getTemplateRoute = `${host}/template/get`;

export const createBlogRoute = `${host}/blog/create`;
export const getAllBlogRoute = `${host}/blog/get-all`;
export const getBlogByIdRoute = `${host}/blog/get`;
export const getBlogCmtByIdRoute = `${host}/comment/blog`;

export const getAllOrderRoute = `${host}/order/get-all-order`;
export const getAllUserRoute = `${host}/user/get-all`;

export const uploadImageRoute = `${host}/upload`;
