<?php
session_start();

$authenticated = false;
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>360HOME - Nền tảng kết nối nội thất</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="background-slider"></div>
    <header>
        <nav>
            <div class="logo"> <img src="/image/logo.png" alt="360HOME Logo"> </div>
            <ul class="nav-links">
                <li><a href="#">LÝ DO LỰA CHỌN 360HOME</a></li>
                <li><a href="#">XU HƯỚNG THIẾT KẾ NỘI THẤT</a></li>
                <li><a href="#">DỰ ÁN</a></li>
                <li><a href="https://360home.vn/tin-tuc">TIN TỨC</a></li>
                <li><a href="#">DÀNH CHO KTS</a></li>
            </ul>
            <div class="nav-buttons">
                <button class="contact">LIÊN HỆ TƯ VẤN</button>
                <button class="login">ĐĂNG NHẬP</button>
            </div>
        </nav>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>360HOME – Nền tảng kết nối hoàn thiện nội thất toàn diện</h1>
            <p>Giải pháp hoàn hảo, tối ưu chi phí cho ngôi nhà của bạn!</p>
        </div>
    </section>
                <!-- Projects -->
    <section class="projects">
        <div class="carousel-container">
            <div class="carousel">
                <!-- Diamond Crown -->
                <div class="project">
                    <img src="/image/diamond-crown-logo.png" class="project-logo" alt="Diamond Crown Logo">
                    <div class="project-slider">
                        <img src="/image/diamond-crown-1.jpg" class="active project-image" alt="Diamond Crown">
                        <img src="/image/diamond-crown-2.jpg" class="active project-image" alt="Diamond Crown">
                        <img src="/image/diamond-crown-3.jpg" class="active project-image" alt="Diamond Crown">
                    </div>
                    <h3>DIAMOND CROWN</h3>
                    <div class="dots"></div>
                    <button class="design-btn">NHẬN THIẾT KẾ</button>
                </div>
    
                <!-- Heritage Westlake -->
                <div class="project">
                    <img src="/image/heritage-westlake-logo.png" class="project-logo" alt="Heritage Westlake Logo">
                    <div class="project-slider">
                        <img src="/image/heritage-westlake-1.jpg" class="active project-image" alt="Heritage Westlake">
                        <img src="/image/heritage-westlake-2.jpg" class="active project-image" alt="Heritage Westlake">
                        <img src="/image/heritage-westlake-3.jpg" class="active project-image" alt="Heritage Westlake">
                    </div>
                    <h3>HERITAGE WEST LAKE</h3>
                    <div class="dots"></div>
                    <button class="design-btn">NHẬN THIẾT KẾ</button>
                </div>

                <!-- Lumi Hanoi -->
                <div class="project">
                    <img src="/image/lumi-hanoi-logo.png" class="project-logo" alt="Lumi Hanoi Logo">
                    <div class="project-slider">
                        <img src="/image/lumi-hanoi-1.jpg" class="active project-image" alt="Lumi Hanoi">
                        <img src="/image/lumi-hanoi-2.jpg" class="active project-image" alt="Lumi Hanoi">
                        <img src="/image/lumi-hanoi-3.jpg" class="active project-image" alt="Lumi Hanoi">
                    </div>
                    <h3>LUMI HANOI</h3>
                    <div class="dots"></div>
                    <button class="design-btn">NHẬN THIẾT KẾ</button>
                </div>
    
                <!-- The Minato Residence -->
                <div class="project">
                    <img src="/image/the-minato-logo.png" class="project-logo" alt="The Minato Residence Logo">
                    <div class="project-slider">
                        <img src="/image/the-minato-1.jpg" class="active project-image" alt="The Minato Residence">
                        <img src="/image/the-minato-2.jpg" class="active project-image" alt="The Minato Residence">
                        <img src="/image/the-minato-3.jpg" class="active project-image" alt="The Minato Residence">
                    </div>
                    <h3>THE MINATO RESIDENCE</h3>
                    <div class="dots"></div>
                    <button class="design-btn">NHẬN THIẾT KẾ</button>
                </div>
    
                <!-- Hoang Huy Commerce -->
                <div class="project">
                    <img src="/image/hoang-huy-logo.png" class="project-logo" alt="Hoang Huy Commerce Logo">
                    <div class="project-slider">
                        <img src="/image/hoang-huy-1.jpg" class="active project-image" alt="Hoang Huy Commerce">
                        <img src="/image/hoang-huy-2.jpg" class="active project-image" alt="Hoang Huy Commerce">
                        <img src="/image/hoang-huy-3.jpg" class="active project-image" alt="Hoang Huy Commerce">
                    </div>
                    <h3>HOANG HUY COMMERCE</h3>
                    <div class="dots"></div>
                    <button class="design-btn">NHẬN THIẾT KẾ</button>
                </div>
            </div>
    
            <!-- Navigation Arrows -->
            <button class="prev-btn">&#10094;</button>
            <button class="next-btn">&#10095;</button>
        </div>
    </section>
    
    

    <footer>
        <p>&copy; 2025 360HOME. All rights reserved.</p>
    </footer>

    <!-- Login Modal -->
<div id="loginModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>360HOME</h2>
        <p>Đăng nhập vào tài khoản của bạn</p>
        <form id="loginForm">
            <label for="username">Tài khoản hoặc E-mail *</label>
            <input type="text" id="username" name="username" required>
            
            <label for="password">Mật khẩu *</label>
            <input type="password" id="password" name="password" required>
            
            <div class="remember">
                <input type="checkbox" id="remember">
                <label for="remember">Ghi nhớ tài khoản</label>
            </div>

            <button type="submit" class="login-btn">ĐĂNG NHẬP</button>
        </form>
        
        <button class="google-login">Đăng nhập bằng tài khoản Google</button>
        <p>Chưa có tài khoản? <a href="register.php">Đăng ký.</a></p>
    </div>
</div>
</body>
</html>
