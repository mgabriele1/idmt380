-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Aug 31, 2020 at 12:22 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `coloring_book`
--

-- --------------------------------------------------------

--
-- Table structure for table `artwork`
--

CREATE TABLE `artwork` (
  `id` int(11) NOT NULL,
  `artist` varchar(20) DEFAULT NULL,
  `image` varchar(31) DEFAULT NULL,
  `keywords` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `artwork`
--

INSERT INTO `artwork` (`id`, `artist`, `image`, `keywords`) VALUES
(1, 'Christina An', 'DIGM223_An_Christina.svg', 'demon*tree*hell*sword*skeleton*skull*king*bone*wing*fly'),
(2, 'Stephen Brennan', 'DIGM223_Brennan_Stephen.svg', 'monster*alien*space*outter*star*planet*rock*moon*asteroid*meteor'),
(3, 'John Davalos', 'DIGM223_Davalos_John.svg', 'monster*bird*man*tree*leaf'),
(4, 'Angela Filtz', 'DIGM223_Filtz_Angela.svg', 'fire*rope*trap*woman*eye*queen'),
(5, 'Travis Hove', 'DIGM223_Hove_Travis.svg', 'city*house*brick*building*apartment*window'),
(6, 'Maxim Lewing', 'DIGM223_Lewing_Maxime.svg', 'monster*squid*octopus*cloud'),
(7, 'Fiona Lynch', 'DIGM223_Lynch_Fiona.svg', 'monster*happy*sun*food*boot*shoe'),
(8, 'Sara Meixner', 'DIGM223_Meixner_Sara.svg', 'monster*mushroom*field*face*grass*plant'),
(9, 'Elijah Rizzuto Smith', 'DIGM223_RizzutoSmith_Elijah.svg', 'death*bat*moon*tombstone'),
(10, 'Julia Schultz', 'DIGM223_Schultz_Julia.svg', 'car*zombie*human*cool'),
(11, 'Ben Spurr', 'DIGM223_Spurr_Ben.svg', 'death*dragon*hell*kill*wing*fly'),
(12, 'Anthony Srnka', 'DIGM223_Srnka_Anthony.svg', 'pig*pirate*sea*ocean*sail'),
(13, 'Clay Tercek', 'DIGM223_Tercek_Clay.svg', 'monster*cowboy*west*cactus*sun*hot*snail*slug*snake'),
(14, 'Michael Toone', 'DIGM223_Toone_Michael.svg', 'robot*mountain*alien*happy'),
(15, 'Ciaran Wagner', 'DIGM223_Wagner_Ciaran.svg', 'monster*tv*field'),
(16, 'Lindsey Wolfe', 'DIGM223_Wolfe_Lindsey.svg', 'water*ocean*whale*plant*life');

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

CREATE TABLE `community` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `artist` varchar(15) DEFAULT NULL,
  `image` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`id`, `timestamp`, `artist`, `image`) VALUES
(34, '2020-08-31 00:21:38', 'Hunter', '5f4c42924eb1b.svg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artwork`
--
ALTER TABLE `artwork`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `community`
--
ALTER TABLE `community`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artwork`
--
ALTER TABLE `artwork`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `community`
--
ALTER TABLE `community`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
