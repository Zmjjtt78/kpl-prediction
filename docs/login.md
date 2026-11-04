# 登录方式与接入准备

独立网页版已提供可配置的 GitHub OAuth 入口。其他可选方案有邮箱验证码／魔法链接、Google、Apple、手机号验证码；这些是备选方案，目前没有接通。邮箱方案需要邮件服务，短信需要短信服务及费用。不要把“可接入”理解成已经能登录。

QQ：在 https://connect.qq.com/ 完成开发者申请、创建网站应用，准备网站介绍、域名、图标、隐私政策、回调地址与审核材料。QQ互联官方审核规范要求网站和回调地址完成工信部备案。拿到 AppID、AppKey 后才能实现授权、服务端换码、身份映射与会话。密钥只能存服务端，不可提交 GitHub。文档：https://wiki.connect.qq.com/准备工作_oauth2-0/ ，https://wiki.connect.qq.com/网站审核规范/ 。

微信：在 https://open.weixin.qq.com/ 申请开发者账号，按平台要求完成资质认证和网站应用审核，获准微信登录权限，取得 AppID、AppSecret 并配置授权回调域。独立网站扫码登录和微信公众号内网页授权是不同能力，不能混用。资格、材料与收费以申请控制台的现行规则为准。官方文档：https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html 。

你需要完成平台实名／资质认证与审核、提供自己的正式域名，并在部署后台保存密钥。之后才能将 QQ／微信接到这个网站；仅上传 GitHub 不会自动获得这些能力。不要在聊天或公开仓库中粘贴 AppSecret。

已有身份与新登录账号若要合并，需要用户同时证明两个账号的控制权；不按相同昵称自动合并。
