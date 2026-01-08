import React from "react";
import site from "../config/site";
import nav from "../config/nav";
import RainbowButton from "./common/RainbowButton";

const normalizePath = (path) => {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
};

const isExternalLink = (href) => /^https?:\/\//i.test(href);

export default function Header({ currentPath = "/" }) {
  const normalizedCurrentPath = normalizePath(currentPath);

  return (
    <header className="flex items-center gap-4 text-size-lg mb-4">
      <h1 className="text-size-xl m-0" title={site.title}>
        <a href="/">{ site.title }</a>
      </h1>
      <h2 className="text-size-lg text-gray-500 font-thin m-0 hidden md:block">{ site.description }</h2>
      <nav className="flex-1 flex items-center justify-end gap-4 w-full">
        {
          nav.map((item) => {
            const external = isExternalLink(item.href);
            const normalizedHref = external ? item.href : normalizePath(item.href);
            const isActive = !external && (normalizedCurrentPath === normalizedHref || (normalizedHref !== "/" && normalizedCurrentPath.startsWith(normalizedHref)));

            return (
              <a
                className={`group relative inline-flex flex-col items-center gap-1 text-gray-500 decoration-none hover:text-gray-900 transition-colors ${isActive ? "text-gray-900 font-semibold" : ""}`}
                href={item.href}
                key={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{item.label}</span>
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                  style={{ backgroundColor: "var(--themecolor)" }}
                />
              </a>
            );
          })
        }
        <RainbowButton href="https://demo.200011.net">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="fill-current w-4 h-4">
            <g>
              <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
            </g>
          </svg>
          DEMO
        </RainbowButton>
      </nav>
    </header>
  )
}
