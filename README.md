# 逐冠 · KPL预测台

React 19 + Vinext 网站：双败淘汰晋级预测、BP复盘与阵容练习、主队档案、历史统计、预测记录、晋级图PDF与纠错。

## 独立网页版

本源码包已移除原站的托管标识与平台工具，默认 dev/build/deploy 均使用独立 Cloudflare 配置，不依赖 ChatGPT 登录。原站账号和预测记录不在此包中。

GitHub 用来存源码。**GitHub Pages 不能直接运行实时API、数据库与登录回调。** 本项目采用 GitHub 存源码 + Cloudflare Workers 与 D1 运行网站。

## 独立网页版开始使用

环境：Node >=22.13、pnpm 11.25。首次安装可 `corepack enable`，然后：

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm exec wrangler d1 create zhuguan-kpl
```

把返回的 database_id 填入 `wrangler.web.jsonc`，并将 APP_ORIGIN 改成最终网站的 HTTPS origin（不带末尾斜杠）。本地运行：

```sh
pnpm exec wrangler d1 migrations apply zhuguan-kpl --local --config wrangler.web.jsonc
pnpm dev:web
```

发布：

```sh
pnpm exec wrangler d1 migrations apply zhuguan-kpl --remote --config wrangler.web.jsonc
pnpm build:web
pnpm deploy:web
```

Cloudflare 首次授权由部署者在自己的终端完成。默认不附任何账号凭证或线上预测数据。本地 HTTP 可浏览网站；安全登录 Cookie 需要 HTTPS，登录联调用实际 HTTPS 测试域名。

## 可选 GitHub 登录

GitHub Settings → Developer settings → OAuth Apps → New OAuth App：

- Homepage URL：你的 APP_ORIGIN。
- Authorization callback URL：`https://你的域名/api/auth/github/callback`。
- 将 Client ID、Client Secret 和至少32字符的随机 SESSION_SECRET 存入 Cloudflare secrets：

```sh
pnpm exec wrangler secret put GITHUB_CLIENT_ID --config wrangler.web.jsonc
pnpm exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.web.jsonc
pnpm exec wrangler secret put SESSION_SECRET --config wrangler.web.jsonc
```

重新部署后账号页会显示 GitHub 登录。仅请求 read:user，令牌仅用于服务端读取身份、不持久保存；会话使用签名、HttpOnly、Secure Cookie，7天过期。原托管站账号和新 GitHub 账号不会自动合并。独立入口会删除外部传入的平台身份头，防止冒用身份。撤销会话可退出本设备，轮换 SESSION_SECRET 会使所有独立站会话失效。

缺少 OAuth 配置时不会放出假登录按钮。QQ、微信未实现；接入要求与备选方案见 [登录接入说明](docs/login.md)。

## 上传 GitHub

解压源码包，在该目录创建仓库、提交并推送到你自己的空 GitHub 仓库。不要上传 node_modules、dist、.wrangler、.env、.dev.vars 或密钥。源码包已排除原站托管标识和本地工具状态；`.github/workflows/check.yml` 会进行类型检查与独立站构建。

```sh
git init
git add .
git commit -m "Initialize Zhuguan KPL web"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/YOUR_REPO.git
git push -u origin main
```

## 数据口径与纠错

- 历史数据是已归档范围，不能当作完整2016—2026数据库；无法完整核验的历史MVP总榜已撤下，单局已核验MVP保留。
- 个人荣誉 A（B）：A 不含 KWC，B 是包含 KWC 的合计。排序用A。缺失名单或颁奖来源仍是缺项，不代表未获奖。
- 纠错提交后只生成待核验记录，不直接改动榜单；记录保存在 D1 的 battle_cache 表、id 以 `correction:` 开头。部署者通过数据库审阅。没有登录或网络异常时可下载JSON保存，下载不等于提交。
- 实时源站不稳定时使用缓存／归档，并显示数据时间；快照不会被标成实时，也不能用于开放正式预测。
- PDF按晋级双败图绘制，包含预测、连线、冠军及实际赛果注记；不依赖远程图片下载。

## 检查

```sh
pnpm check
pnpm build:web
```

历史赛事源数据、头像、队标与赛事名称的权利归各自权利人；部署者应确认数据使用范围。

## Deployment

This project is deployed using Cloudflare Workers.
