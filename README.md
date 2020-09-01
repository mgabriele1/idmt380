# Welcome to Doodle!
### How to initialize the app - Node required!

1. Using your Command Line, navigate to the directory of the app folder.
2. Initialize your local NPM by running this code: `npm i -y`.
3. Run the command `gulp` to begin using the required packages.

### How to setup the database using MAMP
1. Set the server root to the root of this project directory.
2. Open PHPMyAdmin in MAMP.
> Most likely -> http://localhost:8888/phpMyAdmin/index.php
3. Goto IMPORT tab and import `db-import.sql` located in the project root
No additional action required, navigate to your local server and test!
> Most likely -> http://localhost:8888/

# Workflow Features

## User created database and file handler

Part of this build is a record handler `includes/record-handler.php` & `includes/upload-handler`

These files do the following tasks for workflow

1. When a user uploads a Doodle, PHP checks if there are more than 100 records (this limit is editable), if so deletes the oldest record.
2. If a user created file in `graphics/community` exists without a matching record in the database, it will be deleted.
3. If a user tries to upload an uncolored artwork, they will get an error message that it needs to be colored.

## Gulp

This project uses Gulp to minify the CSS and JS, these files are sent to the `dist` folder.