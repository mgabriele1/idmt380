<?php
    include_once 'db.php';

    $artist = mysqli_real_escape_string($connection, $_POST ['artist']);
    $image = mysqli_real_escape_string($connection, $_POST ['image']);

    $sql = "SELECT image FROM community WHERE image=$image;";
    $result = mysqli_query($connection, $sql);
    
            if (strpos($image, 'rgb') !== false) { // Check if $image is colored
                // Perform the insert
                $query = "INSERT INTO community (artist, image)
                VALUES ('$artist', '$image');";
            } else {
                // Throw error
                die("This artwork is not even colored...");
            }

    $result = mysqli_query($connection, $query);

    if ($result) {
        header("Location: ../index.php");
    } else {
        echo 'Failed to add artwork.';
    }
?>