const WECHAT_AUTH_CONFIG = 'wechat-auth-config';

export function getConfig() {
  return JSON.parse(localStorage.getItem(WECHAT_AUTH_CONFIG));
}

export function saveConfig({ appCode, appId, originId, subScribeUrl }) {
  if (!appCode) {
    throw Error('saveConfig(): 缺少appCode');
  }

  if (!appId) {
    throw Error('saveConfig(): 缺少appId');
  }

  if (!originId) {
    throw Error('saveConfig(): 缺少originId');
  }

  const config = {
    appCode,
    appId,
    originId,
    subScribeUrl,
  };

  localStorage.setItem(WECHAT_AUTH_CONFIG, JSON.stringify(config));
}
