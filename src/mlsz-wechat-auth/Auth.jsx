import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { saveConfig } from './config';
import { clearRetryCount } from './retry';
import { isWX, goToSubscribe, saveUserInfo, isSubscribed } from './utils';

let login = null;
if (isWX()) {
  login = require('./wechat').default;
} else {
  login = require('./isz').default;
}

const propTypes = {
  appCode: PropTypes.string,
  appId: PropTypes.string,
  originId: PropTypes.string,
  subscribeUrl: PropTypes.string,
  httpAjax: PropTypes.fun,
  children: PropTypes.element,
};

function Auth(props) {
  const { appCode, appId, originId, subscribeUrl, httpAjax, children } = props;

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    saveConfig({ appCode, appId, originId, subscribeUrl });
  }, [appCode, appId, originId, subscribeUrl]);

  useEffect(() => {
    login(httpAjax).then((res) => {
      const data = JSON.parse(res.data.ctUserJsonStr);

      if (!isSubscribed(data.subscribe)) {
        goToSubscribe();
        return;
      }

      setIsLogin(true);
      saveUserInfo(data);
      clearRetryCount();
    });
  }, [httpAjax]);

  if (!isLogin) {
    return <div>登录中</div>;
  }

  return children;
}

Auth.propTypes = propTypes;

export default Auth;
