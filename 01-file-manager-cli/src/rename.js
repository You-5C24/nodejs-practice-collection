const fs = require("fs").promises;
const path = require("path");

/**
 * 批量重命名文件
 * @param {string} directory - 目标目录
 * @param {string} mode - 重命名模式：prefix, suffix, replace, number
 * @param {object} options - 重命名选项
 * @returns {Promise<object>} - 重命名结果
 */
async function renameFiles(directory, mode, options = {}) {
  const {
    prefix = "",
    suffix = "",
    oldText = "",
    newText = "",
    startNumber = 1,
    extension = null,
    dryRun = false,
    ignoreHidden = true,
  } = options;

  const results = {
    success: [],
    failed: [],
    skipped: [],
  };

  const absolutePath = path.resolve(directory);

  try {
    const entries = await fs.readdir(absolutePath, { withFileTypes: true });

    let counter = startNumber;

    for (const entry of entries) {
      const entryName = entry.name;

      // 检查文件是否应该被跳过
      const skipCheck = shouldSkipFile(entry, { ignoreHidden, extension });
      if (skipCheck.skip) {
        results.skipped.push({
          original: entryName,
          reason: skipCheck.reason,
        });
        continue;
      }

      // 准备重命名操作
      const prepareResult = await prepareRenameOperation(
        entryName,
        absolutePath,
        mode,
        { prefix, suffix, oldText, newText, counter }
      );

      // 如果准备失败且有skipReason，添加到skipped
      if (!prepareResult.success && prepareResult.skipReason) {
        results.skipped.push({
          original: entryName,
          reason: prepareResult.skipReason,
        });
        continue;
      }

      // 如果准备失败且有error，添加到failed
      if (!prepareResult.success && prepareResult.error) {
        results.failed.push({
          original: prepareResult.original || entryName,
          new: prepareResult.newName || "N/A",
          error: prepareResult.error,
        });
        continue;
      }

      // 执行重命名
      try {
        await executeRename(
          prepareResult.oldPath,
          prepareResult.newPath,
          dryRun
        );

        results.success.push({
          original: entryName,
          new: prepareResult.newName,
        });

        // 如果是number模式，增加计数器
        if (mode === "number") {
          counter++;
        }
      } catch (error) {
        results.failed.push({
          original: entryName,
          new: prepareResult.newName,
          error: error.message,
        });
      }
    }
  } catch (error) {
    throw new Error(`无法读取目录 ${absolutePath}: ${error.message}`);
  }

  return results;
}

/**
 * 检查文件是否应该被跳过
 * @param {object} entry - 文件目录项（fs.Dirent对象）
 * @param {object} options - 配置选项
 * @param {boolean} options.ignoreHidden - 是否忽略隐藏文件
 * @param {string|null} options.extension - 指定的文件扩展名
 * @returns {object} - { skip: boolean, reason?: string }
 */
function shouldSkipFile(entry, options) {
  const { ignoreHidden, extension } = options;
  const entryName = entry.name;

  // 检查隐藏文件
  if (ignoreHidden && entryName.startsWith(".")) {
    return { skip: true, reason: "隐藏文件" };
  }

  // 检查是否为文件
  if (!entry.isFile()) {
    return { skip: true, reason: "非文件" };
  }

  // 检查扩展名
  if (extension) {
    const fileExt = path.extname(entryName);
    if (fileExt !== extension) {
      return { skip: true, reason: "扩展名不匹配" };
    }
  }

  return { skip: false };
}

/**
 * 准备重命名操作（生成新名称、检查冲突）
 * @param {string} entryName - 原文件名
 * @param {string} absolutePath - 目录的绝对路径
 * @param {string} mode - 重命名模式
 * @param {object} params - 重命名参数（prefix, suffix, oldText, newText, counter）
 * @returns {Promise<object>} - { success: boolean, oldPath?, newPath?, newName?, skipReason?, error? }
 */
async function prepareRenameOperation(entryName, absolutePath, mode, params) {
  const oldPath = path.join(absolutePath, entryName);

  try {
    // 生成新文件名
    const newName = generateNewName(entryName, mode, params);

    // 检查名称是否改变
    if (newName === entryName) {
      return { success: false, skipReason: "名称未改变" };
    }

    // 构建新路径
    const newPath = path.join(absolutePath, newName);

    // 检查文件是否存在
    const newPathExists = await checkFileExists(newPath);
    if (newPathExists) {
      return {
        success: false,
        original: entryName,
        newName,
        error: "目标文件已存在",
      };
    }

    return { success: true, oldPath, newPath, newName };
  } catch (error) {
    return { success: false, original: entryName, error: error.message };
  }
}

/**
 * 执行文件重命名操作
 * @param {string} oldPath - 原文件路径
 * @param {string} newPath - 新文件路径
 * @param {boolean} dryRun - 是否为演习模式
 * @returns {Promise<void>}
 */
async function executeRename(oldPath, newPath, dryRun) {
  if (!dryRun) {
    await fs.rename(oldPath, newPath);
  }
}

/**
 * 根据模式生成新文件名
 * @param {string} filename - 原文件名
 * @param {string} mode - 重命名模式
 * @param {object} params - 参数对象
 * @returns {string} - 新文件名
 */
function generateNewName(filename, mode, params) {
  const { prefix, suffix, oldText, newText, counter } = params;
  const ext = path.extname(filename);
  const nameWithoutExt = path.basename(filename, ext);

  switch (mode) {
    case "prefix":
      return `${prefix}${filename}`;

    case "suffix":
      return `${nameWithoutExt}${suffix}${ext}`;

    case "replace":
      if (!oldText) {
        throw new Error("replace 模式需要指定 oldText 参数");
      }
      const newNameWithoutExt = nameWithoutExt.replace(
        new RegExp(oldText, "g"),
        newText
      );
      return `${newNameWithoutExt}${ext}`;

    case "number":
      const paddedNumber = String(counter).padStart(3, "0");
      return `${paddedNumber}${ext}`;

    default:
      throw new Error(`不支持的重命名模式: ${mode}`);
  }
}

/**
 * 检查文件是否存在
 * @param {string} filePath - 文件路径
 * @returns {Promise<boolean>} - 文件是否存在
 */
async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  renameFiles,
};
