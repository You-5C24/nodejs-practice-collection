/**
 * 任务管理 API - 主入口文件
 * 
 * 学习目标：
 * - 数据库连接和操作（MongoDB/SQLite）
 * - ORM/ODM 的使用（Mongoose/Sequelize）
 * - JWT 认证和授权
 * - 密码加密和验证（bcrypt）
 * - 数据模型设计
 */

// TODO: 导入所需模块
// const express = require('express');
// const mongoose = require('mongoose'); // 或 const { Sequelize } = require('sequelize');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// TODO: 创建 Express 应用
// const app = express();

// TODO: 配置中间件
// app.use(express.json());

// TODO: 连接数据库
// mongoose.connect('mongodb://localhost/taskmanager', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// TODO: 定义数据模型
// - User 模型（用户名、密码、邮箱等）
// - Task 模型（标题、描述、状态、创建者等）

// TODO: 实现认证中间件
// 验证 JWT Token 的有效性

// TODO: 实现认证路由
// POST /api/auth/register - 用户注册
// POST /api/auth/login    - 用户登录

// TODO: 实现任务路由（需要认证）
// GET    /api/tasks       - 获取任务列表
// GET    /api/tasks/:id   - 获取单个任务
// POST   /api/tasks       - 创建任务
// PUT    /api/tasks/:id   - 更新任务
// DELETE /api/tasks/:id   - 删除任务

// TODO: 错误处理中间件
// 处理各种错误情况

// TODO: 启动服务器
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`任务管理 API 运行在端口 ${PORT}`);
// });

console.log('任务管理 API');
console.log('='.repeat(50));
console.log('TODO: 实现数据库集成和认证功能');

