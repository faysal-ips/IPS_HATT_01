"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// Swiper styles import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {
  // Apnar 3-ti banner image path ba URL ekhane bose din
  const slides = [
    { id: 1, image: "/banners/b1.jpg", alt: "IPS Banner 1" },
    { id: 2, image: "/banners/b2.jpg", alt: "IPS Banner 2" },
    { id: 3, image: "/banners/b3.jpg", alt: "IPS Banner 3" },
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 py-3 md:py-4">
      <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-md bg-slate-900 group">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet">0${
                index + 1
              } —</span>`;
            },
          }}
          className="w-full h-auto"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Image
                src={slide.image}
                alt={slide.alt}
                width={1920}
                height={640} // tomar banner er asol size dao
                priority={slide.id === 1}
                sizes="100vw"
                className="w-full h-auto block"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#00a651] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:outline-none">
          ‹
        </button>
        <button className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#00a651] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:outline-none">
          ›
        </button>
      </div>

      {/* Pagination Custom CSS Styles */}
      <style jsx global>{`
        .custom-bullet {
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.6;
          color: white;
        }
        .custom-bullet.swiper-pagination-bullet-active {
          opacity: 1;
          color: #00a651;
          font-weight: 800;
        }
      `}</style>
    </section>
  );
}
