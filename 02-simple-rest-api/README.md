# RESTful API 服务器 (Simple REST API)

一个简单的 RESTful API 服务器，用于学习 Express 框架和 Web 服务开发。

## 📖 学习目标

- **Express 框架：** Web 应用框架的使用
- **路由：** 路由定义和参数处理
- **中间件：** 中间件的概念和自定义中间件
- **HTTP 方法：** GET、POST、PUT、DELETE 的使用
- **错误处理：** 统一的错误处理机制
- **数据验证：** 请求数据的验证

## 🎯 功能特性

### 1. CRUD 操作
- 创建资源（POST）
- 读取资源（GET）
- 更新资源（PUT/PATCH）
- 删除资源（DELETE）

### 2. 用户管理
- 用户列表查询
- 用户信息获取
- 用户创建和更新
- 用户删除

### 3. 数据验证
- 请求体验证
- 参数格式检查
- 错误信息返回

## 🚀 安装和使用

```bash
# 安装依赖
npm install

# 启动服务器
npm start

# 开发模式（自动重启）
npm run dev
```

## 📡 API 端点

```
GET    /api/users       - 获取所有用户
GET    /api/users/:id   - 获取单个用户
POST   /api/users       - 创建新用户
PUT    /api/users/:id   - 更新用户
DELETE /api/users/:id   - 删除用户
```

## 💡 实现要点

1. 使用 Express 创建服务器
2. 实现 RESTful 路由规范
3. 使用中间件处理 JSON 请求
4. 实现统一的错误处理
5. 使用内存数据存储（学习阶段）

## 📚 相关知识点

- Express 框架基础
- HTTP 协议和状态码
- RESTful API 设计规范
- 中间件原理
- 错误处理模式

## 🔗 扩展方向

- 添加数据持久化（数据库）
- 实现请求日志记录
- 添加 CORS 支持
- 实现分页和过滤
- 添加 API 文档（Swagger）

