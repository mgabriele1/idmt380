<?php
    include_once 'includes/db.php';

    $table = $_GET['table'];
    $id = $_GET['id'];

    if ($table == 'artwork') {$credit_word = 'Doodle';} else {$credit_word = 'Painted';}

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
        <title>Doodle Coloring Book</title>
        <link rel="stylesheet" href="dist/css/main.css">
        <link rel="icon" href="graphics/icon.ico" type='image/x-icon'/>
        <link rel="stylesheet" href="https://use.typekit.net/ssy0mlu.css">
        <script
            src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossorigin="anonymous">
        </script>
        <script src="dist/scripts/main-min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>
</head>
<body class="coloring-page">
    <div id="logo">
        <a href="index.php">
            <img class="logocoloring" src="graphics/logo.png">
        </a>
    </div>
    <main id="colorpage">
        <div class="aside" id="top-aside">
            <div class="commands">
            <div class="canvas-buttons">
                <div class="command" title="Undo" data-command="undo"><img class="svg" src="graphics/undo.svg" alt="undo"></div>
                <div class="command" title="Download" data-command="download"><img class="svg" src="graphics/download.svg" alt="download"></div>
                <div class="command" title="Upload to 'User Colored'" data-command="upload"><img class="svg" src="graphics/upload.svg" alt="download"></div>
            </div>
            <div class="credit">
                <p><?php if ($table == 'artwork') {echo 'Illustration';} else {echo 'Doodler';} ?>: <?php echo $row['artist']; ?></p>
            </div>
            </div>
        </div>
        <div class="main-area">
            <?php include_once 'graphics/'.$table.'/'.$row['image']; ?>
        </div>
        <div class="aside">
            <div class="swatches">
                <div class="swatches-inner">
                    <div class="colorPicker move-up">
                        <div class="picker-close">
                            <div class="x"></div>
                            <div class="x"></div>
                        </div>
                    </div>
                    <div class="item stack"></div>
                    <div class="item picker-reflect"></div>
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
        </div>
    </main>
    <div class="modal upload-modal closed">
        <div class="upload-screen">
            <p><strong>Upload your artwork to the web</strong></p>
            <div class="upload-preview"></div>
            <form id="upload-form" action="includes/upload_handler.php" method="POST">
                <input type="text" name="image" id="artwork-html" hidden>
                <label for="name">Your name</label>
                <input required maxlength="15" type="text" name="artist" placeholder="Enter Your Name">
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