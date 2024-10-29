<?php
require_once '../config/config.php'; // Подключаем файл конфигурации
header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Разрешить запросы только с Live Server
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");   // Разрешить методы, которые вы используете
header("Access-Control-Allow-Headers: Content-Type"); 

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Подключаемся к базе данных
    $conn = dbConnect();

    // Получаем данные из POST-запроса
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $nameProduct = $_POST['nameProduct'] ?? null; // Для формы заказа чая
    $message = $_POST['message'] ?? '';           // Для формы обратной связи

    // Проверяем, какая форма отправила запрос, и вставляем данные в нужную таблицу
    if ($nameProduct) {
        // Запрос для формы заказа чая
        $query = "INSERT INTO orders (product_name, customer_name, phone) VALUES ($1, $2, $3)";
        pg_query_params($conn, $query, [$nameProduct, $name, $phone]);
    } else {
        // Запрос для формы обратной связи
        $query = "INSERT INTO contacts (name, phone, message) VALUES ($1, $2, $3)";
        pg_query_params($conn, $query, [$name, $phone, $message]);
    }

    // Закрываем соединение с базой данных
    pg_close($conn);
}
?>
