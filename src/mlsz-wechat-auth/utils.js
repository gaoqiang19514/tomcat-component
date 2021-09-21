import md5 from 'md5';
import getProcessEnv from 'zerod-ztool/axiosInterceptor/getProcessEnv';

import { getConfig } from './config';
import { getToken } from './token';

export function isWX() {
  return false;
}

export function GenNonDuplicateID(randomLength = 8) {
  const id = (
    Number((Math.random() + Math.random()).toString().substr(2, 13)) +
    Date.now()
  )
    .toString(36)
    .slice(-parseInt(randomLength, 10));
  return id;
}

export function createSign({ method, url, query }) {
  const token = getToken();
  const { appCode, originId } = getConfig();
  const nonce = GenNonDuplicateID();
  const timestamp = new Date(Date.now()).getTime();
  const body = query ? JSON.stringify(query) : '';
  const sign = md5(
    `${url}\n${method}\n${nonce}\n${timestamp}\n${appCode}\n${body}`,
  );
  const basepath = getProcessEnv().basepath;

  return {
    nonce,
    timestamp,
    sign,
    testSign: sign,
    originId,
    Authorization: token,
    'X-AppCode': appCode,
    'X-Base-Path': basepath,
    url: `${basepath}${url}`,
  };
}

export function getCookie(name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);

  const arr = document.cookie.match(reg);
  if (arr && arr.length) {
    return arr[2];
  }
  return null;
}

export function isSubscribed(subscribe) {
  return subscribe;
}

export function saveUserInfo(userInfo) {
  localStorage.setItem('USER_INFO_mlsz', JSON.stringify(userInfo));
}

export function goToSubscribe() {
  const { subscribeUrl } = getConfig();

  if (!subscribeUrl) {
    return;
  }

  window.location.href = subscribeUrl;
}
