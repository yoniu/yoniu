import React from "react";

import HtmlDocument from '../components/HtmlDocument.jsx';

export default function MainLayout(data) {

  const { content, title } = data;

  return (
    <HtmlDocument title={title}>
      <div className="w-full max-w-5xl mx-auto">
        <h1>{ title }</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </HtmlDocument>
  )
}
