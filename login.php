<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
$conn = new mysqli("localhost", "root", "", "users_db");

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    // Query to check user in database
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $user, $hashed_password);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashed_password)) {
            $_SESSION["user_id"] = $id;
            $_SESSION["username"] = $user;
            echo json_encode(["status" => "success", "message" => "Đăng nhập thành công!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Sai mật khẩu!"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Tài khoản không tồn tại!"]);
    }
    $stmt->close();
}
$conn->close();
?>
