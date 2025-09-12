import MCPClient from "./class/MCPClient.js";
import Agent from "./class/Agent.js";
import path from "path";

/**
 * 文章目录
 */
const articlePath = path.join(process.cwd(), 'src', 'articles');

/**
 * 文章 ID
 */
const articleId = process.argv[2]

if (!articleId) {
  console.error('文章 ID 不能为空')
  process.exit(1)
}

/**
 * 系统提示词
 */
const systemPrompt = `
你是一个专业的文章总结专家，请根据文章的内容，写一篇文章总结，至少200个字，不要有多余的回复，直接输出总结。
#### 定位
- 智能助手名称 ：文章总结专家
- 主要任务 ：对输入的文章文本进行自动总结

#### 能力
- 文本分析 ：能够准确分析文章文本的内容和结构。

#### 使用说明
- 输入 ：一段文章文本。
- 输出 ：只输出文章的总结，不需要额外解释。
`

/**
 * 任务
 */
const task = `
这是我的所有文章的路径 ${articlePath}，文章都是 [文章id].md 文件，文章顶部包含文章信息，请帮我获取文章 ID 为 ${articleId} 的文章，用一段话总结文章，至少100个字，不要有多余的回复
将总结保存在文章信息中的 aiSummary 字段中，如果已经有 aiSummary 字段，则覆盖。
`

/**
 * 文件 MCP 客户端
 */
const fileMCP = new MCPClient(
  "mcp-server-file",
  "npx",
  [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    articlePath,
  ]
);

async function main() {
  const agent = new Agent('deepseek-chat', [fileMCP], systemPrompt, '');
  await agent.init();
  await agent.invoke(task);
  await agent.close();
}

main()
