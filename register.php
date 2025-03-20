<?php
session_start();
require_once "config.php"; // Database connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $confirm_password = trim($_POST["confirm_password"]);

    // Check if passwords match
    if ($password !== $confirm_password) {
        echo "<script>alert('Mật khẩu không khớp!');</script>";
    } else {
        // Hash the password for security
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert user into database
        $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("sss", $username, $email, $hashed_password);
            if ($stmt->execute()) {
                echo "<script>alert('Đăng ký thành công!'); window.location.href = 'index.php';</script>";
            } else {
                echo "<script>alert('Lỗi khi đăng ký.');</script>";
            }
            $stmt->close();
        }
    }
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Ký - 360HOME</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h2>Đăng Ký</h2>
    <form method="POST" action="">
        <label>Tài khoản *</label>
        <input type="text" name="username" required>

        <label>Email *</label>
        <input type="email" name="email" required>

        <label>Mật khẩu *</label>
        <input type="password" name="password" required>

        <label>Nhập lại mật khẩu *</label>
        <input type="password" name="confirm_password" required>

        <button type="submit">Đăng Ký</button>
    </form>
    <p>Đã có tài khoản? <a href="home.php">Đăng nhập</a></p>
</body>
</html>
