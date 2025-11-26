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
      console.log(entry.isFile(), extension);

      if (ignoreHidden && entryName.startsWith(".")) {
        results.skipped.push({
          original: entryName,
          reason: "隐藏文件",
        });
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      if (extension) {
        const fileExt = path.extname(entryName);
        if (fileExt !== extension) {
          continue;
        }
      }

      const oldPath = path.join(absolutePath, entryName);
      let newName;

      try {
        newName = generateNewName(entryName, mode, {
          prefix,
          suffix,
          oldText,
          newText,
          counter,
        });

        if (newName === entryName) {
          results.skipped.push({
            original: entryName,
            reason: "名称未改变",
          });
          continue;
        }

        const newPath = path.join(absolutePath, newName);

        const newPathExists = await checkFileExists(newPath);
        if (newPathExists) {
          results.failed.push({
            original: entryName,
            new: newName,
            error: "目标文件已存在",
          });
          continue;
        }

        if (!dryRun) {
          await fs.rename(oldPath, newPath);
        }

        results.success.push({
          original: entryName,
          new: newName,
        });

        if (mode === "number") {
          counter++;
        }
      } catch (error) {
        results.failed.push({
          original: entryName,
          new: newName || "N/A",
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
  console.log(filename);

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
