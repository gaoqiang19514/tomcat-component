import getProcessEnv from 'zerod-ztool/axiosInterceptor/getProcessEnv';

import { getConfig } from '../config';
import { hasRetryChance, updateRetryCount } from '../retry';

export function buildRedirectUri(originId) {
  const { origin, href } = window.location;
  const basePath = getProcessEnv().basepath;

  const loginUrl = `${origin}${basePath}/mp-manage-api/api/public/v1.0/mp/sns/login/${originId}`;

  return encodeURIComponent(`${loginUrl}?page=${href}`);
}

export function buildWXUrl(_appId, _redirectUri) {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${_appId}&redirect_uri=${_redirectUri}&response_type=code&scope=snsapi_base#wechat_redirect`;
}

export function jumpToWX(_appId, originId) {
  const redirectUri = buildRedirectUri(originId);

  window.location.href = buildWXUrl(_appId, redirectUri);
}

export function goAuth() {
  const { appId, originId } = getConfig();

  if (!hasRetryChance()) {
    throw new Error('重试次数耗尽');
  }

  updateRetryCount();
  jumpToWX(appId, originId);
}
