<?php
    $dir = 'graphics/community';

    // If user artwork records exceed 100, delete the oldest record

    $sql = "SELECT id FROM $table";
    $result = mysqli_query($connection, $sql);
        if (mysqli_num_rows($result) > 100) {
            $sql = "SELECT id, image FROM $table ORDER BY timestamp ASC LIMIT 1";
            $result = mysqli_query($connection, $sql);
            $row = mysqli_fetch_assoc($result);
            $delete_this_svg = $row['image'];
            unlink('../graphics/community/'.$delete_this_svg);
        } else {}

    // Delete all files without matching records

    $files = array_diff(scandir($dir), array('..', '.'));
    foreach ($files as $file) {
        $sql = "SELECT image FROM $table WHERE image='$file';";
        $result = mysqli_query($connection, $sql);
        if (mysqli_num_rows($result) == 0) {
            unlink("{$dir}/{$file}");
        }
    }
?>