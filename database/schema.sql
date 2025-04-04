-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create password_reset_tokens table
CREATE TABLE password_reset_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create projects table
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  area FLOAT NOT NULL,
  client VARCHAR(255) NOT NULL,
  completion_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create news table
CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create contacts table
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample projects
INSERT INTO projects (title, slug, description, image_url, location, area, client, completion_date) VALUES
('LUMI HANOI', 'lumi-hanoi', 'LUMI HANOI là dự án căn hộ cao cấp tại trung tâm Hà Nội, mang đến không gian sống hiện đại và tiện nghi. Dự án được thiết kế bởi đội ngũ kiến trúc sư hàng đầu, với các tiện ích đẳng cấp và view panorama tuyệt đẹp của thành phố.', '/placeholder.svg?height=600&width=800', 'Hà Nội', 120.5, 'LUMI Group', '2023-06-15'),
('DIAMOND CROWN HẢI PHÒNG - DOJILAND', 'diamond-crown-hai-phong', 'DIAMOND CROWN HẢI PHÒNG là tổ hợp căn hộ và trung tâm thương mại cao cấp tại Hải Phòng. Dự án nổi bật với thiết kế hiện đại, sang trọng và đẳng cấp, mang đến không gian sống lý tưởng cho cư dân.', '/placeholder.svg?height=600&width=800', 'Hải Phòng', 150.0, 'DOJILAND', '2023-09-20'),
('HERITAGE WEST LAKE', 'heritage-west-lake', 'HERITAGE WEST LAKE là dự án căn hộ hạng sang bên Hồ Tây, Hà Nội. Dự án sở hữu vị trí đắc địa với tầm nhìn panorama ra Hồ Tây, thiết kế tinh tế và đẳng cấp, mang đến không gian sống sang trọng và yên bình.', '/placeholder.svg?height=600&width=800', 'Hà Nội', 200.0, 'Heritage Group', '2023-12-10'),
('SUNSHINE CITY', 'sunshine-city', 'SUNSHINE CITY là khu đô thị phức hợp hiện đại với hệ thống căn hộ thông minh, tiện ích đẳng cấp và không gian sống xanh. Dự án áp dụng công nghệ 4.0 vào quản lý và vận hành, mang đến trải nghiệm sống tiện nghi và an toàn.', '/placeholder.svg?height=600&width=800', 'Hà Nội', 180.0, 'Sunshine Group', '2023-10-05'),
('VINHOMES OCEAN PARK', 'vinhomes-ocean-park', 'VINHOMES OCEAN PARK là đại đô thị biển hồ với hệ sinh thái tiện ích đa dạng, không gian sống xanh và hiện đại. Dự án nổi bật với biển hồ nước mặn và hồ bơi trung tâm rộng lớn, mang đến không gian nghỉ dưỡng ngay trong lòng thành phố.', '/placeholder.svg?height=600&width=800', 'Hà Nội', 160.0, 'Vingroup', '2023-08-15'),
('THE MANOR CENTRAL PARK', 'the-manor-central-park', 'THE MANOR CENTRAL PARK là khu đô thị cao cấp với thiết kế châu Âu hiện đại, không gian sống xanh và tiện ích đẳng cấp. Dự án sở hữu vị trí đắc địa, kết nối thuận tiện với trung tâm thành phố và các khu vực lân cận.', '/placeholder.svg?height=600&width=800', 'Hà Nội', 190.0, 'Bitexco Group', '2023-11-20');

-- Insert sample news
INSERT INTO news (title, slug, content, excerpt, image_url, author) VALUES
('Xu hướng thiết kế nội thất năm 2024', 'xu-huong-thiet-ke-noi-that-nam-2024', 
'<p>Năm 2024 chứng kiến sự trở lại của các xu hướng thiết kế nội thất mang đậm tính bền vững và gần gũi với thiên nhiên. Các vật liệu tự nhiên như gỗ, đá, mây tre đan được ưa chuộng hơn bao giờ hết.</p><p>Màu sắc trung tính kết hợp với các điểm nhấn màu đất tạo nên không gian ấm cúng và thân thiện. Đồ nội thất đa chức năng, thông minh cũng là một xu hướng nổi bật, đáp ứng nhu cầu của không gian sống hiện đại.</p><p>Phong cách tối giản (minimalism) tiếp tục được ưa chuộng, nhưng có sự pha trộn với các yếu tố vintage tạo nên sự cân bằng hoàn hảo giữa hiện đại và hoài cổ.</p>', 
'Năm 2024 chứng kiến sự trở lại của các xu hướng thiết kế nội thất mang đậm tính bền vững và gần gũi với thiên nhiên.', 
'/placeholder.svg?height=400&width=600', 'Nguyễn Văn A'),

('Cách tối ưu không gian sống cho căn hộ nhỏ', 'cach-toi-uu-khong-gian-song-cho-can-ho-nho', 
'<p>Với xu hướng đô thị hóa ngày càng cao, nhiều người lựa chọn sinh sống trong các căn hộ có diện tích nhỏ. Việc tối ưu hóa không gian sống trở thành một thách thức nhưng cũng là cơ hội để thể hiện sự sáng tạo trong thiết kế.</p><p>Sử dụng nội thất đa năng, thông minh như giường gấp, bàn xếp, tủ kéo là giải pháp hiệu quả. Màu sắc sáng, gương và ánh sáng tự nhiên giúp tạo cảm giác rộng rãi hơn cho không gian.</p><p>Việc sắp xếp hợp lý, tận dụng không gian theo chiều dọc và lưu trữ thông minh cũng là những yếu tố quan trọng giúp căn hộ nhỏ trở nên thoáng đãng và tiện nghi hơn.</p>', 
'Với xu hướng đô thị hóa ngày càng cao, nhiều người lựa chọn sinh sống trong các căn hộ có diện tích nhỏ.', 
'/placeholder.svg?height=400&width=600', 'Trần Thị B'),

('Vật liệu bền vững trong thiết kế nội thất hiện đại', 'vat-lieu-ben-vung-trong-thiet-ke-noi-that-hien-dai', 
'<p>Trong bối cảnh biến đổi khí hậu và ô nhiễm môi trường ngày càng nghiêm trọng, việc sử dụng các vật liệu bền vững trong thiết kế nội thất không chỉ là xu hướng mà còn là trách nhiệm với môi trường.</p><p>Các vật liệu tái chế, thân thiện với môi trường như gỗ tái sinh, tre, vải organic, đá tự nhiên đang được ưa chuộng. Những vật liệu này không chỉ đảm bảo tính thẩm mỹ mà còn góp phần giảm thiểu tác động tiêu cực đến môi trường.</p><p>Bên cạnh đó, các công nghệ sản xuất tiên tiến giúp tạo ra các vật liệu mới có tính năng vượt trội như khả năng kháng khuẩn, chống bám bẩn, tiết kiệm năng lượng, đồng thời vẫn đảm bảo tính thân thiện với môi trường.</p>', 
'Trong bối cảnh biến đổi khí hậu và ô nhiễm môi trường ngày càng nghiêm trọng.', 
'/placeholder.svg?height=400&width=600', 'Lê Văn C'),

('Phong cách Japandi - Sự kết hợp hoàn hảo giữa Nhật Bản và Bắc Âu', 'phong-cach-japandi-su-ket-hop-hoan-hao-giua-nhat-ban-va-bac-au', 
'<p>Phong cách Japandi là sự kết hợp tinh tế giữa thiết kế tối giản của Nhật Bản và phong cách Scandinavian của Bắc Âu. Cả hai đều đề cao sự đơn giản, chức năng và kết nối với thiên nhiên.</p><p>Đặc trưng của phong cách này là sự hài hòa giữa màu sắc trung tính, vật liệu tự nhiên và không gian thoáng đãng. Nội thất thường có đường nét đơn giản, tinh tế nhưng vẫn đảm bảo tính thẩm mỹ và công năng.</p><p>Phong cách Japandi tạo nên không gian sống ấm cúng, yên bình nhưng vẫn hiện đại và tinh tế. Đây là lựa chọn lý tưởng cho những ai yêu thích sự tối giản nhưng không muốn không gian sống trở nên lạnh lẽo, vô hồn.</p>', 
'Phong cách Japandi là sự kết hợp tinh tế giữa thiết kế tối giản của Nhật Bản và phong cách Scandinavian của Bắc Âu.', 
'/placeholder.svg?height=400&width=600', 'Phạm Thị D'),

('Cách chọn màu sắc phù hợp cho không gian sống', 'cach-chon-mau-sac-phu-hop-cho-khong-gian-song', 
'<p>Màu sắc có ảnh hưởng lớn đến cảm xúc và tâm trạng của con người. Việc lựa chọn màu sắc phù hợp cho không gian sống không chỉ tạo nên tính thẩm mỹ mà còn góp phần cải thiện chất lượng cuộc sống.</p><p>Các màu trung tính như trắng, be, xám thích hợp cho không gian chung vì tạo cảm giác rộng rãi và dễ kết hợp. Màu xanh lá, xanh dương mang lại cảm giác thư giãn, phù hợp cho phòng ngủ. Màu vàng, cam tạo năng lượng tích cực, thích hợp cho phòng làm việc hoặc phòng ăn.</p><p>Nguyên tắc 60-30-10 (60% màu chủ đạo, 30% màu phụ, 10% màu nhấn) giúp tạo nên sự cân bằng và hài hòa trong không gian.</p>', 
'Màu sắc có ảnh hưởng lớn đến cảm xúc và tâm trạng của con người.', 
'/placeholder.svg?height=400&width=600', 'Nguyễn Văn E'),

('Thiết kế không gian làm việc tại nhà hiệu quả', 'thiet-ke-khong-gian-lam-viec-tai-nha-hieu-qua', 
'<p>Với xu hướng làm việc từ xa ngày càng phổ biến, việc thiết kế một không gian làm việc tại nhà hiệu quả trở nên quan trọng hơn bao giờ hết. Một không gian làm việc tốt không chỉ giúp nâng cao hiệu suất mà còn đảm bảo sự cân bằng giữa công việc và cuộc sống.</p><p>Vị trí lý tưởng cho không gian làm việc tại nhà là nơi yên tĩnh, có ánh sáng tự nhiên và tách biệt với khu vực sinh hoạt. Bàn làm việc và ghế ergonomic giúp duy trì tư thế đúng, giảm thiểu các vấn đề về cột sống và mỏi mắt khi làm việc lâu.</p><p>Tổ chức không gian gọn gàng, hệ thống lưu trữ hợp lý và các thiết bị công nghệ phù hợp cũng là những yếu tố quan trọng giúp nâng cao hiệu quả làm việc tại nhà.</p>', 
'Với xu hướng làm việc từ xa ngày càng phổ biến, việc thiết kế một không gian làm việc tại nhà hiệu quả trở nên quan trọng hơn.', 
'/placeholder.svg?height=400&width=600', 'Trần Văn F');

-- Insert sample user
INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@360home.vn', '$2b$10$JqHRrKUCzBwOLQwXBAXCm.jqKLCzqrZ.XlzUY8JbSFMBwiYAYQjXu'); -- Password: password123

