/**
 * 图片处理服务 - 主入口文件
 * 
 * 学习目标：
 * - Multer 文件上传中间件的使用
 * - Sharp 图片处理库的使用
 * - Stream 和 Buffer 的操作
 * - 文件系统的管理
 * - 异步任务队列
 */

// TODO: 导入所需模块
// const express = require('express');
// const multer = require('multer');
// const sharp = require('sharp');
// const fs = require('fs').promises;
// const path = require('path');

// TODO: 创建 Express 应用
// const app = express();

// TODO: 配置 Multer
// 设置文件存储位置、命名规则、文件过滤
// const storage = multer.diskStorage({
//   destination: 'uploads/temp/',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// TODO: 实现文件验证函数
// 功能：检查文件类型和大小

// TODO: 实现图片压缩函数
// 功能：使用 Sharp 压缩图片

// TODO: 实现格式转换函数
// 功能：转换图片格式（JPG、PNG、WebP）

// TODO: 实现缩略图生成函数
// 功能：生成指定尺寸的缩略图

// TODO: 实现图片裁剪函数
// 功能：裁剪图片到指定区域

// TODO: 实现水印添加函数
// 功能：在图片上添加水印

// TODO: 实现文件上传 API
// POST /api/upload
// 处理单个或多个文件上传

// TODO: 实现图片处理 API
// POST /api/process
// 处理图片（压缩、转换、裁剪等）

// TODO: 实现临时文件清理
// 定期清理临时文件和过期文件

// TODO: 启动服务器
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`图片处理服务运行在端口 ${PORT}`);
// });

console.log('图片处理服务');
console.log('='.repeat(50));
console.log('TODO: 实现图片上传和处理功能');

