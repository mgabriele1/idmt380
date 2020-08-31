<?php
    $current_page = 'index';
    include_once 'includes/head.php';
?> <div class="modal" style="display: <?php if (!isset($_GET['upload'])) {echo 'none';} else {echo 'flex';} ?>"><div class="upload-success"><h1>Upload successful!</h1><p>Your artwork is now featured at the top.</p><button id="close-modal">Close</button></div></div><!--tab switching--><div class="tabs"><a href="index.php"><div class="tab <?php 
            if (isset($_GET['tab'])) {

            } else {
                echo "activetab";
            }
        ?> " id="tab1"><p>Coloring Pages</p></div></a><a href="index.php?tab=user"><div class="tab <?php 
            if (isset($_GET['tab'])) {
                echo "activetab";
            }
        ?> " id="tab2"><p>User Colored</p></div></a></div><div class="image-grid user-created"> <?php
            if (isset($_GET['tab'])) {
                $table = 'community';
                include_once 'includes/record_handler.php';
                // $the_echo = include_once 'graphics/.'$table'./'.$row['image'];
                $sql = "SELECT * FROM $table ORDER BY timestamp DESC LIMIT 100;";
            } else {
                $table = 'artwork';
                // $the_echo = "<img src='graphics/artwork/{$row['image']}' alt='{$row['artist']}'>";
                $sql = "SELECT * FROM $table;";
            }
            $result = mysqli_query($connection, $sql);
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {

                        echo "<a href='color.php?table={$table}&id={$row['id']}' class='thumbnails' title='Artwork by: {$row['artist']}'>";
                        if (isset($_GET['tab'])) {
                            include_once 'graphics/'.$table.'/'.$row['image'];
                        } else {
                            echo "<img src='graphics/artwork/{$row['image']}' alt='{$row['artist']}'>";
                        }
                        echo "</a>";

                }
            } else {
                echo "No artwork to show!";
            }
            ?> <a class="back-to-top" href="#top"><img class="b2t" src="graphics/btt.svg" alt="back to top"></a></div> <?php include_once 'include/footer.php'; ?>