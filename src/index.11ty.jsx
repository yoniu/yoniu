import React from "react";

import HtmlDocument from './includes/components/HtmlDocument.jsx';
import App from './includes/components/App.jsx';
import PostList from './includes/components/PostList/index.jsx';
import Header from './includes/components/Header.jsx';

export default function Index(data) {

  const { collections } = data;

  const posts = collections.all.filter(item => item.data.cuid).sort((a, b) => new Date(b.data.datePublished) - new Date(a.data.datePublished));

  return (
    <HtmlDocument>
      <App>
        <Header />
        <PostList posts={posts} />
      </App>
    </HtmlDocument>
  )
}
