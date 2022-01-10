# Demo

`git clone -b frontend-whole ssh://git@10.12.5.188:10022/appdev/interview`

前端适配：修改`vue.config.js`中的`VUE_APP_DEV`、`VUE_APP_CODE`、`VUE_APP_PRE_URL`、`VUE_APP_MENU_ROOT`

- Bonus示例: 
   ```js
   process.env.VUE_APP_DEV = "http://10.12.7.54:30000/"
   process.env.VUE_APP_CODE = "BYD_BONUS"
   process.env.VUE_APP_PRE_URL = "bonus/api/"
   process.env.VUE_APP_MENU_ROOT = "bonus"
   ```
- Tickets示例: 
  ```js
   process.env.VUE_APP_DEV = "http://10.12.7.111:3000/"
   process.env.VUE_APP_CODE = "BYD_TICKETS"
   process.env.VUE_APP_PRE_URL = "tickets/api/"
   process.env.VUE_APP_MENU_ROOT = "tickets"
  ```

说明：
1. 新项目请在`gitlab`中新建前端项目，复制此分支代码作为初始提交
2. 所有接口均要求符合`public/mock/success.json`和`public/mock/fail.json`格式
3. 如非必要，请不要修改`api.js`。页面发起请求后会经过请求拦截器和响应拦截器处理。请求拦截器中，除了公共模块（如`user`模块）的请求外，其余都会自动添加项目前缀; 响应拦截器中会统一按照约定格式提示失败情况（连接失败或`RESULT:FAIL`），页面中默认仅需处理`RESULT:PASS`的情况。[参考文档：API请求](http://10.12.5.188:10023/appdev/mes3/-/wikis/指南/API请求)
4. `user`模块包含：用户、菜单、项目、角色数据，以下相关接口均需传递`sysCode`参数，请求`header`里面包含`projectId`
   - login
   - mesSysProject/getList|removeById
   - mesSysProjectUser/getList
   - mesSysMenu/all
   - mesSysRole/removeById
   - mesSysUser/removeById
5. 统一风格增删改查管理页面代码生成项目：<http://10.12.5.188:10023/appdev/gencode>

@TBD
后端适配：


## Project setup
```bash
npm install
# or
npm install --registry=http://10.12.5.188:10018/repository/npm-registry
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## TODO
- [ ] 后端项目模板