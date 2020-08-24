<!DOCTYPE html>
<html lang="en">

<!--HEAD-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coloring Book</title>
    <link rel="stylesheet" href="dist/css/normalize.css" type="text/css"/>
    <link rel="stylesheet" href="dist/css/main.css" type="text/css"/>
</head>

<!--BODY-->
<body>
    <header id="top">
        <img src="graphics/logo.png" id="logo">
    </header>
    <h1>User Created</h1>
    <div class="image-grid user-created">
        <?php
            include_once 'includes/db.php';
            $sql = "SELECT * FROM community ORDER BY timestamp DESC LIMIT 4;";
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
    </div>
    <h1>Templates</h1>
    <div class="image-grid">
        <?php
            include_once 'includes/db.php';
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
    <footer>
        <a class="back-to-top" href="#top">
            <img class="b2t" src="graphics/b2t.svg" alt="back to top">
        </a>
    </footer>
</body>
</html>