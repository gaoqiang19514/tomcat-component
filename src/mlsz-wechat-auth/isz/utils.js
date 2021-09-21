import getProcessEnv from 'zerod-ztool/axiosInterceptor/getProcessEnv';

import { getConfig } from '../config';
import { hasRetryChance, updateRetryCount } from '../retry';

export function buildRedirectUri(originId, requestCode) {
  alert('start');
  const { basepath } = getProcessEnv();
  const origin = window.location.origin;

  const loginUrl = `${origin}/${basepath}/mp-manage-api/api/public/v1.0/isz/auth/login/${originId}`;
  const page = window.location.href;
  console.log(`${loginUrl}?page=${page}&requestCode=${requestCode}`);
  alert(`${loginUrl}?page=${page}&requestCode=${requestCode}`);
  location.href = `${loginUrl}?page=${page}&requestCode=${requestCode}`;
}

export function iszLogin(appId, originId) {
  // 已登录后，再次调用会直接进入then回调中
  window.sc.userAuth({ appId }, (res) => {
    if (res?.data?.requestCode) {
      buildRedirectUri(originId, res.data.requestCode);
    }
  });
}

export function goAuth() {
  const { appId, originId } = getConfig();

  if (!hasRetryChance()) {
    throw new Error('重试次数耗尽');
  }

  updateRetryCount();
  iszLogin(appId, originId);
}
