<?php
    include_once 'db.php';

    $artist = mysqli_real_escape_string($connection, $_POST ['artist']);
    $svg = mysqli_real_escape_string($connection, $_POST ['image']);
    $fileName = uniqid() . ".svg";
    fopen('../graphics/user/' . $fileName, $svg);

    $sql = "SELECT image FROM community WHERE image=$fileName;";
    $result = mysqli_query($connection, $sql);
    
            if (strpos($svg, 'rgb') !== false) { // Check if $image is colored
                // Perform the insert
                $query = "INSERT INTO community (artist, image)
                VALUES ('$artist', '$fileName');";
            } else {
                // Throw error
                die("This artwork is not even colored...");
            }

    $result = mysqli_query($connection, $query);

    if ($result) {
        header("Location: ../index.php?upload");
    } else {
        echo 'Failed to add artwork.';
    }
?>