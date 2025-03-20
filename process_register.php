<?php
session_start();
include 'config.php'; // Ensure this connects to your database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $confirm_password = trim($_POST["confirm_password"]);

    // Check if passwords match
    if ($password !== $confirm_password) {
        $_SESSION['error'] = "Mật khẩu không khớp!";
        header("Location: register.php");
        exit();
    }

    // Hash the password before storing it
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Insert user into the database
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    if ($stmt->execute()) {
        $_SESSION['success'] = "Đăng ký thành công!"; // Store success message
        header("Location: home.php"); // Redirect to home.php
        exit();
    } else {
        $_SESSION['error'] = "Lỗi đăng ký, vui lòng thử lại.";
        header("Location: register.php");
        exit();
    }

    $stmt->close();
    $conn->close();
}
?>
