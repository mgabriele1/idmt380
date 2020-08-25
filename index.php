<!DOCTYPE html>
<html lang="en">

<!--HEAD-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coloring Book</title>
    <link rel="stylesheet" href="dist/css/main.css" type="text/css"/>
</head>

<!--BODY-->
<body>
    <header id="top">
    <div id="logo"><a href="index.php"><img id="logo" src="graphics/logo.png"></a></div>
    </header>
    <h1>User Created</h1>
    <div class="image-grid user-created">
        <?php
            include_once 'includes/db.php';
            if (!isset($_GET['all-uc'])) {$sql_limit = 3;} else {$sql_limit = 100;}
            $sql = "SELECT * FROM community ORDER BY timestamp DESC LIMIT {$sql_limit};";
            $result = mysqli_query($connection, $sql);

            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {

                        echo "<a href='color.php?table=community&id={$row['id']}' class='thumbnails'>";
                        echo $row['image'];
                        echo "</a>";

                }
            } else {
                echo "No user created artwork to show!";
            }
        ?>
            <a href="index.php?all-uc" class="thumbnails">
                <div id="show-all">View All User Created</div>
            </a>
    </div>
    <?php if (!isset($_GET['all-uc'])) { ?>
    <h1>Templates</h1>
    <div class="image-grid">
        <?php
                $sql = "SELECT * FROM artwork;";
                $result = mysqli_query($connection, $sql);
    
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
    
                            echo "<a href='color.php?table=artwork&id={$row['id']}' class='thumbnails'>";
                            echo "<img src='graphics/artwork/{$row['image']}' alt='{$row['artist']}'>";
                            echo "</a>";
    
                    }
                } else {
                    echo "No artwork to show!";
                }
        ?>
    </div>
    <?php } ?>
    <footer>
        <a class="back-to-top" href="#top">
            <img class="b2t" src="graphics/b2t.svg" alt="back to top">
        </a>
    </footer>
</body>
    <script defer>
        window.onresize = () => {
            const show_all = document.querySelector('div#show-all');
            console.log(document.querySelector('.thumbnails svg:first-of-type').clientHeight);
            show_all.style.height = document.querySelector('.thumbnails svg:first-of-type').clientHeight + 'px';
        };
    </script>
</html>