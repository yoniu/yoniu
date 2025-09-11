import React from "react";

import HtmlDocument from '../components/HtmlDocument.jsx';
import Header from '../components/Header.jsx';
import dayjs from "dayjs";
import Cover from '../components/Cover.jsx';
import formatContent from '../utils/formatContent.js';

export default function ArticleLayout(data) {

  const { content, title, datePublished, cover } = data;
  const time = dayjs(datePublished).format("YYYY-MM-DD HH:mm:ss");

  const description = formatContent(content);

  return (
    <HtmlDocument title={title} description={description}>
      <div className="w-full max-w-5xl mx-auto space-y-4">
        <Header />
        <div className="border-gray-200 border-b-1 border-b-solid"></div>
        {
          cover && (
            <Cover image={cover} />
          )
        }
        <h1 className="text-3xl font-bold mb-2!">{ title }</h1>
        <time className="text-gray-500 text-sm">{ time }</time>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="border-gray-200 border-b-1 border-b-solid"></div>
        <h2 className="text-2xl font-bold my-4!">评论</h2>
        <div id="tcomment"></div>
      </div>
      <script src="/js/twikoo.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
      <script src="/js/main.js"></script>
    </HtmlDocument>
  )
}
