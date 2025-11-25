import { defineConfig } from "tinacms";
import dayjs from 'dayjs';

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const useS3MediaStore = Boolean(process.env.S3_BUCKET);

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-s3')
      return pack.TinaCloudS3MediaStore
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "文章",
        path: 'src/articles',
        match: {
          include: '*',
        },
        format: 'md',
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "内容",
            isBody: true,
          },
          {
            type: "string",
            name: "cuid",
            label: "CUID 唯一标识",
            required: true,
          },
          {
            type: "string",
            name: "permalink",
            label: "永久链接",
          },
          {
            type: "image",
            name: "cover",
            label: "封面 URL",
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
          },
          {
            type: "datetime",
            name: "datePublished",
            label: "发布日期",
            ui: {
              format: (value) => {
                return dayjs(value).format("YYYY-MM-DD HH:mm:ss")
              },
            }
          },
        ],
      },
    ],
  },

  client: {
    skip: true,
  },
});
