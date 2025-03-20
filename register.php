<?php
session_start();
?>

<?php if (isset($_SESSION['error'])): ?>
    <div class="error-message">
        <?php echo $_SESSION['error']; ?>
    </div>
    <script>
        setTimeout(function() {
            document.querySelector('.error-message').style.display = 'none';
        }, 2500); // Hide the error message after 2 seconds
    </script>
    <?php unset($_SESSION['error']); // Remove message after displaying ?>
<?php endif; ?>



<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Ký 360HOME</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="full-page-background"></div>
<div class="register-container">
    <div class="register-box">
        <div class="logo">
            <img src="image/logo.png" alt="360Home Logo">
        </div>
        <div class="register-form">
            <h2>ĐĂNG KÝ 360HOME</h2>
            <p>360HOME cam kết bảo mật thông tin khách hàng, không sử dụng thông tin khách hàng vào mục đích khác.</p>
            <form action="process_register.php" method="POST">
                <input type="text" name="username" placeholder="TÀI KHOẢN" required>
                <input type="email" name="email" placeholder="E-MAIL" required>
                <input type="password" name="password" placeholder="MẬT KHẨU" required>
                <input type="password" name="confirm_password" placeholder="NHẬP LẠI MẬT KHẨU" required>
                <button type="submit" class="register-btn">ĐĂNG KÝ TÀI KHOẢN</button>
            </form>
            <p>Đã có tài khoản? <a href="home.php"><strong>Đăng nhập</strong></a></p>
        </div>
    </div>
</div>

</body>
</html>
