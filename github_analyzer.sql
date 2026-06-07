-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2026 at 05:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `github_analyzer`
--

-- --------------------------------------------------------

--
-- Table structure for table `github_profiles`
--

CREATE TABLE `github_profiles` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `public_repos` int(11) DEFAULT 0,
  `followers` int(11) DEFAULT 0,
  `following` int(11) DEFAULT 0,
  `total_stars` int(11) DEFAULT 0,
  `top_languages` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `github_profiles`
--

INSERT INTO `github_profiles` (`id`, `username`, `name`, `bio`, `public_repos`, `followers`, `following`, `total_stars`, `top_languages`, `created_at`, `updated_at`) VALUES
(1, 'octocat', 'The Octocat', NULL, 8, 22875, 9, 21499, 'Ruby, CSS, HTML', '2026-06-07 13:30:36', '2026-06-07 14:26:47'),
(3, 'DevRaaz-creator', 'DevRaaz | Data Polymath', NULL, 0, 0, 0, 0, 'None', '2026-06-07 14:50:45', '2026-06-07 14:50:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `github_profiles`
--
ALTER TABLE `github_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `github_profiles`
--
ALTER TABLE `github_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
