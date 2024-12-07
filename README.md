## 项目描述

- 系统目的、背景、功能和用户

- - 系统的目的：为大学生提供一个方便、快捷、安全的兼职信息平台，帮助他们找到合适的兼职工作，提高自身能力和收入。

  - 系统的背景：随着社会的发展和教育的改革，越来越多的大学生选择在校期间进行兼职工作，以丰富自己的经验和知识，拓展自己的视野和人脉，增加自己的竞争力和就业机会。然而，目前市场上的兼职信息存在质量不高、真实性不足、安全性不够等问题，给大学生兼职带来了困扰和风险。因此，有必要开发一个专门针对大学生兼职需求的系统，为他们提供一个优质、可信、保障的兼职信息平台。

  - 系统的功能：系统分为个人用户模块、企业用户模块、管理员模块和论坛模块，具体功能如下：

  - - 个人用户模块：可以查看兼职新闻、公告、类型和信息，投递简历。
    - 企业用户模块：可以注册、发布和管理兼职信息，下载和查看简历。
    - 管理员模块：可以管理用户信息，添加网站公告和新闻。
    - 论坛模块：可以提供交流和就业指导的平台。

  - 系统的用户：系统主要面向两类用户，即大学生和企业。大学生是系统的主要服务对象，他们可以通过系统找到适合自己的兼职工作，增加自己的收入和经验。企业是系统的主要合作伙伴，他们可以通过系统发布和管理兼职信息，招募合适的人才。

## 主要文件介绍

| 文件              | 作用/功能                                                    |
| ----------------- | ------------------------------------------------------------ |
| main.js           | 主目录文件，引入 Echart/DataV 等文件                         |
| utils             | 工具函数与 mixins 函数等                                     |
| views/ home.vue   | 项目主结构                                                   |
| views/其余文件    | 界面各个区域组件（按照位置来命名）                           |
| assets            | 静态资源目录，放置 logo 与背景图片                           |
| assets / css/     | 通用 CSS 文件，全局项目快捷样式调节                          |
| components/echart | 所有 echart 图表（按照位置来命名）                           |
| common/...        | 全局封装的 ECharts 和 flexible 插件代码（适配屏幕尺寸，可定制化修改） |
| api/api.js        | 接口封装文件                                                 |
| mock              | 模拟数据接口地址                                             |



## 安装

```
# 克隆项目
git clone https://github.com/TheFutureCreater/vue3-ptsc.git
# 进入项目目录
cd vue3-ptsc
# 安装依赖
pnpm install
# 本地开发 启动项目
pnpm start
```

### 部署

```
# 打包项目
pnpm build
```

## 浏览器支持

本地开发推荐使用 `Chrome 80+` 浏览器

支持现代浏览器, 不支持 `IE`

| [![ Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) IE | [![ Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) Edge | [![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/) Firefox | [![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/) Chrome | [![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/) Safari |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| not support                                                  | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |