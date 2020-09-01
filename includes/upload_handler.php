<?php
    include_once 'db.php';
    $table = 'community';

    $artist = mysqli_real_escape_string($connection, $_POST ['artist']);
    $doodler = mysqli_real_escape_string($connection, $_POST ['doodler']);
    $svg = mysqli_real_escape_string($connection, $_POST ['image']);
    $fileName = uniqid(mt_rand()) . '.svg';
    file_put_contents('../graphics/'.$table.'/' . $fileName, stripslashes($svg));
    
    $sql = "SELECT image FROM $table WHERE image=$fileName;";
    $result = mysqli_query($connection, $sql);
    
            if (strpos($svg, 'rgb') !== false) { // Check if $image is colored
                // Perform the insert
                $query = "INSERT INTO $table (artist, doodler, image)
                VALUES ('$artist', '$doodler', '$fileName');";
            } else {
                // Throw error
                die('This artwork is not even colored...');
            }

    $result = mysqli_query($connection, $query);

    if ($result) {
        header('Location: ../index.php?tab=user&upload');
    } else {
        echo 'Failed to add artwork.';
    }
?>