<?php

// Local
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "root";
$dbname = "coloring_book";
$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

// Check the connection is good with no errors
if (mysqli_connect_errno()) {
		die ("Database connection failed: " .
				mysqli_connect_error() .
				" (" . mysqli_connect_errno() . ")"
		);
}
?>