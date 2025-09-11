import { createRequire } from 'module';
import { alioss } from "../../env.config.js";
import path from 'path';

const require = createRequire(import.meta.url);
const OSS = require('ali-oss');

const {
  accessKeyId,
  accessKeySecret,
  region,
  authorizationV4,
  bucket,
  endpoint,
  folder,
  domain,
} = alioss;

export default function useAlioss() {
  const client = new OSS({
    accessKeyId,
    accessKeySecret,
    region,
    authorizationV4,
    bucket,
    endpoint,
  });

  /**
   * 上传文件
   * @param {*} fileName 文件名
   * @param {*} filePath 本地文件地址
   */
  async function put(fileName, filePath) {
    const curDate = `${new Date().getFullYear()}${new Date().getMonth() + 1}`
    const lastPath = [folder, curDate, fileName].join('/');

    try {
      const result = await client.put(
        lastPath,
        filePath,
      );
      return {
        status: true,
        result,
      };
    } catch (e) {
      return {
        status: false,
        result: e,
      }
    }
  }

  function join(...args) {
    return `${domain}/${args.join('/')}`
  }

  return {
    client,
    put,
    join,
  }
}
