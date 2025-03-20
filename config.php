<?php
$servername = "localhost";
$username = "root"; // Change if you set a different user
$password = ""; // Default XAMPP password is empty
$dbname = "360home";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
?>
