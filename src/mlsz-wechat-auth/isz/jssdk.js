import { loadFileList } from 'zerod/components/zTool';

import { getConfig } from '../config';
import Api from '../api';

export function initSDK() {
  return loadFileList(['https://isz-open.sz.gov.cn/lib/jpasc-0.4.0.js']);
}

export function config(httpAjax) {
  const { appId, originId } = getConfig();

  return new Promise((resolve, reject) => {
    Api.getInitCode(httpAjax, originId).then((res) => {
      const { initCode } = res.data;

      window.sc.config({
        debug: true, //开发时建议把调试模式开启
        appId, //从深圳开放平台申请到的appId
        initCode, //从业务方自己后台请求到initCode, getInitCode.do不能由H5直接向开放平台获取，因为开放平台对业务方后台有白名单校验，直接由H5请求getInitCode.do的话，会发生错误
        nativeApis: [
          'userAuth',
          'previewImages',
          'openLocation',
          'mapProvider',
          'chooseImage',
          'close',
          'contact',
          'face',
          'getFaceImage',
        ],
      });

      window.sc.ready(resolve);
      window.sc.error(reject);
    });
  });
}
