import { loadFileList } from 'zerod/components/zTool';

import { getConfig } from '../config';
import Api from '../api';

export function setupWXSign(httpAjax) {
  const url = window.location.href;
  const { originId } = getConfig();

  return new Promise((resolve, reject) => {
    Api.getJsApiSign(httpAjax, { url, originId })
      .then((res) => {
        const signs = res.data;

        window.wx.config({
          debug: false,
          appId: signs.appId,
          timestamp: signs.timestamp,
          nonceStr: signs.nonceStr,
          signature: signs.signature,
          jsApiList: [
            'chooseImage',
            'uploadImage',
            'openLocation',
            'getLocation',
            'downloadImage',
            'getLocalImgData',
            'previewImage',
            'scanQRCode',
          ],
        });

        window.wx.ready(resolve);
        window.wx.error(reject);
      })
      .catch(reject);
  });
}

export function initSDK() {
  return loadFileList(['https://res.wx.qq.com/open/js/jweixin-1.4.0.js']);
}
