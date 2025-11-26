/**
 * 工具函数模块
 *
 * 包含通用的格式化和辅助函数
 */

const path = require("path");

/**
 * 格式化文件大小
 * @param {number} bytes - 文件大小（字节）
 * @returns {string} - 格式化后的文件大小
 */
function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}

/**
 * 格式化并输出搜索结果
 * @param {Array} results - 搜索结果数组
 * @param {number} searchTime - 搜索耗时（毫秒）
 */
function formatSearchResults(results, searchTime) {
  // 输出分隔线
  console.log("\n" + "=".repeat(50));

  // 检查是否有结果
  if (results.length === 0) {
    console.log("❌ 未找到匹配的文件");
  } else {
    console.log(`✅ 找到 ${results.length} 个文件：\n`);

    // 输出每个文件的信息
    results.forEach((file, index) => {
      const relativePath = path.relative(process.cwd(), file.path);
      console.log(`${index + 1}. 📄 ${file.name}`);
      console.log(`   路径: ${relativePath}`);
      console.log(`   大小: ${formatFileSize(file.size)}`);
      console.log("");
    });
  }

  // 输出搜索耗时
  console.log(`⏱️  搜索耗时: ${searchTime}ms`);
  console.log("=".repeat(50));
}

module.exports = {
  formatFileSize,
  formatSearchResults,
};
