<?php
session_start();
session_destroy();
setcookie("user", "", time() - 3600, "/"); // Delete cookie
header("Location: index.php");
?>
