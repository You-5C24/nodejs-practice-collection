/**
 * 交互式提示模块
 *
 * 包含所有使用 inquirer 进行用户交互的提示函数
 */

const inquirer = require("inquirer");

/**
 * 交互式主菜单
 * @returns {Promise<string>} - 用户选择的操作
 */
async function promptMainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "请选择要执行的操作：",
      choices: [
        { name: "🔍 搜索文件", value: "search" },
        { name: "✏️  批量重命名", value: "rename" },
        { name: "❌ 退出", value: "exit" },
      ],
    },
  ]);
  return action;
}

/**
 * 交互式搜索参数输入
 * @returns {Promise<object>} - 搜索参数对象
 */
async function promptSearchParams() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "directory",
      message: "请输入搜索目录路径：",
      default: "./",
    },
    {
      type: "input",
      name: "searchTerm",
      message: "请输入搜索关键词（可选，直接回车跳过）：",
      default: "",
    },
    {
      type: "input",
      name: "extension",
      message: "请输入文件扩展名（可选，如 .js .txt，直接回车跳过）：",
      default: "",
      validate: (input) => {
        if (!input) return true;
        if (
          input.startsWith(".") &&
          !input.includes("/") &&
          !input.includes("\\")
        ) {
          return true;
        }
        return "扩展名格式不正确，应该类似 .js 或 .txt";
      },
    },
  ]);

  return {
    command: "search",
    directory: answers.directory,
    searchTerm: answers.searchTerm,
    options: {
      extension: answers.extension || undefined,
      caseSensitive: false,
      recursive: true,
    },
  };
}

/**
 * 交互式重命名参数输入
 * @returns {Promise<object>} - 重命名参数对象
 */
async function promptRenameParams() {
  const basicAnswers = await inquirer.prompt([
    {
      type: "input",
      name: "directory",
      message: "请输入目标目录路径：",
      default: "./",
    },
    {
      type: "list",
      name: "mode",
      message: "请选择重命名模式：",
      choices: [
        { name: "添加前缀 (prefix)", value: "prefix" },
        { name: "添加后缀 (suffix)", value: "suffix" },
        { name: "替换文本 (replace)", value: "replace" },
        { name: "数字编号 (number)", value: "number" },
      ],
    },
  ]);

  // 根据模式询问不同的参数
  let modeSpecificAnswers = {};

  switch (basicAnswers.mode) {
    case "prefix":
      modeSpecificAnswers = await inquirer.prompt([
        {
          type: "input",
          name: "prefix",
          message: "请输入要添加的前缀：",
          validate: (input) => input.trim() !== "" || "前缀不能为空",
        },
      ]);
      break;

    case "suffix":
      modeSpecificAnswers = await inquirer.prompt([
        {
          type: "input",
          name: "suffix",
          message: "请输入要添加的后缀：",
          validate: (input) => input.trim() !== "" || "后缀不能为空",
        },
      ]);
      break;

    case "replace":
      modeSpecificAnswers = await inquirer.prompt([
        {
          type: "input",
          name: "oldText",
          message: "请输入要替换的文本：",
          validate: (input) => input.trim() !== "" || "要替换的文本不能为空",
        },
        {
          type: "input",
          name: "newText",
          message: "请输入新文本：",
          default: "",
        },
      ]);
      break;

    case "number":
      modeSpecificAnswers = await inquirer.prompt([
        {
          type: "input",
          name: "startNumber",
          message: "请输入起始数字：",
          default: "1",
          validate: (input) => {
            const num = parseInt(input);
            return (!isNaN(num) && num >= 0) || "请输入有效的数字";
          },
        },
      ]);
      break;
  }

  // 通用选项
  const commonAnswers = await inquirer.prompt([
    {
      type: "input",
      name: "extension",
      message: "仅处理特定扩展名的文件（可选，如 .txt，直接回车跳过）：",
      default: "",
      validate: (input) => {
        if (!input) return true;
        if (
          input.startsWith(".") &&
          !input.includes("/") &&
          !input.includes("\\")
        ) {
          return true;
        }
        return "扩展名格式不正确，应该类似 .js 或 .txt";
      },
    },
    {
      type: "confirm",
      name: "dryRun",
      message: "是否使用预览模式（不会实际修改文件）？",
      default: true,
    },
  ]);

  return {
    command: "rename",
    directory: basicAnswers.directory,
    mode: basicAnswers.mode,
    options: {
      prefix: modeSpecificAnswers.prefix || "",
      suffix: modeSpecificAnswers.suffix || "",
      oldText: modeSpecificAnswers.oldText || "",
      newText: modeSpecificAnswers.newText || "",
      startNumber: parseInt(modeSpecificAnswers.startNumber) || 1,
      extension: commonAnswers.extension || null,
      dryRun: commonAnswers.dryRun,
      ignoreHidden: true,
    },
  };
}

/**
 * 提示函数映射对象
 * 将命令名称映射到对应的参数提示函数
 */
const promptHandlers = {
  search: promptSearchParams,
  rename: promptRenameParams,
};

module.exports = {
  promptMainMenu,
  promptHandlers,
};
