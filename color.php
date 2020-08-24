<?php
    include_once 'includes/db.php';

    $table = $_GET['table'];
    $id = $_GET['id'];

    $sql = "SELECT * FROM {$table} WHERE id={$id};";

    $result = mysqli_query($connection, $sql);
    $resultCheck = mysqli_num_rows($result);
    if ($resultCheck > 0) {
        if ($row = mysqli_fetch_assoc($result)) {
?>

<!DOCTYPE html>
<html lang="en" class="coloring-page">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WIP</title>
        <link rel="stylesheet" href="dist/css/normalize.css">
        <link rel="stylesheet" href="dist/css/main.css">
        <script
            src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossorigin="anonymous">
        </script>
        <script src="dist/scripts/main-min.js" defer></script>
</head>
<body class="coloring-page">
<div id="logo"> <a href="index.php"><img id="logo" src="graphics/logo.png"> </a></div>
    <main id="colorpage">
        <div class="aside" id="top-aside">
            <div class="group commands">
                <div class="item command" data-command="undo"><img class="svg" src="graphics/undo.svg" alt="undo"></div>
                <div class="item command" data-command="download"><img class="svg" src="graphics/download.svg" alt="download"></div>
                <div class="item command" data-command="upload"><img class="svg" src="graphics/download.svg" alt="download"></div>
            </div>
            <div class="group">
                <div class="credit">
                    <p>Artwork by: <?php echo $row['artist'] ?></p>
                </div>
            </div>
        </div>
        <div class="main-area">
            <?php   
                    if ($table == 'artwork') {include_once 'graphics/artwork/'.$row['image'];} else {echo $row['image'];} ?>
        </div>
        <div class="aside">
            <div class="group swatches">
                <div class="item stack"></div>
                <input type="color" class="item" title="Color Picker">

                <div class="item swatch active" data-swatch="#ba2fff"></div>
                <div class="item swatch" data-swatch="#7d00f9"></div>
                <div class="item swatch" data-swatch="#4252fe"></div>
                <div class="item swatch" data-swatch="#00ffd0"></div>
                <div class="item swatch" data-swatch="#90ff59"></div>
                <div class="item swatch" data-swatch="#ffda44"></div>
                <div class="item swatch" data-swatch="#ff8e31"></div>
                <div class="item swatch" data-swatch="#ff6543"></div>
                <div class="item swatch" data-swatch="#ff5d5d"></div>
            </div>
        </div>
        </div>
    </main>
    <div class="modal upload-modal closed">
        <div class="upload-screen">
            <p><strong>Upload your artwork to the web</strong></p>
            <div class="upload-preview"></div>
            <form id="upload-form" action="includes/upload_handler.php" method="POST">
                <input type="text" name="image" id="artwork-html" hidden>
                <label for="name">Your name</label>
                <input required maxlength="15" type="text" name="artist" placeholder="Alex P.">
                <div class="half">
                    <button name="submit" type="submit">Submit</button>
                    <button type="reset">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>

<?php
        }
    }
?>