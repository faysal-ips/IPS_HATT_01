"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// Swiper styles import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PromoBanner() {
  // Apnar promo banner image path / URL ekhane bose din
  const promoSlides = [
    { id: 1, image: "/banners/promo1.jpg", alt: "Promo Banner 1" },
    { id: 2, image: "/banners/promo2.jpg", alt: "Promo Banner 2" },
  ];

  return (
    <section className="py-4">
      <div className="relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 group">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".promo-button-next",
            prevEl: ".promo-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".promo-pagination",
          }}
          className="w-full"
        >
          {promoSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full aspect-[21/6] sm:aspect-[24/6] md:aspect-[19/5]">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-fill w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="promo-button-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#00a651] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:outline-none">
          ‹
        </button>
        <button className="promo-button-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#00a651] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:outline-none">
          ›
        </button>

        {/* Custom Pagination Dots */}
        <div className="promo-pagination absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-2" />
      </div>

      <style jsx global>{`
        .promo-pagination .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.5;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .promo-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background: #00a651;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
