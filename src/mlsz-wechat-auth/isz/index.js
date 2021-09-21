import Api from '../api';
import { getCookie } from '../utils';
import { saveToken } from '../token';

import { initSDK, config } from './jssdk';
import { goAuth } from './utils';

function login(httpAjax) {
  return initSDK()
    .then(() => config(httpAjax))
    .then(() => {
      const token = getCookie('UPIP_MP_AUTHORIZATION');

      alert('重定向回来了');

      if (!token) {
        alert('没有token');
        return Promise.reject();
      }

      return saveToken(token);
    })
    .then(() => Api.getCtUserByAuth(httpAjax, { userSource: 'ISZ' }))
    .then((res) => {
      alert('ctUserJsonStr');
      if (!res.data.ctUserJsonStr) {
        return Promise.reject();
      }

      return res;
    })
    .catch(() => {
      alert('进入catch');
      goAuth(httpAjax);
    });
}

export default login;
