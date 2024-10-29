<?php
require_once 'config/config.php';

$conn = dbConnect();

if ($conn) {
    echo "Подключение к базе данных успешно!";
    pg_close($conn);
} else {
    echo "Ошибка подключения к базе данных.";
}
?>
