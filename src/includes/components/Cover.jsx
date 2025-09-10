import React from "react";

export default function Cover({ image }) {

  return (
    <div>
      <div className="relative aspect-video sm:aspect-3 bg-gray-100 group/cover mb-4">
        <img className="absolute inset-0 rounded-xl w-full h-full object-cover group-hover/cover:blur z-0 transition-all duration-300" src={image} alt="cover" />
        <img className="relative rounded-xl w-full h-full object-cover z-10" src={image} alt="cover" />
      </div>
    </div>
  )
}
