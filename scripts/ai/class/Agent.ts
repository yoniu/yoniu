import MCPClient from "./MCPClient.js";
import Chat from "./Chat.js";

export default class Agent {
  private mcpClients: MCPClient[];
  private llm: Chat | null = null;
  private model: string;
  private systemPrompt: string;
  private context: string;

  constructor(model: string, mcpClients: MCPClient[], systemPrompt: string = '', context: string = '') {
    this.mcpClients = mcpClients;
    this.model = model;
    this.systemPrompt = systemPrompt;
    this.context = context;
  }

  async init() {
    console.log('## 初始化工具');
    for await (const client of this.mcpClients) {
      await client.init();
    }
    const tools = this.mcpClients.flatMap(client => client.getTools());
    this.llm = new Chat(this.model, this.systemPrompt, tools, this.context);
  }

  async close() {
    for await (const client of this.mcpClients) {
      await client.close();
    }
  }

  async invoke(prompt: string) {
    if (!this.llm) throw new Error('Agent 未初始化');
    let response = await this.llm.chat(prompt);
    while (true) {
      if (response.toolCalls.length > 0) {
        for (const toolCall of response.toolCalls) {
          const mcp = this.mcpClients.find(client => client.getTools().some((t: any) => t.name === toolCall.function.name));
          if (mcp) {
            console.log(`## 调用工具`);
            console.log(`调用工具: ${toolCall.function.name}`);
            console.log(`参数: ${toolCall.function.arguments}`);
            const result = await mcp.callTool(toolCall.function.name, JSON.parse(toolCall.function.arguments));
            console.log(`结果: ${JSON.stringify(result)}`);
            this.llm.appendToolResult(toolCall.id, JSON.stringify(result));
          } else {
            this.llm.appendToolResult(toolCall.id, '工具未找到');
          }
        }
        // 工具调用后,继续对话
        response = await this.llm.chat();
        continue
      }
      // 没有工具调用,结束对话
      await this.close();
      return response.content;
    }
  }
}