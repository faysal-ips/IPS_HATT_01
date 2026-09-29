"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Home, Building2, Factory, Landmark, MapPin } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    {
      id: "residential",
      label: "Residential",
      count: "200+ Projects",
      icon: Home,
    },
    {
      id: "commercial",
      label: "Commercial",
      count: "150+ Projects",
      icon: Building2,
    },
    {
      id: "industrial",
      label: "Industrial",
      count: "50+ Projects",
      icon: Factory,
    },
    {
      id: "institutional",
      label: "Institutional",
      count: "100+ Projects",
      icon: Landmark,
    },
  ];

  const projects = [
    {
      id: 1,
      slug: "10kw-rooftop-solar-system-dhaka",
      title: "10Kw Rooftop Solar System 4",
      category: "residential",
      location: "Dhaka",
      image: "/banners/e1.jpg",
    },
    {
      id: 2,
      slug: "20kw-deye-hybrid-inverter-gazipur",
      title: "20kW Deye Hybrid Solar System 3",
      category: "commercial",
      location: "Gazipur",
      image: "/banners/e2.jpg",
    },
    {
      id: 3,
      slug: "longi-750w-industrial-project-chittagong",
      title: "Longi 750W Solar Panel Project 2",
      category: "industrial",
      location: "Chittagong",
      image: "/banners/e3.jpg",
    },
    {
      id: 4,
      slug: "10kw-rooftop-solar-system-sylhet",
      title: "10Kw Rooftop Solar Setup 1",
      category: "institutional",
      location: "Sylhet",
      image: "/banners/e4.jpg",
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section className="py-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
        {/* Header & Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Engineered for{" "}
              <span className="text-[#00a651]">Real Projects</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
              From homes to industries, we deliver reliable solar solutions
              across Bangladesh
            </p>
          </div>

          {/* Category Icons Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setActiveTab(activeTab === cat.id ? "all" : cat.id)
                  }
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left transition-all duration-200 ${
                    isActive
                      ? "border-[#00a651] bg-emerald-50/60 shadow-sm"
                      : "border-slate-100 hover:border-slate-200 bg-slate-50/50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? "bg-[#00a651] text-white"
                        : "bg-emerald-100/70 text-[#00a651]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-slate-800 leading-tight">
                      {cat.label}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      {cat.count}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clickable Projects Carousel */}
        <div className="relative group">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".project-next",
              prevEl: ".project-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="w-full"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#00a651]/50 transition-all duration-300 group/card"
                >
                  {/* Card Image Wrapper */}
                  <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Info */}
                  <div className="p-4 text-center">
                    <div className="inline-flex items-center gap-1 text-slate-400 text-xs font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00a651]" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1 group-hover/card:text-[#00a651] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="project-prev absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 text-slate-700 hover:bg-[#00a651] hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:outline-none">
            ‹
          </button>
          <button className="project-next absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 text-slate-700 hover:bg-[#00a651] hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:outline-none">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
