<?php
// Подключение к базе данных
define('DB_SERVER', 'localhost');
define('DB_PORT', '5432');
define('DB_USERNAME', 'postgres');
define('DB_PASSWORD', '14121950'); // Укажите ваш пароль
define('DB_NAME', 'tea_shop');

function dbConnect() {
    $conn_string = "host=" . DB_SERVER . " port=" . DB_PORT . " dbname=" . DB_NAME . " user=" . DB_USERNAME . " password=" . DB_PASSWORD;
    $conn = pg_connect($conn_string);
    if (!$conn) {
        die("Ошибка подключения к базе данных: " . pg_last_error());
    }
    return $conn;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = dbConnect();
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $nameProduct = $_POST['nameProduct'] ?? null;
    $message = $_POST['message'] ?? '';

    if ($nameProduct) {
        $query = "INSERT INTO orders (product_name, customer_name, phone) VALUES ($1, $2, $3)";
        pg_query_params($conn, $query, [$nameProduct, $name, $phone]);
    } else {
        $query = "INSERT INTO contacts (name, phone, message) VALUES ($1, $2, $3)";
        pg_query_params($conn, $query, [$name, $phone, $message]);
    }
    pg_close($conn);
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Tea Shop</title>
    <link rel="stylesheet" href="css/jquery-ui.min.css">
    <link rel="stylesheet" href="css/animate.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/adaptive.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<header>
    <div class="container">
        <div class="header-img">
            <div class="header-main">
                <div class="header-menu">
                    <div class="logo logo-header">
                        <img src="images/logo.png" alt="logo">
                    </div>
                    <div class="menu">
                        <ul class="menu-list">
                            <li><a class="menu-link" href="#desc">О нас</a></li>
                            <li><a class="menu-link" href="#productItems">Наш ассортимент</a></li>
                            <li><a class="menu-link" href="#orderItems">Оформить заказ</a></li>
                            <li><a class="menu-link" href="#storeContacts">Контакты</a></li>
                        </ul>
                    </div>
                    <button class="button header-button button-link-us" id="headerBtn">
                        <a href="#">Связаться с нами</a>
                    </button>
                </div>
            </div>
            <div class="header-desc">
                <h1 class="header-title">Эксклюзивный листовой чай</h1>
                <p class="subtitle">с разных уголков планеты</p>
            </div>
        </div>
    </div>
</header>

<main>
    <section id="productItems">
        <h2>Наш ассортимент</h2>
    </section>

    <section id="orderItems">
        <div class="order-background modal" id="orderBg">
            <div class="order">
                <button class="close">
                    <img src="images/close.png" alt="close">
                </button>
                <p class="title-text title-text-order">Закажите чай</p>
                <form id="orderForm" method="POST">
                    <label for="nameProduct">Выберите чай:</label>
                    <select id="nameProduct" name="nameProduct">
                        <option value="orange">Сладкий апельсин</option>
                        <option value="pear">Чай с облепихой и грушей</option>
                        <option value="raspberry">Ароматная малина</option>
                        <option value="lemon">Лимон и мята</option>
                        <option value="bergamot">Изысканный бергамот</option>
                        <option value="vanilla">Сладкая ваниль</option>
                    </select>
                    <input type="text" name="name" id="name" placeholder="Ваше имя" required>
                    <input type="tel" name="phone" id="phone" placeholder="Телефон" required>
                    <button type="submit" id="createOrder">Оформить заказ</button>
                </form>
            </div>
        </div>
    </section>

    <div id="order-background-thanks" class="modal">
        <div class="order-done modal">
            <button class="close" id="close">
                <img src="images/close.png" alt="close">
            </button>
            <p class="title-text title-text-order-done">Спасибо, что выбрали нас!</p>
            <p class="order-done-block-text">
                Наш оператор свяжется с вами в течение 15 минут для подтверждения заказа.
            </p>
        </div>
    </div>

    <section id="storeContacts">
        <h2>Контактная информация</h2>
        <p>Адрес: г. Владивосток, ТЦ «Море», 5 этаж</p>
        <p>Телефон: +7 (914) 332-16-17</p>
    </section>
</main>

<footer>
    <div class="container container-footer">
        <div class="footer-wrapper">
            <div class="logo logo-footer">
                <img src="images/logo.png" alt="logo">
            </div>
            <span class="contacts-text contacts-text-footer">Все права защищены, 2024</span>
        </div>
    </div>
</footer>

<script src="js/jquery-3.7.1.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/jquery.inputmask.min.js"></script>
<script src="js/wow.min.js"></script>
<script>
    $(document).ready(function () {
        // Применение маски ввода для телефона
        $("#phone").inputmask({"mask": "+7 (999) 999-99-99"});
        
        // Закрытие попапа "Спасибо за заказ"
        $("#close").on("click", function () {
            $("#order-background-thanks").hide();
        });
    });
</script>

</body>
</html>
