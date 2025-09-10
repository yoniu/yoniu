import React from "react"
import cn from "../utils/cn"
import formatContent from "../utils/formatContent"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'

export default function Sticky({ post }) {

  dayjs.extend(relativeTime);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-2xl mt-8 mb-6 group/post-item hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden aspect-video sm:aspect-[1.5] bg-gray-100">
        <img className="w-full h-full object-cover group-hover/post-item:scale-105 transition-all duration-300" src={post.data.cover} alt={post.data.title} />
      </div>
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
      <a className="absolute inset-0 z-10" href={post.url}></a>
    </div>
  )
}

