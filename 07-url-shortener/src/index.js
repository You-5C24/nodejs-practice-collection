/**
 * URL 短链接服务 - 主入口文件
 * 
 * 学习目标：
 * - 数据库设计和 URL 映射
 * - 哈希算法和 base62 编码
 * - HTTP 重定向机制
 * - Redis 缓存的使用
 * - 访问统计和分析
 */

// TODO: 导入所需模块
// const express = require('express');
// const mongoose = require('mongoose');
// const redis = require('redis');
// const crypto = require('crypto');

// TODO: 创建 Express 应用
// const app = express();

// TODO: 连接数据库和 Redis
// mongoose.connect('mongodb://localhost/urlshortener');
// const redisClient = redis.createClient();

// TODO: 定义 URL 数据模型
// - originalUrl: 原始 URL
// - shortCode: 短链接代码
// - clicks: 访问次数
// - createdAt: 创建时间
// - expiresAt: 过期时间

// TODO: 实现短码生成函数
// 功能：使用 base62 编码生成唯一短码

// TODO: 实现 URL 验证函数
// 功能：检查 URL 格式是否正确

// TODO: 实现短链接创建 API
// POST /api/shorten
// 接收原始 URL，返回短链接

// TODO: 实现重定向功能
// GET /:code
// 根据短码重定向到原始 URL

// TODO: 实现统计 API
// GET /api/stats/:code
// 返回链接的访问统计

// TODO: 实现缓存机制
// 使用 Redis 缓存热门链接

// TODO: 实现访问记录功能
// 记录每次访问的信息（时间、来源等）

// TODO: 启动服务器
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`短链接服务运行在端口 ${PORT}`);
// });

console.log('URL 短链接服务');
console.log('='.repeat(50));
console.log('TODO: 实现短链接生成和重定向功能');

