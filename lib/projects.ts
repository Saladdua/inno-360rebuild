import { executeQuery } from "@/lib/db";
import type { Project } from "@/types/project";

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await executeQuery<Project[]>({
      query:
        "SELECT id, title, slug, description, image_url as imageUrl, logo_url as logoUrl, location, area, client, completion_date as completionDate, created_at as createdAt, updated_at as updatedAt FROM projects ORDER BY created_at DESC",
    });

    // For each project, try to fetch additional images
    for (const project of projects) {
      try {
        const projectImages = await executeQuery<{ image_url: string }[]>({
          query:
            "SELECT image_url FROM project_images WHERE project_id = ? ORDER BY display_order ASC",
          values: [project.id],
        });

        if (projectImages && projectImages.length > 0) {
          project.images = projectImages.map((img) => img.image_url);
        } else {
          // If no additional images, use the main image
          project.images = [project.imageUrl];
        }
      } catch (error) {
        console.error(
          `Error fetching images for project ${project.id}:`,
          error
        );
        project.images = [project.imageUrl];
      }
    }

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await executeQuery<Project[]>({
      query:
        "SELECT id, title, slug, description, image_url as imageUrl, logo_url as logoUrl, location, area, client, completion_date as completionDate, created_at as createdAt, updated_at as updatedAt FROM projects WHERE slug = ?",
      values: [slug],
    });

    if (projects.length === 0) return null;

    const project = projects[0];

    // Fetch additional images for the project
    try {
      const projectImages = await executeQuery<{ image_url: string }[]>({
        query:
          "SELECT image_url FROM project_images WHERE project_id = ? ORDER BY display_order ASC",
        values: [project.id],
      });

      if (projectImages && projectImages.length > 0) {
        project.images = projectImages.map((img) => img.image_url);
      } else {
        // If no additional images, use the main image
        project.images = [project.imageUrl];
      }
    } catch (error) {
      console.error(`Error fetching images for project ${project.id}:`, error);
      project.images = [project.imageUrl];
    }

    return project;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

export async function getProjectsPaginated(
  page: number,
  limit: number
): Promise<{ projects: Project[]; total: number }> {
  try {
    const offset = (page - 1) * limit;

    const projects = await executeQuery<Project[]>({
      query:
        "SELECT id, title, slug, description, image_url as imageUrl, logo_url as logoUrl, location, area, client, completion_date as completionDate, created_at as createdAt, updated_at as updatedAt FROM projects ORDER BY created_at DESC LIMIT ? OFFSET ?",
      values: [limit, offset],
    });

    // For each project, try to fetch additional images
    for (const project of projects) {
      try {
        const projectImages = await executeQuery<{ image_url: string }[]>({
          query:
            "SELECT image_url FROM project_images WHERE project_id = ? ORDER BY display_order ASC",
          values: [project.id],
        });

        if (projectImages && projectImages.length > 0) {
          project.images = projectImages.map((img) => img.image_url);
        } else {
          // If no additional images, use the main image
          project.images = [project.imageUrl];
        }
      } catch (error) {
        console.error(
          `Error fetching images for project ${project.id}:`,
          error
        );
        project.images = [project.imageUrl];
      }
    }

    const totalResult = await executeQuery<[{ total: number }]>({
      query: "SELECT COUNT(*) as total FROM projects",
    });

    const total = totalResult[0].total;

    return { projects, total };
  } catch (error) {
    console.error("Error fetching paginated projects:", error);
    return { projects: [], total: 0 };
  }
}
