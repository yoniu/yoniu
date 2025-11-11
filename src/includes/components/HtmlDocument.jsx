import site from '../config/site';
import React from "react";


export default function HtmlDocument({
  children,
  title = site.title,
  description = site.description,
}) {
  const metaTitle = title || site.title;
  const metaDescription = description || site.description;

  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="UTF-8" />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:site_name" content={site.title} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="generator" content="Yoniu Blog V5.0.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/BuFH5H_rJ.jpg" />
        <link rel="stylesheet" href="/styles/reset.css" />
        <link rel="stylesheet" href="/styles/drake-jb.css" />
        <link rel="stylesheet" href="/styles/unocss.css" />
        <link rel="stylesheet" href="/styles/vars.css" />
      </head>
      <body className="bg-[#f5f5f7] m-0 p-4">
        {children}
        <div className="text-center text-gray-500 bg-black text-white px-4 py-12 mt-8 -ml-4 -mr-4 -mb-4">
          Copyright © 2014 - {new Date().getFullYear()} {site.title}.
        </div>
        <script charSet="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js?id=3NOogOvs3Bj3ldL6&ck=3NOogOvs3Bj3ldL6&autoTrack=true"></script>
      </body>
    </html>
  );
}
