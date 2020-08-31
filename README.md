# Welcome to Doodle!
### How to initialize the app - Node required!

1. Using your Command Line, navigate to the directory of the app folder.
2. Initialize your local NPM by running this code: `npm i -y`.
3. Run the command `gulp` to begin using the required packages.

### How to setup the database
1. Install MAMP if not already, set the server root to the root of this project directory.
2. Open PHPMyAdmin in MAMP.
> Most likely -> http://localhost:8888/phpMyAdmin/?lang=en

3. Create a database named "coloring_book".
4. Goto SQL tab and run the following code to create the database.

```
-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Aug 31, 2020 at 09:33 PM
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
  `image` varchar(31) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `artwork`
--

INSERT INTO `artwork` (`id`, `artist`, `image`) VALUES
(1, 'Christina An', 'DIGM223_An_Christina.svg'),
(2, 'Stephen Brennan', 'DIGM223_Brennan_Stephen.svg'),
(3, 'John Davalos', 'DIGM223_Davalos_John.svg'),
(4, 'Angela Filtz', 'DIGM223_Filtz_Angela.svg'),
(5, 'Travis Hove', 'DIGM223_Hove_Travis.svg'),
(6, 'Maxim Lewing', 'DIGM223_Lewing_Maxime.svg'),
(7, 'Fiona Lynch', 'DIGM223_Lynch_Fiona.svg'),
(8, 'Sara Meixner', 'DIGM223_Meixner_Sara.svg'),
(9, 'Elijah Rizzuto Smith', 'DIGM223_RizzutoSmith_Elijah.svg'),
(10, 'Julia Schultz', 'DIGM223_Schultz_Julia.svg'),
(11, 'Ben Spurr', 'DIGM223_Spurr_Ben.svg'),
(12, 'Anthony Srnka', 'DIGM223_Srnka_Anthony.svg'),
(13, 'Clay Tercek', 'DIGM223_Tercek_Clay.svg'),
(14, 'Michael Toone', 'DIGM223_Toone_Michael.svg'),
(15, 'Ciaran Wagner', 'DIGM223_Wagner_Ciaran.svg'),
(16, 'Lindsey Wolfe', 'DIGM223_Wolfe_Lindsey.svg');

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
```

5. No additional action required, navigate to your local server and test!
> Most likely -> http://localhost:8888/

### [Optional] Enable Watch

1. Simply  un-comment all gulp.watch commands in the gulpfile.js and run command `gulp` again to have your Command Line watch for file changes like saves to CSS and JS

	To stop the watch process, press Ctrl + C