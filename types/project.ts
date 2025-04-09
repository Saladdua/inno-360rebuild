export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  images?: string[]; // Array of image URLs for the project
  logoUrl?: string; // URL for the project logo
  location: string;
  area: number;
  client: string;
  completionDate: string;
  createdAt: string;
  updatedAt: string;
}
