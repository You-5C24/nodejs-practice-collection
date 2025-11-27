/**
 * 文件管理工具 - 主入口文件（交互式界面）
 *
 * 学习目标：
 * - fs 模块的使用（文件读取、写入、删除等）
 * - path 模块的路径处理
 * - inquirer 交互式命令行界面
 * - 异步操作（Promise、async/await）
 */

const inquirer = require("inquirer");
const { searchFiles } = require("./search");
const { renameFiles } = require("./rename");
const { formatSearchResults, formatRenameResults } = require("./utils");
const { promptMainMenu, promptHandlers } = require("./prompts");

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
 * 主入口函数 - 交互式界面
 */
async function main() {
  console.log("\n欢迎使用文件管理工具！");
  console.log("=".repeat(50));

  while (true) {
    // 显示主菜单
    const action = await promptMainMenu();

    // 处理退出
    if (action === "exit") {
      console.log("\n👋 再见！");
      break;
    }

    // 获取参数提示函数
    const promptHandler = promptHandlers[action];
    const parsedArgs = await promptHandler();

    // 获取命令处理器
    const handler = commandHandlers[action];

    // 执行命令
    try {
      await handler(parsedArgs);
    } catch (error) {
      console.error(`\n❌ ${action} 过程中出错:`, error.message);
    }

    // 询问是否继续
    const { continueWork } = await inquirer.prompt([
      {
        type: "confirm",
        name: "continueWork",
        message: "\n是否继续使用？",
        default: true,
      },
    ]);

    if (!continueWork) {
      console.log("\n👋 再见！");
      break;
    }

    console.log("\n" + "=".repeat(50));
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
