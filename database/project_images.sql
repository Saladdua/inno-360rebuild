-- Create project_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS project_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Add sample images for existing projects
-- For LUMI HANOI (assuming id 1)
INSERT INTO project_images (project_id, image_url, display_order) 
SELECT 1, '/placeholder.svg?height=600&width=800', 0
WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE project_id = 1 AND display_order = 0);

INSERT INTO project_images (project_id, image_url, display_order) 
SELECT 1, '/placeholder.svg?height=600&width=800', 1
WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE project_id = 1 AND display_order = 1);

INSERT INTO project_images (project_id, image_url, display_order) 
SELECT 1, '/placeholder.svg?height=600&width=800', 2
WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE project_id = 1 AND display_order = 2);

-- For DIAMOND CROWN HẢI PHÒNG (assuming id 2)
INSERT INTO project_images (project_id, image_url, display_order) 
SELECT 2, '/placeholder.svg?height=600&width=800', 0
WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE project_id = 2 AND display_order = 0);

INSERT INTO project_images (project_id, image_url, display_order) 
SELECT 2, '/placeholder.svg?height=600&width=800', 1
WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE project_id = 2 AND display_order = 1);

INSERT INTO project_images (project_id, image_url, display_order) 
SELECT 2, '/placeholder.svg?height=600&width=800', 2
WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE project_id = 2 AND display_order = 2);

-- For HERITAGE WEST LAKE (assuming id 3)
INSERT INTO project_images (project_id, image_url, display_order) 
SELECT 3, '/placeholder.svg?height=600&width=800', 0
WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE project_id = 3 AND display_order = 0);

INSERT INTO project_images (project_id, image_url, display_order) 
SELECT 3, '/placeholder.svg?height=600&width=800', 1
WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE project_id = 3 AND display_order = 1);

INSERT INTO project_images (project_id, image_url, display_order) 
SELECT 3, '/placeholder.svg?height=600&width=800', 2
WHERE NOT EXISTS (SELECT 1 FROM project_images WHERE project_id = 3 AND display_order = 2);
