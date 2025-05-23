import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, MapPin, SquareIcon as SquareFootage } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { formatDate } from "@/lib/utils";
import DesignRequestButton from "@/components/design-request-button";
import FloatingContactButtons from "@/components/floating-contact-buttons";

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Function to determine if a URL is external or a placeholder
  const getImageSrc = (url: string | null | undefined) => {
    if (!url) return "/placeholder.svg?height=600&width=800";

    // If it's already a placeholder, return as is
    if (url.startsWith("/placeholder.svg")) return url;

    // Return the actual URL
    return url;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image
              src={getImageSrc(project.imageUrl) || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
              unoptimized={
                !!project.imageUrl &&
                !project.imageUrl.startsWith("/placeholder.svg")
              }
            />
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2 text-[#8bc34a]" />
                {project.location}
              </div>
              <div className="flex items-center text-gray-600">
                <SquareFootage size={18} className="mr-2 text-[#8bc34a]" />
                {project.area.toFixed(1)} ha
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Thông tin dự án</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-gray-500">Chủ đầu tư</span>
                  <span className="font-medium">{project.client}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Vị trí</span>
                  <span className="font-medium">{project.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Diện tích</span>
                  <span className="font-medium">
                    {project.area.toFixed(1)} ha
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <DesignRequestButton projectSlug={project.slug} />
            </div>
          </div>
        </div>
      </div>
      {/* Floating Contact Buttons */}
      <FloatingContactButtons />
    </div>
  );
}
