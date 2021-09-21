## 使用方式

1. 安装 mlsz-wechat-auth
   `cnpm install mlsz-wechat-auth --save`

```
const subScribeUrl = 'https://mp.weixin.qq.com/s/2h48UTxEXtNLXVt8smev1g'

function Index() {
    return <div>你已经成功登录</div>;
}

ReactDom.render(
    <Auth appCode={appCode} appId={appId} originId={wxLoginOriginId} subScribeUrl={subScribeUrl}>
        <Index />
    </Auth>,
    document.querySelector('#app'),
);



const signInfo = createSign({
    method,
    url,
    query,
});

const nextConfig = {
    ...config,
    headers: {
        ...signInfo,
    },
};

// 响应404时，重新登录
if (err.status === 401) {
    return goAuth();
}
```

[x] 跳微信的重试次数限制
[x] 配置如何注入授权组件呢？
[ ] 一个获取命令行注入参数的函数
[ ] 更灵活的`headers`注入方式

## 更灵活的 sign 注入方式

导出创建 sign 的函数，在项目中引入使用（暂时这样处理吧）

## 如何取得下面的参数

```
const child = spawn(process.platform === "win32" ? "npm.cmd" : "npm", [
  "run",
  "dev",
  `--basepath=${basepath}`,
  `--login-path=${basepath}`,
  "--launchType=wechat-remote-launch",
]);
```

  <!-- "dependencies": {
    "md5": "^2.3.0",
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "zerod": "^0.6.3"
  }, -->
