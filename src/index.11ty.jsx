import React from "react";

import HtmlDocument from './includes/components/HtmlDocument.jsx';
import App from './includes/components/App.jsx';
import PostList from './includes/components/PostList/index.jsx';

export default function Index(data) {

  const { collections } = data;

  const posts = collections.all.filter(item => item.data.cuid).sort((a, b) => new Date(b.data.datePublished) - new Date(a.data.datePublished));

  return (
    <HtmlDocument>
      <App>
        <h1>Hello World</h1>
        <PostList posts={posts} />
      </App>
    </HtmlDocument>
  )
}
