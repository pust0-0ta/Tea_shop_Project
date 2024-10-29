-- Создание базы данных
CREATE DATABASE IF NOT EXISTS tea_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Выбор базы данных для последующих операций
USE tea_shop;

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,    -- Название чая
    customer_name VARCHAR(255) NOT NULL,   -- Имя клиента
    phone VARCHAR(20) NOT NULL,            -- Телефон клиента
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Дата создания заказа
);

-- Таблица сообщений из формы связи
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,            -- Имя пользователя
    phone VARCHAR(20) NOT NULL,            -- Телефон пользователя
    message TEXT,                          -- Сообщение пользователя
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Дата отправки сообщения
);

-- Тестовые данные для таблицы `orders`
INSERT INTO orders (product_name, customer_name, phone)
VALUES
    ('Сладкий апельсин', 'Иван Иванов', '+375 (29) 123-45-67'),
    ('Ароматная малина', 'Анна Петрова', '+375 (33) 987-65-43');

-- Тестовые данные для таблицы `contacts`
INSERT INTO contacts (name, phone, message)
VALUES
    ('Мария Смирнова', '+375 (44) 555-55-55', 'Хотел бы узнать о наличии чая с бергамотом.');
