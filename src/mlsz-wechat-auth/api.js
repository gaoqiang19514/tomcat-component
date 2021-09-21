export default {
  // 获取微信签名
  getJsApiSign(httpAjax, query) {
    const { originId, ...restQuery } = query;

    return httpAjax(
      'post',
      `/mp-manage-api/api/ct/v1.0/mp/sns/getJsApiSign/${originId}`,
      restQuery,
    );
  },

  // 获取isz init code
  getInitCode(httpAjax, originId) {
    return httpAjax(
      'post',
      `/mp-manage-api/api/ct/v1.0/isz/auth/getInitCode/${originId}`,
    );
  },

  // 获取用户信息
  getCtUserByAuth(httpAjax, query) {
    return httpAjax(
      'post',
      '/mp-manage-api/api/ct/v1.0/user/getCtUserByAuth',
      query,
    );
  },
};
