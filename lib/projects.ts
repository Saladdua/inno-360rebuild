import { executeQuery } from "@/lib/db"
import type { Project } from "@/types/project"

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await executeQuery<Project[]>({
      query: "SELECT * FROM projects ORDER BY createdAt DESC",
    })
    return projects
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await executeQuery<Project[]>({
      query: "SELECT * FROM projects WHERE slug = ?",
      values: [slug],
    })
    return projects.length > 0 ? projects[0] : null
  } catch (error) {
    console.error("Error fetching project by slug:", error)
    return null
  }
}

export async function getProjectsPaginated(
  page: number,
  limit: number,
): Promise<{ projects: Project[]; total: number }> {
  try {
    const offset = (page - 1) * limit

    const projects = await executeQuery<Project[]>({
      query: "SELECT * FROM projects ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      values: [limit, offset],
    })

    const totalResult = await executeQuery<[{ total: number }]>({
      query: "SELECT COUNT(*) as total FROM projects",
    })

    const total = totalResult[0].total

    return { projects, total }
  } catch (error) {
    console.error("Error fetching paginated projects:", error)
    return { projects: [], total: 0 }
  }
}

