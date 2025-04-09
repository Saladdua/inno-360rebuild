"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types/project";
import ProjectLogo from "./project-logo";

interface ProjectCarouselProps {
  projects: Project[];
  itemsPerPage?: number;
  autoplayInterval?: number;
}

export default function ProjectCarousel({
  projects,
  itemsPerPage = 3,
  autoplayInterval = 3000,
}: ProjectCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isHovering, setIsHovering] = useState<Record<number, boolean>>({});
  const autoplayTimersRef = useRef<Record<number, NodeJS.Timeout>>({});
  const [activeImageIndices, setActiveImageIndices] = useState<
    Record<number, number>
  >({});
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sort projects by ID
  const sortedProjects = [...projects].sort((a, b) => a.id - b.id);

  // Set up total pages once when component mounts or when projects/itemsPerPage changes
  useEffect(() => {
    setTotalPages(Math.ceil(sortedProjects.length / itemsPerPage));

    // Initialize active image indices for each project only once
    const initialIndices: Record<number, number> = {};
    const initialHoverStates: Record<number, boolean> = {};
    sortedProjects.forEach((project) => {
      initialIndices[project.id] = 0;
      initialHoverStates[project.id] = false;
    });
    setActiveImageIndices(initialIndices);
    setIsHovering(initialHoverStates);

    // Clean up any existing timers when component unmounts or dependencies change
    return () => {
      Object.values(autoplayTimersRef.current).forEach((timer) =>
        clearInterval(timer)
      );
    };
  }, [sortedProjects.length, itemsPerPage]); // Only depend on length, not the entire array

  // Set up autoplay for each project
  useEffect(() => {
    // Clear any existing timers first
    Object.values(autoplayTimersRef.current).forEach((timer) =>
      clearInterval(timer)
    );

    // Create new timers for each project
    sortedProjects.forEach((project) => {
      if (!isHovering[project.id]) {
        startAutoplayForProject(project.id);
      }
    });

    return () => {
      // Clean up timers on unmount
      Object.values(autoplayTimersRef.current).forEach((timer) =>
        clearInterval(timer)
      );
    };
  }, [activeImageIndices, isHovering, sortedProjects]);

  const startAutoplayForProject = useCallback(
    (projectId: number) => {
      // Clear existing timer if any
      if (autoplayTimersRef.current[projectId]) {
        clearInterval(autoplayTimersRef.current[projectId]);
      }

      // Create new timer
      autoplayTimersRef.current[projectId] = setInterval(() => {
        if (!isHovering[projectId]) {
          setActiveImageIndices((prev) => {
            const currentIndex = prev[projectId] || 0;
            const nextIndex = (currentIndex + 1) % 3; // Assuming 3 images per project
            return { ...prev, [projectId]: nextIndex };
          });
        }
      }, autoplayInterval);
    },
    [autoplayInterval, isHovering]
  );

  const pauseAutoplayForProject = useCallback((projectId: number) => {
    setIsHovering((prev) => ({ ...prev, [projectId]: true }));

    if (autoplayTimersRef.current[projectId]) {
      clearInterval(autoplayTimersRef.current[projectId]);
    }
  }, []);

  const resumeAutoplayForProject = useCallback(
    (projectId: number) => {
      setIsHovering((prev) => ({ ...prev, [projectId]: false }));
      startAutoplayForProject(projectId);
    },
    [startAutoplayForProject]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Function to determine if a URL is external or a placeholder
  const getImageSrc = (url: string | null | undefined) => {
    if (!url) return "/placeholder.svg?height=600&width=800";
    if (url.startsWith("/placeholder.svg")) return url;
    return url;
  };

  // Function to change the active image for a project
  const changeProjectImage = useCallback(
    (projectId: number, index: number) => {
      setActiveImageIndices((prev) => ({
        ...prev,
        [projectId]: index,
      }));

      // Reset the autoplay timer when manually changing images
      pauseAutoplayForProject(projectId);
      setTimeout(() => resumeAutoplayForProject(projectId), 10000); // Resume after 10 seconds of inactivity
    },
    [pauseAutoplayForProject, resumeAutoplayForProject]
  );

  // For demo purposes, let's assume each project has 3 images
  const getProjectImages = useCallback((project: Project) => {
    if (project.images && project.images.length > 0) {
      return project.images;
    }
    // If no images array, create a dummy array with the main image repeated
    return [project.imageUrl, project.imageUrl, project.imageUrl];
  }, []);

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
                const currentImageIndex = activeImageIndices[projectId] || 0;
                const projectImages = getProjectImages(project);

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    onMouseEnter={() => pauseAutoplayForProject(projectId)}
                    onMouseLeave={() => resumeAutoplayForProject(projectId)}
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

                    <div className="relative h-64 w-full overflow-hidden">
                      {projectImages.slice(0, 3).map((image, index) => (
                        <div
                          key={index}
                          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
                          style={{
                            opacity: currentImageIndex === index ? 1 : 0,
                            zIndex: currentImageIndex === index ? 1 : 0,
                          }}
                        >
                          <Image
                            src={getImageSrc(image) || "/placeholder.svg"}
                            alt={`${project.title} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            unoptimized={!image?.startsWith("/placeholder.svg")}
                            priority={index === 0}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center mt-3 mb-3">
                      {projectImages.slice(0, 3).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => changeProjectImage(projectId, index)}
                          className={`w-2 h-2 mx-1 rounded-full transition-colors duration-300 ${
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
