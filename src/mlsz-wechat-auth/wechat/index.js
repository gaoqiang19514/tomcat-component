import Api from '../api';
import { getCookie } from '../utils';
import { saveToken } from '../token';

import { initSDK, setupWXSign } from './jssdk';
import { goAuth } from './utils';

function login(httpAjax) {
  return initSDK()
    .then(() => {
      const token = getCookie('UPIP_MP_AUTHORIZATION');

      if (!token) {
        return Promise.reject();
      }

      return saveToken(token);
    })
    .then(() => setupWXSign(httpAjax))
    .then(() => Api.getCtUserByAuth(httpAjax, { userSource: 'WECHAT' }))
    .then((res) => {
      if (!res.data.ctUserJsonStr) {
        return Promise.reject();
      }

      return res;
    })
    .catch(goAuth);
}

export default login;
