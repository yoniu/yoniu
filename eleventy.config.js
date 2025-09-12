import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";

import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

import pluginRss from "@11ty/eleventy-plugin-rss";
import dayjs from "dayjs";

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
}).use(markdownItAttrs);

/**
 * 匹配 <Video src="..."/>
 */
md.renderer.rules.html_block = (tokens, idx) => {
  const content = tokens[idx].content.trim();

  const match = content.match(/<Video\s+src="([^"]+)"\s*\/?>/i);
  if (match) {
    const src = match[1];
    return `<iframe class="w-full aspect-video rounded overflow-hidden" src="${src}" frameborder="0" allowfullscreen></iframe>`;
  }

  return content;
};

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
	eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setIncludesDirectory("includes");
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  eleventyConfig.addGlobalData("eleventyComputed", {
    layout: data => {
      // 仅对 articles 目录生效
      if (data.page.inputPath.includes("/src/articles/")) {
        return "layout/article.11ty.jsx";
      }
      return data.layout || null; // 其他页面保留原 layout
    }
  });

  // 👇 设置只保留 md / jsx / tsx，不要 liquid
  eleventyConfig.setTemplateFormats([
    "md",
    "11ty.jsx",
    "11ty.tsx",
    "njk"
  ]);
  
  eleventyConfig.addFilter("splitTags", function (value) {
    if (!value) return [];
    return value
      .split(",")
      .map(tag => tag.trim()) // 去掉前后空格
      .filter(Boolean);
  });

  // 👇 让 .md 文件用 markdown-it 渲染，而不是 Liquid
  eleventyConfig.addExtension("md", {
    compile: function (inputContent) {
      return async function (data) {
        // 这里用 markdown-it 渲染
        return md.render(inputContent);
      };
    },
  });

	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
		compile: function () {
			return async function (data) {
				let content = await this.defaultRenderer(data);
				return renderToStaticMarkup(content);
			};
		},
	});

  eleventyConfig.addFilter("toDate", function (value) {
    if (!value) return;
    return dayjs(value).format("YYYY-MM-DDTHH:mm:ss.sssZ");
  });

  eleventyConfig.addFilter("dateToRfc822", pluginRss.dateToRfc822);

  eleventyConfig.addFilter("articleOnly", function (value) {
    if (!value) return;
    return value.filter(item => item.data.cuid);
  });

  eleventyConfig.addFilter("sortByDate", function (value) {
    if (!value) return;
    return value.sort((a, b) => new Date(b.data.datePublished) - new Date(a.data.datePublished));
  });
};
