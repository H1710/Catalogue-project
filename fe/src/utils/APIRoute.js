const host =
  process.env.REACT_APP_SERVER_DOMAIN || "http://localhost:5000/api/v1";

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

export const createBlankProductRoute = `${host}/product/create/blank`;
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
export const commentBlogRoute = `${host}/comment/blog/create`;
export const getTemplateCommentRoute = `${host}/comment/template`;
export const commentTemplateRoute = `${host}/comment/template/create`;

export const getAllOrderRoute = `${host}/order/get-all-order`;
export const postOrderRoute = `${host}/order/add-order`;

export const getAllUserRoute = `${host}/user/get-all`;
export const uploadImageUserRoute = `${host}/user/upload-image`;
export const getUploadImageRoute = `${host}/user/get-images-upload`;
export const updateUserRoute = `${host}/user/update-user`;
export const deleteUserRoute = `${host}/user/deleteUser`;
export const restoreUserRoute = `${host}/user/restore-user`;

export const uploadImageRoute = `${host}/upload`;
export const publicTemplate = `${host}/public-form`;

export const addOrderRoute = `${host}/order/add-order`;
export const getOrderByYearRoute = `${host}/order/get-order-by-year`;

export const getProcessingTemplateRoute = `${host}/template/get/processing`;
export const acceptTemplateRoute = `${host}/template/accept-template`;
export const rejectTemplateRoute = `${host}/template/denied-template`;
export const getAcceptTemplateRoute = `${host}/template/get-accepted`;
export const ratingTemplateRoute = `${host}/template/rating`;
export const updateClassTemplateRoute = `${host}/template/update-service`;
export const searchTemplateRoute = `${host}/template/search-template`;
