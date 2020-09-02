<?php
    $current_page = 'color';
    include_once 'includes/head.php';

    $table = $_GET['table'];
    $id = $_GET['id'];

    $sql = "SELECT * FROM {$table} WHERE id={$id};";
    
    $result = mysqli_query($connection, $sql);
    $resultCheck = mysqli_num_rows($result);
    if ($resultCheck > 0) {
        if ($row = mysqli_fetch_assoc($result)) {
            $artist = $row['artist'];
?>
    <main id="colorpage">
        <div class="aside" id="top-aside">
            <div class="commands">
                <div class="credit">
                    <p><?php echo 'Illustrator: ' . $artist; ?></p>
                </div>
                <?php if ($table == 'community') { ?>
                    <div class="credit">
                        <p>
                            <?php echo 'Colorer: ' . $row['doodler']; ?>
                        </p>
                    </div>
                <?php } ?>
            </div>
        </div>
        <div class="main-area">
            <?php echo file_get_contents('graphics/'.$table.'/'.$row['image']); ?>
        </div>
        <div class="aside">
            <div class="canvas-buttons">
                <div class="command" title="Upload to 'User Colored'" data-command="upload"><img class="svg" src="graphics/upload.svg" alt="download"><p>Upload</p></div>
                <div class="command" title="Undo" data-command="undo"><img class="svg" src="graphics/undo.svg" alt="undo"><p>Undo</p></div>
                <div class="command" title="Download" data-command="download"><img class="svg" src="graphics/download.svg" alt="download"><p>Download</p></div>
            </div>
            <div id="swatch-out" class="swatches">
                <div id="swatch-in" class="swatches-inner">
                    <div class="color-picker move-up hide">
                    </div>
                    <div class="item stack"></div>
                    <div class="item picker-reflect hide"></div>
                    <div class="item swatch" data-swatch="#ffffff"></div>
                    <div class="item swatch" data-swatch="#000000"></div>
                    <div class="item swatch active" data-swatch="#7d00f9"></div>
                    <div class="item swatch" data-swatch="#4252fe"></div>
                    <div class="item swatch" data-swatch="#00ffd0"></div>
                    <div class="item swatch" data-swatch="#90ff59"></div>
                    <div class="item swatch" data-swatch="#ffda44"></div>
                    <div class="item swatch" data-swatch="#ff8e31"></div>
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
                <input type="text" name="artist" value="<?php echo $artist; ?>" hidden>
                <label for="name">Your name</label>
                <input required maxlength="15" type="text" name="doodler" placeholder="Enter Your Name">
                <div class="half">
                    <button name="submit" type="submit">Submit</button>
                    <button type="reset">Cancel</button>
                </div>
            </form>
        </div>
    </div>
<?php }} include_once 'includes/footer.php'; ?>