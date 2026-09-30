"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, productName }) {
  const [selectedImg, setSelectedImg] = useState(
    images[0]?.src || "/placeholder.svg"
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Main Big Image Box */}
      <div className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
        <Image
          src={selectedImg}
          alt={productName || "Product Image"}
          fill
          unoptimized
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(img.src)}
              className={`relative w-20 h-20 bg-white rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                selectedImg === img.src
                  ? "border-[#00a651] shadow-md scale-95"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image
                src={img.src}
                alt={`Thumbnail ${idx}`}
                fill
                unoptimized
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
