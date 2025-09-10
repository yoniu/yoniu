import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import useAlioss from './alioss.js';

// 获取当前目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFolder = path.join(__dirname, 'files')

main();

async function main() {

  console.log('程序启动，正在读取上传文件夹')
  
  const files = fs.readdirSync(uploadFolder)

  const successFiles = [] // 上传成功的文件
  const failFiles = [] // 上传失败的文件
  
  if (!files.length) {
    return console.log('未读取到待上传文件，请稍后重试')
  }

  const oss = useAlioss()
  
  console.log(`一共 ${files.length} 个文件，正在排队上传中...`)

  // 遍历文件列表
  for (let i = 0; i < files.length; i++) {
    const item = files[i]
    const res = await oss.put(item, path.join(uploadFolder, item))
    if (res.status) {
      successFiles.push(item)
      console.log(`文件 ${item} 上传成功：`, (oss.join(res.result.name)))
    } else {
      failFiles.push(item)
      console.log(`文件 ${item} 上传失败`)
    }
  }

  console.log(`成功上传 ${successFiles.length} 个文件`)

  // 删除上传成功的文件
  successFiles.forEach((fileName) => {
    fs.rmSync(path.join(uploadFolder, fileName))
    console.log(`本地文件 ${fileName} 已删除`)
  })

  if (failFiles.length) {
    console.log(`共有 ${failFiles.length} 个文件上传失败，请稍后重试`)
  }
}
