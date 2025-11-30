-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 30, 2025 at 12:27 AM
-- Server version: 8.4.6
-- PHP Version: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `funfly`
--
CREATE DATABASE IF NOT EXISTS `funfly` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `funfly`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('464fbd81-c228-11f0-bd8c-2e0110899b64', '8fa6232a-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fbd81-c228-11f0-bd8c-2e0110899b64', '8fa62cef-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fbd81-c228-11f0-bd8c-2e0110899b64', '8fa62ea9-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fbe09-c228-11f0-bd8c-2e0110899b64', '8fa630b9-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fbeb0-c228-11f0-bd8c-2e0110899b64', '8fa62be4-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fbeb0-c228-11f0-bd8c-2e0110899b64', '8fa62d5e-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fbeb0-c228-11f0-bd8c-2e0110899b64', '8fa63119-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fbeb0-c228-11f0-bd8c-2e0110899b64', '8fa631dd-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc025-c228-11f0-bd8c-2e0110899b64', '8fa62e30-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc025-c228-11f0-bd8c-2e0110899b64', '8fa6316a-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', '8fa6232a-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', '8fa62db1-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', '8fa62e30-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', '8fa63119-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', '8fa631dd-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc187-c228-11f0-bd8c-2e0110899b64', '8fa62f61-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc187-c228-11f0-bd8c-2e0110899b64', '8fa630b9-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc227-c228-11f0-bd8c-2e0110899b64', '8fa62ea9-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc2d6-c228-11f0-bd8c-2e0110899b64', '8fa62be4-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc2d6-c228-11f0-bd8c-2e0110899b64', '8fa62d5e-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc2d6-c228-11f0-bd8c-2e0110899b64', '8fa6316a-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc382-c228-11f0-bd8c-2e0110899b64', '8fa6232a-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc382-c228-11f0-bd8c-2e0110899b64', '8fa62cef-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc382-c228-11f0-bd8c-2e0110899b64', '8fa630b9-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59'),
('464fc382-c228-11f0-bd8c-2e0110899b64', '8fa631dd-cd7e-11f0-be40-62fd0045d500', '2025-11-30 00:00:59', '2025-11-30 00:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('464fb256-c228-11f0-bd8c-2e0110899b64', 'Dean', 'Stark', 'dean@funfly.com', '3bc8878e73e4a8ed1847f91b3fec96f025fe6e4854575bba13de8971de8f35a0', 'admin', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fbc23-c228-11f0-bd8c-2e0110899b64', 'Shahar', 'Solomianik', 'shahar@funfly.com', '3bc8878e73e4a8ed1847f91b3fec96f025fe6e4854575bba13de8971de8f35a0', 'admin', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fbd81-c228-11f0-bd8c-2e0110899b64', 'Lior', 'Ben Ari', 'lior@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fbe09-c228-11f0-bd8c-2e0110899b64', 'Niv', 'Mor', 'niv@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fbeb0-c228-11f0-bd8c-2e0110899b64', 'Yali', 'Tal', 'yali@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fbf7d-c228-11f0-bd8c-2e0110899b64', 'Ron', 'Aviv', 'ron@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fc025-c228-11f0-bd8c-2e0110899b64', 'Dana', 'Mizrahi', 'dana@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', 'Tom', 'Barak', 'tom@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fc187-c228-11f0-bd8c-2e0110899b64', 'Ori', 'Dayan', 'ori@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fc227-c228-11f0-bd8c-2e0110899b64', 'Tal', 'Reuven', 'tal@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fc2d6-c228-11f0-bd8c-2e0110899b64', 'Yotam', 'Raz', 'yotam@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57'),
('464fc382-c228-11f0-bd8c-2e0110899b64', 'Inbar', 'Levi', 'inbar@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-29 23:47:57', '2025-11-29 23:47:57');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` int NOT NULL,
  `image_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image_name`, `created_at`, `updated_at`) VALUES
('8fa6232a-cd7e-11f0-be40-62fd0045d500', 'Dubai, UAE', 'Luxury hotels, huge malls, futuristic skyline and desert adventures.', '2025-01-25 00:00:00', '2025-01-30 00:00:00', 2600, 'dubai.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa62be4-cd7e-11f0-be40-62fd0045d500', 'Bangkok, Thailand', 'Vibrant markets, temples, and legendary street food.', '2025-02-20 00:00:00', '2025-02-28 00:00:00', 1200, 'bangkok.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa62cef-cd7e-11f0-be40-62fd0045d500', 'Paris, France', 'Romantic city with iconic landmarks and a rich cultural atmosphere.', '2025-03-01 00:00:00', '2025-03-07 00:00:00', 1800, 'paris.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa62d5e-cd7e-11f0-be40-62fd0045d500', 'Amsterdam, Netherlands', 'Charming canals, bikes everywhere, and relaxing atmosphere.', '2025-03-15 00:00:00', '2025-03-21 00:00:00', 1400, 'amsterdam.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa62db1-cd7e-11f0-be40-62fd0045d500', 'London, UK', 'A city full of culture, history, art, and iconic attractions.', '2025-04-02 00:00:00', '2025-04-09 00:00:00', 1900, 'london.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa62e30-cd7e-11f0-be40-62fd0045d500', 'Tokyo, Japan', 'A unique blend of tradition and futurism with incredible food and nightlife.', '2025-04-10 00:00:00', '2025-04-20 00:00:00', 2400, 'tokyo.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa62ea9-cd7e-11f0-be40-62fd0045d500', 'Santorini, Greece', 'Blue rooftops, crystal-clear waters, and unforgettable sunsets.', '2025-05-01 00:00:00', '2025-05-07 00:00:00', 1700, 'santorini.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa62f61-cd7e-11f0-be40-62fd0045d500', 'New York, USA', 'The city that never sleeps, full of iconic attractions and energy.', '2025-05-15 00:00:00', '2025-05-22 00:00:00', 2200, 'new-york.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa630b9-cd7e-11f0-be40-62fd0045d500', 'Rome, Italy', 'Ancient history, world-famous cuisine, and breathtaking architecture.', '2025-06-01 00:00:00', '2025-06-08 00:00:00', 1500, 'rome.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa63119-cd7e-11f0-be40-62fd0045d500', 'Barcelona, Spain', 'Beautiful beaches, colorful streets, and Gaudí masterpieces.', '2025-07-05 00:00:00', '2025-07-12 00:00:00', 1600, 'barcelona.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa6316a-cd7e-11f0-be40-62fd0045d500', 'Vancouver, Canada', 'Forests, lakes and mountain views perfect for hikers.', '2025-07-10 00:00:00', '2025-07-17 00:00:00', 2900, 'vancouver.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10'),
('8fa631dd-cd7e-11f0-be40-62fd0045d500', 'Sydney, Australia', 'Stunning beaches, wildlife, and the world-famous Opera House.', '2025-08-10 00:00:00', '2025-08-20 00:00:00', 3000, 'sydney.png', '2025-11-29 23:53:10', '2025-11-29 23:53:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `follows_vacationId_userId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
