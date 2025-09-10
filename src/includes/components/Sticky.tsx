import React from "react"
import cn from "../utils/cn"
import formatContent from "../utils/formatContent"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'

/**
 * 置顶文章
 * @returns 
 */
export default function Sticky({ post }) {

  dayjs.extend(relativeTime);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-2xl mt-8 mb-6 group/post-item overflow-hidden">
      {/* 左侧 */}
      <div className="relative overflow-hidden aspect-video sm:aspect-[1.5] bg-gray-100">
        <img className="w-full h-full object-cover group-hover/post-item:scale-105 transition-all duration-300" src={post.data.cover} alt={post.data.title} />
      </div>
      {/* 右侧 */}
      <div className="flex flex-col justify-center p-2 sm:p-4 space-y-2 sm:space-y-4">
        <a className="text-gray-900 decoration-none" href={post.url}>
          <h2 className={
            cn(
              "text-2xl font-bold m-0 group-hover/post-item:text-[var(--themecolor)]"
            )
          }>{post.data.title}</h2>
        </a>
        <p className="flex items-center text-gray-500 m-0">{formatContent(post.content)}...</p>
        <time className="text-gray-500" dateTime={post.data.datePublished}>{dayjs(post.data.datePublished).fromNow()}</time>
      </div>
      {/* 置顶图标 */}
      <div className="absolute bottom-4 right-4 text-black/15 group-hover/post-item:text-black/50 transition-all duration-300">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M896 96H128c-17.066667 0-32 14.933333-32 32S110.933333 160 128 160h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM535.466667 296.533333c-12.8-12.8-32-12.8-44.8 0l-213.333334 213.333334c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0l157.866667-157.866667V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V396.8l157.866667 157.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8l-213.333333-213.333334z"></path></svg>
      </div>
      {/* 覆盖链接 */}
      <a className="absolute inset-0 z-10" href={post.url}></a>
    </div>
  )
}

