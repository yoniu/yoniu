import React from "react";
import site from "../config/site";
import nav from "../config/nav";

export default function Header() {

  return (
    <header className="flex items-center gap-4 text-size-lg mb-4">
      <h1 className="text-size-lg m-0" title={site.title}>
        <a href="/">{ site.title }</a>
      </h1>
      <h2 className="text-size-lg text-gray-500 font-thin m-0 hidden md:block">{ site.description }</h2>
      <nav className="flex-1 flex items-center justify-end gap-4 w-full">
        {
          nav.map((item) => (
            <a className="text-gray-500 decoration-none hover:text-gray-900" href={item.href} key={item.href}>{item.label}</a>
          ))
        }
      </nav>
    </header>
  )
}