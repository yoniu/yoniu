import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
	eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setIncludesDirectory("includes");
  eleventyConfig.addPassthroughCopy("public");

  eleventyConfig.addTemplateFormats("11ty.jsx,11ty.tsx");

	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
		compile: function () {
			return async function (data) {
				let content = await this.defaultRenderer(data);
				return renderToStaticMarkup(content);
			};
		},
	});
};
