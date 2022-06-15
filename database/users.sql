-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 15 2022 г., 18:22
-- Версия сервера: 8.0.24
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `users`
--

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` varchar(250) NOT NULL,
  `reg_time` varchar(100) NOT NULL,
  `last_log` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `status`, `reg_time`, `last_log`) VALUES
(1, 'James', 'james@gmail.com', '1234', 'active', '11.6.2022 18:58', '12.6.2022 20:26'),
(2, 'rinatovic', 'rinatovic@gmail.com', 'adas', 'active', '11.6.2022 18:59', '11.6.2022 18:59'),
(3, 'Luke', 'Luke@gmail.com', 'qwerty', 'active', '11.6.2022 18:59', '11.6.2022 18:59'),
(4, 'Dany', 'dany@mail.ru', 'zxcz', 'active', '11.6.2022 19:2', '11.6.2022 19:2'),
(5, 'George', 'george@mail.ru', 'asdd', 'active', '11.6.2022 19:3', '11.6.2022 19:3'),
(6, 'Lily', 'lily@gmail.com', '3333', 'active', '11.6.2022 19:5', '11.6.2022 19:5'),
(7, 'Sam', 'sam@example.com', 'samy', 'active', '11.6.2022 23:15', '11.6.2022 23:32'),
(8, 'John', 'john@test.ru', 'john', 'active', '12.6.2022 18:7', '12.6.2022 18:8'),
(9, 'Harry', 'harry@hogwarts.ru', 'harry', 'active', '12.6.2022 19:22', '12.6.2022 19:22'),
(10, 'rinatovic', 'mvrinatovicso@gmail.com', 'gameover24121999', 'active', '3.5.2022_20:18', '3.5.2022_20:18');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
