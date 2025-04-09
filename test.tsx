"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types/project";
import ProjectLogo from "@/components/project-logo";

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
  const [activeImageIndex, setActiveImageIndex] = useState<
    Record<number, number>
  >({});
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sort projects by ID
  const sortedProjects = [...projects].sort((a, b) => a.id - b.id);

  useEffect(() => {
    setTotalPages(Math.ceil(sortedProjects.length / itemsPerPage));

    // Initialize active image index for each project
    const initialActiveIndices: Record<number, number> = {};
    sortedProjects.forEach((project) => {
      initialActiveIndices[project.id] = 0;
    });
    setActiveImageIndex(initialActiveIndices);
  }, [sortedProjects, itemsPerPage]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Function to determine if a URL is external or a placeholder
  const getImageSrc = (url: string | null | undefined) => {
    if (!url) return "/placeholder.svg?height=600&width=800";

    // If it's already a placeholder, return as is
    if (url.startsWith("/placeholder.svg")) return url;

    // Return the actual URL
    return url;
  };

  const changeProjectImage = (projectId: number, index: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [projectId]: index,
    }));
  };

  // For demo purposes, let's assume each project has 3 images
  const getProjectImages = (project: Project) => {
    if (project.images && project.images.length > 0) {
      return project.images;
    }
    // If no images array, create a dummy array with the main image repeated
    return [project.imageUrl, project.imageUrl, project.imageUrl];
  };

  return (
    <div className="overflow-hidden relative" ref={carouselRef}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentPage * 100) / totalPages}%)`,
          width: `${totalPages * 100}%`,
        }}
      >
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full flex-shrink-0 px-4"
            style={{ width: `${100 / totalPages}%` }}
          >
            {sortedProjects
              .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
              .map((project) => {
                const projectId = project.id;
                const currentImageIndex = activeImageIndex[projectId] || 0;
                const projectImages = getProjectImages(project);

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <ProjectLogo
                        title={project.title}
                        logoUrl={project.logoUrl}
                      />
                      <h3 className="text-[#8bc34a] font-medium text-lg">
                        {project.title}
                      </h3>
                    </div>

                    <div className="relative h-64 w-full">
                      <Image
                        src={
                          getImageSrc(projectImages[currentImageIndex]) ||
                          "/placeholder.svg"
                        }
                        alt={project.title}
                        fill
                        className="object-cover"
                        unoptimized={
                          !projectImages[currentImageIndex]?.startsWith(
                            "/placeholder.svg"
                          )
                        }
                      />
                    </div>

                    <div className="flex justify-center mt-3 mb-3">
                      {projectImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => changeProjectImage(projectId, index)}
                          className={`w-2 h-2 mx-1 rounded-full ${
                            currentImageIndex === index
                              ? "bg-[#8bc34a]"
                              : "bg-gray-300"
                          }`}
                          aria-label={`View image ${index + 1} of project ${
                            project.title
                          }`}
                        />
                      ))}
                    </div>

                    <div className="p-4">
                      <Link
                        href={`/du-an/${project.slug}`}
                        className="block w-full py-3 text-center text-white font-medium bg-[#8bc34a] hover:bg-[#7cb342] rounded-md transition-colors"
                      >
                        NHẬN THIẾT KẾ
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {totalPages > 1 && (
        <>
          <button
            onClick={prevPage}
            className="absolute left-10 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
            aria-label="Previous page"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextPage}
            className="absolute right-10 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
            aria-label="Next page"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

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
