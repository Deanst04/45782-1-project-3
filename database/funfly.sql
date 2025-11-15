-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 15, 2025 at 03:15 PM
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
('464fbd81-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbd81-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbd81-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbe09-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbe09-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbe09-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbeb0-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbeb0-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbeb0-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbf7d-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbf7d-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fbf7d-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc025-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc025-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc025-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc187-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc187-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc187-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc227-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc227-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc227-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc2d6-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc2d6-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc2d6-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc382-c228-11f0-bd8c-2e0110899b64', '7db4872a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc382-c228-11f0-bd8c-2e0110899b64', '7db48c0b-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44'),
('464fc382-c228-11f0-bd8c-2e0110899b64', '7db48c6a-c227-11f0-bd8c-2e0110899b64', '2025-11-15 13:41:44', '2025-11-15 13:41:44');

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
('464fb256-c228-11f0-bd8c-2e0110899b64', 'Dean', 'Stark', 'dean@funfly.com', '3bc8878e73e4a8ed1847f91b3fec96f025fe6e4854575bba13de8971de8f35a0', 'admin', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fbc23-c228-11f0-bd8c-2e0110899b64', 'Shahar', 'Solomianik', 'shahar@funfly.com', '3bc8878e73e4a8ed1847f91b3fec96f025fe6e4854575bba13de8971de8f35a0', 'admin', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fbd81-c228-11f0-bd8c-2e0110899b64', 'Lior', 'Ben Ari', 'lior@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fbe09-c228-11f0-bd8c-2e0110899b64', 'Niv', 'Mor', 'niv@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fbeb0-c228-11f0-bd8c-2e0110899b64', 'Yali', 'Tal', 'yali@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fbf7d-c228-11f0-bd8c-2e0110899b64', 'Ron', 'Aviv', 'ron@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fc025-c228-11f0-bd8c-2e0110899b64', 'Dana', 'Mizrahi', 'dana@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fc0af-c228-11f0-bd8c-2e0110899b64', 'Tom', 'Barak', 'tom@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fc187-c228-11f0-bd8c-2e0110899b64', 'Ori', 'Dayan', 'ori@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fc227-c228-11f0-bd8c-2e0110899b64', 'Tal', 'Reuven', 'tal@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fc2d6-c228-11f0-bd8c-2e0110899b64', 'Yotam', 'Raz', 'yotam@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48'),
('464fc382-c228-11f0-bd8c-2e0110899b64', 'Inbar', 'Levi', 'inbar@example.com', '6716e0eee2e61d6f73eb3f03dcb153479962328aa6e65706e1b226bf7a6d4e3c', 'user', '2025-11-15 13:37:48', '2025-11-15 13:37:48');

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
  `image_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('7db4872a-c227-11f0-bd8c-2e0110899b64', 'Paris, France', 'Romantic city with iconic landmarks and a rich cultural atmosphere.', '2025-03-01 00:00:00', '2025-03-07 00:00:00', 1800, 'https://picsum.photos/seed/paris/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48a50-c227-11f0-bd8c-2e0110899b64', 'Tokyo, Japan', 'A unique blend of tradition and futurism with incredible food and nightlife.', '2025-04-10 00:00:00', '2025-04-20 00:00:00', 2400, 'https://picsum.photos/seed/tokyo/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48b30-c227-11f0-bd8c-2e0110899b64', 'New York, USA', 'The city that never sleeps, full of iconic attractions and energy.', '2025-05-15 00:00:00', '2025-05-22 00:00:00', 2200, 'https://picsum.photos/seed/ny/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48c0b-c227-11f0-bd8c-2e0110899b64', 'Rome, Italy', 'Ancient history, world-famous cuisine, and breathtaking architecture.', '2025-06-01 00:00:00', '2025-06-08 00:00:00', 1500, 'https://picsum.photos/seed/rome/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48c41-c227-11f0-bd8c-2e0110899b64', 'Bangkok, Thailand', 'Vibrant markets, temples, and legendary street food.', '2025-02-20 00:00:00', '2025-02-28 00:00:00', 1200, 'https://picsum.photos/seed/bkk/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48c6a-c227-11f0-bd8c-2e0110899b64', 'Barcelona, Spain', 'Beautiful beaches, colorful streets, and Gaudí masterpieces.', '2025-07-05 00:00:00', '2025-07-12 00:00:00', 1600, 'https://picsum.photos/seed/barcelona/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48c9a-c227-11f0-bd8c-2e0110899b64', 'Amsterdam, Netherlands', 'Charming canals, bikes everywhere, and relaxing atmosphere.', '2025-03-15 00:00:00', '2025-03-21 00:00:00', 1400, 'https://picsum.photos/seed/amsterdam/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48cfb-c227-11f0-bd8c-2e0110899b64', 'Dubai, UAE', 'Luxury hotels, huge malls, futuristic skyline and desert adventures.', '2025-01-25 00:00:00', '2025-01-30 00:00:00', 2600, 'https://picsum.photos/seed/dubai/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48d54-c227-11f0-bd8c-2e0110899b64', 'London, UK', 'A city full of culture, history, art, and iconic attractions.', '2025-04-02 00:00:00', '2025-04-09 00:00:00', 1900, 'https://picsum.photos/seed/london/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48d7b-c227-11f0-bd8c-2e0110899b64', 'Sydney, Australia', 'Stunning beaches, wildlife, and the world-famous Opera House.', '2025-08-10 00:00:00', '2025-08-20 00:00:00', 3000, 'https://picsum.photos/seed/sydney/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48da0-c227-11f0-bd8c-2e0110899b64', 'Santorini, Greece', 'Blue rooftops, crystal-clear waters, and unforgettable sunsets.', '2025-05-01 00:00:00', '2025-05-07 00:00:00', 1700, 'https://picsum.photos/seed/santo/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11'),
('7db48dc4-c227-11f0-bd8c-2e0110899b64', 'Prague, Czech Republic', 'A fairytale-like city with castles, bridges, and amazing beer.', '2025-09-12 00:00:00', '2025-09-18 00:00:00', 1300, 'https://picsum.photos/seed/prague/300', '2025-11-15 13:32:11', '2025-11-15 13:32:11');

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
