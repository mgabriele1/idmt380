<?php
    include_once 'includes/db.php';

    $id = $_GET['id'];

    $sql = "SELECT * FROM artwork WHERE id={$id};";

    $result = mysqli_query($connection, $sql);
    $resultCheck = mysqli_num_rows($result);
    if ($resultCheck > 0) {
        if ($row = mysqli_fetch_assoc($result)) {
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WIP</title>
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="scripts/main.js" defer></script>
</head>
<body>
    <main>
        <div class="aside">
            <div class="group commands">
                <div class="item command" data-command="undo"><img class="svg" src="graphics/undo.svg" alt="undo"></div>
                <div class="item command" data-command="download"><img class="svg" src="graphics/download.svg" alt="download"></div>
            </div>
            <div class="group shapes">
                <div class="item shape" data-shape="line"><img src="graphics/line.svg" alt="line"></div>
                <div class="item shape" data-shape="square"><img src="graphics/square.svg" alt="square"></div>
                <div class="item shape" data-shape="circle"><img src="graphics/circle.svg" alt="circle"></div>
                <div class="item shape" data-shape="triangle"><img src="graphics/triangle.svg" alt="triangle"></div>
            </div>
            <div class="group tools">
                <div class="item tool" data-tool="pencil"><img src="graphics/pencil.svg" alt="pencil"></div>
                <div class="item tool" data-tool="brush"><img src="graphics/brush.svg" alt="brush"></div>
                <div class="item tool" data-tool="fill"><img src="graphics/fill.svg" alt="fill"></div>
                <div class="item tool" data-tool="erase"><img src="graphics/erase.svg" alt="erase"></div>
            </div>
            <div class="group linewidths for-shapes">
                <div class="item line-width" data-linewidth="1px"></div>
                <div class="item line-width" data-linewidth="2px"></div>
            </div>
            <div class="group linewidths for-brush">
                <div class="item brush-size" data-brushsize="1rem"></div>
                <div class="item brush-size" data-brushsize="1.5rem"></div>
            </div>
        </div>
        <div class="main-area">
            <canvas id="canvas" width="600" height="776" style="background-image: url(graphics/artwork/<?php echo $row['image']; ?>);"></canvas>
        </div>
        <div class="aside">
            <div class="group swatches">
                <div class="item stack"></div>
                <input type="color" value="#000000" class="item" title="Color Picker">

                <div class="item swatch" data-swatch="rgb(186, 47, 255)"></div>
                <div class="item swatch" data-swatch="rgb(124, 0, 249)"></div>
                <div class="item swatch" data-swatch="rgb(66, 81, 254)"></div>
                <div class="item swatch" data-swatch="rgb(0, 255, 208)"></div>
                <div class="item swatch" data-swatch="rgb(145, 255, 89)"></div>
                <div class="item swatch" data-swatch="rgb(255, 218, 68)"></div>
                <div class="item swatch" data-swatch="rgb(255, 142, 49)"></div>
                <div class="item swatch" data-swatch="rgb(255, 102, 67)"></div>
                <div class="item swatch" data-swatch="rgb(255, 93, 93)"></div>
            </div>
        </div>
    </main>
</body>
<?php
            }
        }
    ?>
</html>