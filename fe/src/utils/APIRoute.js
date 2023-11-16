const host = "http://localhost:5000/api/v1";

export const loginRoute = `${host}/auth/login`;
export const refreshTokenRoute = `${host}/auth/refresh_token`;
export const logoutRoute = `${host}/auth/logout`;
export const registerRoute = `${host}/user/register`;
export const firstStepRegisterationRoute = `${host}/auth/first-step-registeration`;
export const confirmOTPRoute = `${host}/auth/submitOTP`;
export const setInfoRoute = `${host}/auth/setInfo`;

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

export const getBlogByUserId = `${host}/blog/get-by-user`;

export const getProcessingBlogRoute = `${host}/blog/processing`;
export const getAcceptedBlogRoute = `${host}/blog/accepted`;
export const acceptBlogRoute = `${host}/blog/approve-accept`;

export const getBlogCmtByIdRoute = `${host}/comment/blog`;
export const commentBlogRoute = `${host}/comment/create`;

export const getAllOrderRoute = `${host}/order/get-all-order`;
export const getAllUserRoute = `${host}/user/get-all`;
export const uploadImageUserRoute = `${host}/user/upload-image`;
export const getUploadImageRoute = `${host}/user/get-images-upload`;

export const uploadImageRoute = `${host}/upload`;
export const publicTemplate = `${host}/public-form`;

export const getProcessingTemplateRoute = `${host}/template/get-template/Processing`;
export const acceptTemplateRoute = `${host}/template/accept-template`;
export const acceptTemplateRoute = `${host}/template/get-template/Processing`;
export const getAcceptTemplateRoute = `${host}/template/accept-template`;
export const getRejectTemplateRoute = `${host}/template/denied-template`;
export const getAcceptTemplate = `${host}/template/get-Accepted`;
