"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectCarouselProps {
  projects: Project[];
  itemsPerPage?: number;
}

export default function ProjectCarousel({
  projects,
  itemsPerPage = 3,
}: ProjectCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(projects.length / itemsPerPage));
  }, [projects, itemsPerPage]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const visibleProjects = projects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="relative h-64 w-full">
              <Image
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-xl">
                  {project.title}
                </h3>
              </div>
            </div>
            <div className="p-4 text-center">
              <Link
                href={`/du-an/${project.slug}`}
                className="btn-primary inline-block"
              >
                NHẬN THIẾT KẾ
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevPage}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
        aria-label="Previous page"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextPage}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
        aria-label="Next page"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots indicator */}
      <div className="carousel-dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`carousel-dot ${currentPage === index ? "active" : ""}`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
