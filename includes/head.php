<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doodle Book</title>
    <link rel="stylesheet" href="dist/css/main.css" type="text/css"/>
    <link rel="icon" href="graphics/icon.ico" type='image/x-icon'/>
    <!-- Scripts -->
    <?php if ($current_page == 'color') { ?>
        <script
            src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossorigin="anonymous" defer>
        </script>
        <script src="dist/scripts/main-min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5" defer></script>
        <script>var current_page = '<?php echo $current_page ?>';</script>
    <?php } ?>
</head>
<body <?php if ($current_page == 'color') { echo 'class="color-page"';} ?>>
    <header id="top">
        <div class="logo">
            <a href="index.php">
                <img class="logoindex" src="graphics/logo.png">
            </a>
        </div>
    </header>