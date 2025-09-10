import site from '../config/site';
import React from "react";


export default function HtmlDocument({ children, title = site.title, description = site.description }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="generator" content="Yoniu Blog V5.0.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/BuFH5H_rJ.jpg" />
        <link rel="stylesheet" href="/styles/reset.css" />
        <link rel="stylesheet" href="/styles/drake-jb.css" />
        <link rel="stylesheet" href="/styles/unocss.css" />
      </head>
      <body className="bg-[#f5f5f7] m-0 p-4">
        {children}
      </body>
    </html>
  );
}