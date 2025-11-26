# 邮件发送服务 (Email Service)

一个邮件发送服务，用于学习 Nodemailer 和邮件相关技术。

## 📖 学习目标

- **Nodemailer：** 邮件发送库的使用
- **SMTP 协议：** 邮件传输协议理解
- **模板引擎：** 动态生成邮件内容
- **附件处理：** 发送邮件附件
- **定时任务：** 定时发送邮件
- **错误处理：** 邮件发送失败的处理

## 🎯 功能特性

### 1. 邮件发送
- 发送纯文本邮件
- 发送 HTML 邮件
- 发送带附件的邮件
- 抄送和密送

### 2. 模板管理
- HTML 邮件模板
- 动态数据填充
- 模板变量替换

### 3. 批量发送
- 发送给多个收件人
- 个性化邮件内容
- 发送进度跟踪

## 🚀 安装和使用

```bash
# 安装依赖
npm install

# 配置环境变量
# 在 .env 文件中配置 SMTP 信息

# 运行服务
npm start

# 测试发送
npm run test
```

## ⚙️ 配置说明

需要在 `.env` 文件中配置以下信息：

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
FROM_NAME=Your Name
```

## 💡 实现要点

1. 配置 Nodemailer 传输器
2. 创建邮件模板
3. 实现邮件发送函数
4. 处理发送错误和重试
5. 实现批量发送控制
6. 记录发送日志

## 📚 相关知识点

- SMTP 协议基础
- Nodemailer 配置和使用
- HTML 邮件编写
- 模板引擎（如 EJS、Handlebars）
- 环境变量管理
- 异步任务队列

## 🔗 扩展方向

- 实现邮件队列系统
- 添加发送统计功能
- 实现邮件模板编辑器
- 添加邮件追踪功能
- 支持多个 SMTP 账户
- 实现邮件定时发送
- 添加邮件发送限流

## ⚠️ 注意事项

- Gmail 需要使用应用专用密码
- 注意邮件发送频率限制
- 避免被标记为垃圾邮件
- 保护 SMTP 凭证安全

