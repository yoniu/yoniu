import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import useAlioss from "./alioss.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 存放 md 文件的目录
const mdFolder = path.join(__dirname, "..", "..", "src", "articles");

// 临时下载目录
const tempFolder = path.join(__dirname, "tmp");
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder);
}

main();

async function main() {
  console.log("程序启动，正在读取 markdown 文件夹");

  const files = fs.readdirSync(mdFolder).filter((f) => f.endsWith(".md"));
  if (!files.length) {
    return console.log("未读取到 md 文件，请稍后重试");
  }

  const oss = useAlioss();

  for (const file of files) {
    const filePath = path.join(mdFolder, file);
    let content = fs.readFileSync(filePath, "utf-8");

    // 匹配 hashnode 图片链接
    const regex = /https:\/\/cdn\.hashnode\.com\/res\/hashnode\/image\/upload[^\s)"]+/g;
    const matches = content.match(regex);

    if (!matches) {
      console.log(`文件 ${file} 内没有匹配到图片链接`);
      continue;
    }

    console.log(`文件 ${file} 匹配到 ${matches.length} 张图片`);

    for (const url of matches) {
      try {
        const localFile = await downloadImage(url);
        const res = await oss.put(path.basename(localFile), localFile);

        if (res.status) {
          const newUrl = oss.join(res.result.name);
          content = content.replace(new RegExp(url, "g"), newUrl);
          console.log(`替换成功：${url} → ${newUrl}`);
          fs.rmSync(localFile); // 删除临时下载文件
        } else {
          console.log(`上传失败：${url}`);
        }
      } catch (err) {
        console.error("处理失败：", url, err.message);
      }
    }

    // 覆盖保存 md 文件
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`文件 ${file} 已更新`);
  }
}

// 下载远程图片到临时目录
async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`下载失败：${url}`);
  const buffer = await res.arrayBuffer();
  const fileName = Date.now() + "-" + path.basename(url.split("?")[0]); // 去掉 query
  const filePath = path.join(tempFolder, fileName);
  fs.writeFileSync(filePath, Buffer.from(buffer));
  return filePath;
}
