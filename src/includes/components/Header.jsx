import React from "react";
import site from "../config/site";
import nav from "../config/nav";

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
      </nav>
    </header>
  )
}
