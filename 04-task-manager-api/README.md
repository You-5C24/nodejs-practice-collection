# 任务管理 API (Task Manager API)

一个完整的任务管理 RESTful API，包含数据库集成和用户认证功能。

## 📖 学习目标

- **数据库集成：** MongoDB/SQLite 的使用
- **ORM/ODM：** Mongoose/Sequelize 的使用
- **身份验证：** JWT (JSON Web Token) 认证
- **授权：** 基于角色的访问控制
- **数据模型：** 数据库模型设计
- **密码安全：** 密码加密和验证

## 🎯 功能特性

### 1. 用户认证
- 用户注册
- 用户登录
- JWT Token 生成
- Token 验证中间件

### 2. 任务管理
- 创建任务
- 查询任务列表
- 更新任务状态
- 删除任务
- 任务分类和标签

### 3. 权限控制
- 用户只能访问自己的任务
- Token 过期处理
- 刷新 Token 机制

## 🚀 安装和使用

```bash
# 安装依赖
npm install

# 配置环境变量
# 创建 .env 文件，参考 .env.example

# 启动服务器
npm start

# 开发模式
npm run dev
```

## 📡 API 端点

### 认证
```
POST /api/auth/register  - 用户注册
POST /api/auth/login     - 用户登录
```

### 任务
```
GET    /api/tasks       - 获取任务列表
GET    /api/tasks/:id   - 获取单个任务
POST   /api/tasks       - 创建任务
PUT    /api/tasks/:id   - 更新任务
DELETE /api/tasks/:id   - 删除任务
```

## 💡 实现要点

1. 使用 MongoDB/SQLite 存储数据
2. 使用 Mongoose/Sequelize ORM
3. 使用 bcrypt 加密密码
4. 使用 JWT 生成和验证 Token
5. 实现认证中间件保护路由
6. 实现数据验证和错误处理

## 📚 相关知识点

- 数据库基础和 NoSQL/SQL
- ORM/ODM 概念
- JWT 认证原理
- 密码加密（bcrypt）
- 中间件链式调用
- RESTful API 最佳实践

## 🔗 扩展方向

- 添加 Token 刷新机制
- 实现任务分享功能
- 添加任务提醒功能
- 实现任务搜索和过滤
- 添加文件附件上传
- 实现任务统计图表

