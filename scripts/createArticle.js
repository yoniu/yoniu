import path from 'path'
import fs from 'fs';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';

// 获取当前目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const id = nanoid()

const content = `---
title: ""
datePublished: ${new Date().getTime()}
cuid: ${id}
permalink: 
cover: 
tags: []
---
`

const filePath = path.join(__dirname, '..', 'src', 'articles', `${id}.md`)

// 写入文件
fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.error('创建文件失败:', err);
  } else {
    console.log(`文件已创建: ${filePath}`);
  }
});
