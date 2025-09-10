import React from "react";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import formatContent from '../../utils/formatContent';
import cn from '../../utils/cn';

export default function PostList({ posts }) {

  dayjs.extend(relativeTime);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        posts.map((item) => (
          <div className="relative text-gray-900 bg-white p-4 rounded-lg flex flex-col gap-2 group/post-item" id={item.data.cuid} key={item.data.cuid}>
            {
              item.data.cover && (
                <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-100">
                  <img className="w-full object-cover group-hover/post-item:scale-105 transition-all duration-300" src={item.data.cover} alt={item.data.title} />
                </div>
              )
            }
            <a className="text-gray-900 decoration-none" href={item.url}>
              <h2 className={
                cn(
                  "text-lg font-bold m-0",
                  item.data.cover ? "overflow-hidden text-ellipsis whitespace-nowrap" : ""
                )
              }>{item.data.title}</h2>
            </a>
            {
              !item.data.cover && (
                <p className="flex-1 flex items-center text-gray-700 m-0">{formatContent(item.content)}...</p>
              )
            }
            <time className="text-gray-500" dateTime={item.data.datePublished}>{dayjs(item.data.datePublished).fromNow()}</time>
            <a className="absolute inset-0 z-10" href={item.url}></a>
          </div>
        ))
      }
    </div>
  )
}
