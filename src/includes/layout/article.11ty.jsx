import React from "react";

import HtmlDocument from '../components/HtmlDocument.jsx';
import Header from '../components/Header.jsx';
import dayjs from "dayjs";
import Cover from '../components/Cover.jsx';

export default function ArticleLayout(data) {

  const { content, title, datePublished, cover } = data;
  const time = dayjs(datePublished).format("YYYY-MM-DD HH:mm:ss");

  return (
    <HtmlDocument title={title}>
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <div className="border-gray-200 border-b-1 border-b-solid mb-4"></div>
        {
          cover && (
            <Cover image={cover} />
          )
        }
        <h1 className="text-3xl font-bold mb-4">{ title }</h1>
        <time className="text-gray-500 text-sm mb-4">{ time }</time>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </HtmlDocument>
  )
}
