/**
 * 文件搜索功能模块
 *
 * 实现递归搜索和文件匹配逻辑
 */

const fs = require("fs").promises;
const path = require("path");

/**
 * 递归搜索文件
 * @param {string} directory - 搜索的起始目录
 * @param {string} searchTerm - 搜索关键词（默认空字符串）
 * @param {object} options - 选项对象
 * @returns {Promise<Array>} - 搜索结果数组
 */
async function searchFiles(directory, searchTerm = "", options = {}) {
  // 设置默认选项
  const {
    extension,
    caseSensitive = false,
    recursive = true,
    ignoreDirs = ["node_modules", ".git"],
    ignoreHidden = true,
  } = options;

  // 初始化结果数组
  const results = [];

  // 获取目录的绝对路径
  const absolutePath = path.resolve(directory);

  try {
    // 读取目录内容，使用 withFileTypes 获取文件类型
    const entries = await fs.readdir(absolutePath, { withFileTypes: true });

    // 遍历目录中的每个条目
    for (const entry of entries) {
      const entryName = entry.name;
      const entryPath = path.join(absolutePath, entryName);

      // 检查是否是隐藏文件
      if (ignoreHidden && entryName.startsWith(".")) {
        continue;
      }

      // 如果是目录
      if (entry.isDirectory()) {
        // 检查是否在忽略列表中
        if (ignoreDirs.includes(entryName)) {
          continue;
        }

        // 如果启用递归，递归搜索子目录
        if (recursive) {
          const subResults = await searchFiles(entryPath, searchTerm, options);
          results.push(...subResults);
        }
      }
      // 如果是文件
      else if (entry.isFile()) {
        // 检查文件是否匹配搜索条件
        if (matchFile(entryName, searchTerm, { extension, caseSensitive })) {
          // 获取文件详细信息
          const stats = await fs.stat(entryPath);

          // 添加到结果数组
          results.push({
            name: entryName,
            path: entryPath,
            dir: absolutePath,
            size: stats.size,
            extension: path.extname(entryName),
          });
        }
      }
    }
  } catch (error) {
    // 捕获权限错误或其他文件系统错误
    console.warn(`⚠️  无法访问目录 ${absolutePath}: ${error.message}`);
  }

  return results;
}

/**
 * 匹配文件是否符合搜索条件
 * @param {string} filename - 文件名
 * @param {string} searchTerm - 搜索关键词
 * @param {object} options - 选项对象
 * @returns {boolean} - 是否匹配
 */
function matchFile(filename, searchTerm, options) {
  const { extension, caseSensitive = false } = options;

  // 如果没有任何搜索条件，匹配所有文件
  if (!searchTerm && !extension) {
    return true;
  }

  // 检查扩展名
  if (extension) {
    const fileExt = path.extname(filename);
    if (fileExt !== extension) {
      return false;
    }
  }

  // 检查文件名关键词
  if (searchTerm) {
    const fileNameToMatch = caseSensitive ? filename : filename.toLowerCase();
    const termToMatch = caseSensitive ? searchTerm : searchTerm.toLowerCase();
    if (!fileNameToMatch.includes(termToMatch)) {
      return false;
    }
  }

  return true;
}

module.exports = {
  searchFiles,
};

