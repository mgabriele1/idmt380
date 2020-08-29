<!DOCTYPE html><html lang="en"><!--HEAD--><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Coloring Book</title><link rel="stylesheet" href="dist/css/main.css" type="text/css"></head><!--BODY--><body><header id="top"><div id="logo"><a href="index.php"><img id="logo" src="graphics/logo.png"></a></div></header><div class="modal" style="display: <?php if (!isset($_GET['upload'])) {echo 'none';} else {echo 'flex';} ?>"><div class="upload-success"><h1>Upload successful!</h1><p>Your artwork is now featured at the top.</p><button id="close-modal">Close</button></div></div><!--tab switching--><div class="tabs"><a href="index.php"><button>Coloring Pages</button></a> <a href="index.php?tab=user"><button>User Colored</button></a></div><div class="image-grid user-created"> <?php
            include_once 'includes/db.php';
            if (isset($_GET['tab'])) {
                $sql = "SELECT * FROM community ORDER BY timestamp DESC LIMIT 100;";

                $result = mysqli_query($connection, $sql);

                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {

                            echo "<a href='color.php?table=community&id={$row['id']}' class='thumbnails' title='Painted by: {$row['artist']}'>";
                            echo "<img src='graphics/user/{$row['image']}' alt='{$row['artist']}'>";
                            echo "</a>";

                    }
                } else {
                    echo "No user created artwork to show!";
                }
            } else {
                $sql = "SELECT * FROM artwork;";
                $result = mysqli_query($connection, $sql);
    
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
    
                            echo "<a href='color.php?table=artwork&id={$row['id']}' class='thumbnails' title='Artwork by: {$row['artist']}'>";
                            echo "<img src='graphics/artwork/{$row['image']}' alt='{$row['artist']}'>";
                            echo "</a>";
    
                    }
                } else {
                    echo "No artwork to show!";
                }
            }
            ?> </div> <?php if (!isset($_GET['all-uc'])) { ?> <div class="image-grid"></div> <?php } ?> <footer><a class="back-to-top" href="#top"><img class="b2t" src="graphics/b2t.svg" alt="back to top"></a></footer></body><script defer="defer">window.onresize = () => {
            const show_all = document.querySelector('div#show-all');
            console.log(document.querySelector('.thumbnails svg:first-of-type').clientHeight);
            show_all.style.height = document.querySelector('.thumbnails svg:first-of-type').clientHeight + 'px';
        };
        document.querySelector('#close-modal').addEventListener('click', () => {
            document.querySelector('.modal').style.display = 'none';
        })</script></html>