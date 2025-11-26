/**
 * 文件管理工具 - 主入口文件
 *
 * 学习目标：
 * - fs 模块的使用（文件读取、写入、删除等）
 * - path 模块的路径处理
 * - 命令行参数解析
 * - 异步操作（Promise、async/await）
 */

const path = require("path");
const { searchFiles } = require("./search");
const { formatSearchResults } = require("./utils");

console.log("文件管理工具");
console.log("=".repeat(50));

/**
 * 解析命令行参数
 * @returns {object} - 解析后的参数对象
 */
function parseArguments() {
  const args = process.argv.slice(2);

  const command = args[0] || "search";
  const directory = args[1] || "./";
  const searchTerm = args[2] || "";
  const extension = args[3] || undefined;

  return {
    command,
    directory,
    searchTerm,
    options: {
      extension,
      caseSensitive: false,
      recursive: true,
    },
  };
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log("\n使用方法：");
  console.log("  node src/index.js search [目录] [关键词] [扩展名]");
  console.log("\n参数说明：");
  console.log("  目录      - 要搜索的目录路径（默认：当前目录）");
  console.log("  关键词    - 文件名包含的关键词（可选）");
  console.log("  扩展名    - 文件扩展名过滤，如 .js .txt（可选）");
  console.log("\n示例：");
  console.log("  node src/index.js search ./ index");
  console.log("  node src/index.js search ./src .js");
  console.log("  node src/index.js search ./test test .txt");
  console.log("");
}

/**
 * 主入口函数
 */
async function main() {
  // 解析命令行参数
  const { command, directory, searchTerm, options } = parseArguments();

  // 检查命令
  if (command !== "search") {
    showHelp();
    return;
  }

  // 输出搜索开始提示
  console.log(`\n🔍 开始搜索...`);
  console.log(`   目录: ${directory}`);
  if (searchTerm) console.log(`   关键词: ${searchTerm}`);
  if (options.extension) console.log(`   扩展名: ${options.extension}`);

  // 记录开始时间
  const startTime = Date.now();

  try {
    // 执行搜索
    const results = await searchFiles(directory, searchTerm, options);

    // 计算搜索耗时
    const searchTime = Date.now() - startTime;

    // 输出结果
    formatSearchResults(results, searchTime);
  } catch (error) {
    console.error("❌ 搜索过程中出错:", error.message);
  }
}

// TODO: 实现批量重命名功能
// 功能：批量为文件添加前缀、后缀或替换名称

// TODO: 实现文件统计功能
// 功能：统计目录中的文件数量、类型、大小等信息

// TODO: 实现命令行参数解析
// 功能：解析用户输入的命令和参数

// 程序入口
main().catch((error) => {
  console.error("程序执行出错:", error.message);
  process.exit(1);
});
