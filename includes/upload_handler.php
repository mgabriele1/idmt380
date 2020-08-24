<?php
    include_once 'db.php';

    $artwork_name = mysqli_real_escape_string($connection, $_POST ['artwork_name']);
    $artist = mysqli_real_escape_string($connection, $_POST ['artist']);
    $image = mysqli_real_escape_string($connection, $_POST ['image']);

    $query = "INSERT INTO community (artwork_name, artist, image)
    VALUES ('$artwork_name', '$artist', '$image');";

    $result = mysqli_query($connection, $query);

    if ($result) {
        header("Location: ../index.php");
    } else {
        echo 'Failed to add artwork.';
    }
?>