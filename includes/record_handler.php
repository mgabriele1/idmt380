<?php
    // If records exceed 100, delete the oldest record

    $sql = "SELECT id FROM community";
    $result = mysqli_query($connection, $sql);

        if (mysqli_num_rows($result) > 100) {
            $sql = "SELECT id, image FROM community ORDER BY timestamp ASC LIMIT 1";
            $result = mysqli_query($connection, $sql);
            $row = mysqli_fetch_assoc($result);
            $delete_this_svg = $row['image'];
            unlink('../graphics/user/'.$delete_this_svg);
        } else {}

    // $sql = "SELECT image FROM community";
    // $result = mysqli_query($connection, $sql);

    //     if (mysqli_num_rows($result) > 0) {
    //         $sql = "SELECT image FROM community";
    //         $result = mysqli_query($connection, $sql);
    //         while ($row = mysqli_fetch_assoc($result)) {
    //             $fileName = $row['image'];
    //             if (file_exists('../graphics/user/'.$fileName)) {
    //                 echo $fileName.' DNE <br>';
    //             } else {
    //                 echo $fileName.' Exists <br>';
    //             }
    //         }
    //     } else {}

    // $dir = 'graphics/user';
    // $files = array_diff(scandir($dir), array('..', '.'));

    // var_dump($files);

    // foreach ($files as $file) {
    //     echo '<br><br><br>the file is '.$file;
    //     $sql = mysql_query("SELECT image FROM community WHERE image=\"{$file}\";");
    //     $result = mysqli_query($connection, $sql);
    //     if (mysqli_num_rows($result) <= 0) {
    //         echo '<br><br><br>cant find it';
    //         unlink("{$dir}/{$file}");
    //     }
    // }
?>