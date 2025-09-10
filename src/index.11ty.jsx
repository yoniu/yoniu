import React from "react";

import HtmlDocument from './includes/components/HtmlDocument.jsx';
import App from './includes/components/App.jsx';
import PostList from './includes/components/PostList/index.jsx';
import Header from './includes/components/Header.jsx';
import Sticky from "./includes/components/Sticky.jsx";

export default function Index(data) {

  const { collections } = data;

  const stickyPost = collections.sticky[0]

  const posts = collections.all
    .filter(item => item.data.cuid) // 过滤非文章
    .filter(item => !((item.data.tags || []).includes('sticky')))
    .sort((a, b) => new Date(b.data.datePublished) - new Date(a.data.datePublished)); // 排序

  return (
    <HtmlDocument>
      <App>
        <Header />
        {stickyPost && <Sticky post={stickyPost} />}
        <PostList posts={posts} />
      </App>
    </HtmlDocument>
  )
}
