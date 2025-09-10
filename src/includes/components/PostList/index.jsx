import React from "react";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import formatContent from '../../utils/formatContent';
import cn from '../../utils/cn';

export default function PostList({ posts }) {

  dayjs.extend(relativeTime);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {
        posts.map((item) => (
          <div className="relative text-gray-900 bg-white rounded-3xl flex flex-col group/post-item overflow-hidden" id={item.data.cuid} key={item.data.cuid}>
            {
              item.data.cover && (
                <div className="relative overflow-hidden aspect-video bg-gray-100">
                  <img className="w-full object-cover group-hover/post-item:scale-105 transition-all duration-300" src={item.data.cover} alt={item.data.title} />
                </div>
              )
            }
            <div className={
              cn(
                "p-6 flex flex-col gap-2",
                item.data.cover ? "" : "h-full"
              )
            }>
              {
                (item.data.cover && item.data.tags) && (
                  <p className="text-gray-600">{
                    item.data.tags.join(', ')
                  }</p>
                )
              }
              <a className="text-gray-900 decoration-none" href={item.url}>
                <h2 className={
                  cn(
                    "text-xl font-bold m-0",
                    item.data.cover ? "overflow-hidden text-ellipsis whitespace-nowrap" : "text-2xl!"
                  )
                }>{item.data.title}</h2>
              </a>
              {
                !item.data.cover && (
                  <p className="flex-1 text-gray-600 m-0 my-4 text-xl">{formatContent(item.content)}...</p>
                )
              }
              <time className="text-gray-500 space-x-1" dateTime={item.data.datePublished}>
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M469.333333 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 469.333333 85.333333z m0 768a341.333333 341.333333 0 1 1 341.333334-341.333333 341.333333 341.333333 0 0 1-341.333334 341.333333z m132.266667-314.453333L512 487.253333V298.666667a42.666667 42.666667 0 0 0-85.333333 0v218.453333a27.733333 27.733333 0 0 0 2.133333 8.533333 37.973333 37.973333 0 0 0 3.413333 7.253334 36.693333 36.693333 0 0 0 4.266667 6.826666l6.826667 5.546667 3.84 3.84 110.933333 64a42.666667 42.666667 0 0 0 21.333333 5.546667 42.666667 42.666667 0 0 0 21.333334-79.786667z"></path></svg>
                <span>{dayjs(item.data.datePublished).fromNow()}</span>
              </time>
            </div>
            <a className="absolute inset-0 z-10" href={item.url}></a>
          </div>
        ))
      }
    </div>
  )
}
