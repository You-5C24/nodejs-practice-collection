/**
 * 文件管理工具 - 主入口文件
 *
 * 学习目标：
 * - fs 模块的使用（文件读取、写入、删除等）
 * - path 模块的路径处理
 * - 命令行参数解析
 * - 异步操作（Promise、async/await）
 */

const { searchFiles } = require("./search");
const { renameFiles } = require("./rename");
const { formatSearchResults, formatRenameResults } = require("./utils");

console.log("文件管理工具");
console.log("=".repeat(50));

/**
 * 搜索命令参数解析器
 * @param {Array} args - 命令行参数数组
 * @returns {object} - 解析后的参数对象
 */
function parseSearchArgs(args) {
  return {
    command: "search",
    directory: args[1],
    searchTerm: args[2],
    options: {
      extension: args[3] || undefined,
      caseSensitive: false,
      recursive: true,
    },
  };
}

/**
 * 重命名命令参数解析器
 * @param {Array} args - 命令行参数数组
 * @returns {object} - 解析后的参数对象
 */
function parseRenameArgs(args) {
  return {
    command: "rename",
    directory: args[1],
    mode: args[2],
    options: {
      prefix: args[3] || "",
      suffix: args[3] || "",
      oldText: args[3] || "",
      newText: args[4] || "",
      startNumber: parseInt(args[3]) || 1,
      extension: args.find((arg) => arg.startsWith(".")) || null,
      dryRun: args.includes("--dry-run"),
      ignoreHidden: true,
    },
  };
}

/**
 * 命令参数解析器映射
 * 将命令名称映射到对应的参数解析函数
 */
const commandParsers = {
  search: parseSearchArgs,
  rename: parseRenameArgs,
};

/**
 * 解析命令行参数
 * @returns {object} - 解析后的参数对象
 */
function parseArguments() {
  const args = process.argv.slice(2);
  const command = args[0];

  // 获取对应的参数解析器
  const parser = commandParsers[command];

  // 如果找到解析器，执行解析；否则返回 null 命令
  return parser ? parser(args) : { command: null };
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log("\n使用方法：");
  console.log("  node src/index.js search [目录] [关键词] [扩展名]");
  console.log("  node src/index.js rename [目录] [模式] [参数] [--dry-run]");
  console.log("\n搜索参数说明：");
  console.log("  目录      - 要搜索的目录路径（默认：当前目录）");
  console.log("  关键词    - 文件名包含的关键词（可选）");
  console.log("  扩展名    - 文件扩展名过滤，如 .js .txt（可选）");
  console.log("\n重命名参数说明：");
  console.log("  目录      - 要处理的目录路径");
  console.log("  模式      - prefix | suffix | replace | number");
  console.log("  参数      - 根据模式不同：");
  console.log("              prefix:  前缀文本");
  console.log("              suffix:  后缀文本");
  console.log("              replace: 旧文本 新文本");
  console.log("              number:  起始数字");
  console.log("  --dry-run - 预览模式，不实际修改文件");
  console.log("\n搜索示例：");
  console.log("  node src/index.js search ./ index");
  console.log("  node src/index.js search ./src .js");
  console.log("\n重命名示例：");
  console.log("  node src/index.js rename ./test prefix test_");
  console.log("  node src/index.js rename ./test suffix _backup");
  console.log("  node src/index.js rename ./test replace old new");
  console.log("  node src/index.js rename ./test number 1 --dry-run");
  console.log("");
}

/**
 * 搜索命令处理器
 * @param {object} parsedArgs - 解析后的参数对象
 */
async function handleSearchCommand(parsedArgs) {
  const { directory, searchTerm, options } = parsedArgs;

  console.log(`\n🔍 开始搜索...`);
  console.log(`   目录: ${directory}`);
  if (searchTerm) console.log(`   关键词: ${searchTerm}`);
  if (options.extension) console.log(`   扩展名: ${options.extension}`);

  const startTime = Date.now();
  const results = await searchFiles(directory, searchTerm, options);
  const searchTime = Date.now() - startTime;
  formatSearchResults(results, searchTime);
}

/**
 * 重命名命令处理器
 * @param {object} parsedArgs - 解析后的参数对象
 */
async function handleRenameCommand(parsedArgs) {
  const { directory, mode, options } = parsedArgs;

  console.log(`\n✏️  开始批量重命名...`);
  console.log(`   目录: ${directory}`);
  console.log(`   模式: ${mode}`);
  if (options.dryRun) {
    console.log(`   模式: 预览模式（不会实际修改）`);
  }

  const results = await renameFiles(directory, mode, options);
  formatRenameResults(results, options.dryRun);
}

/**
 * 命令映射对象
 * 将命令名称映射到对应的处理函数
 */
const commandHandlers = {
  search: handleSearchCommand,
  rename: handleRenameCommand,
};

/**
 * 主入口函数
 */
async function main() {
  const parsedArgs = parseArguments();
  const { command } = parsedArgs;

  // 获取命令处理器
  const handler = commandHandlers[command];

  // 如果命令不存在，显示帮助信息
  if (!handler) {
    showHelp();
    return;
  }

  // 执行命令处理器
  try {
    await handler(parsedArgs);
  } catch (error) {
    console.error(`❌ ${command} 过程中出错:`, error.message);
  }
}

// TODO: 实现文件统计功能
// 功能：统计目录中的文件数量、类型、大小等信息

// TODO: 实现命令行参数解析
// 功能：解析用户输入的命令和参数

// 程序入口
main().catch((error) => {
  console.error("程序执行出错:", error.message);
  process.exit(1);
});
