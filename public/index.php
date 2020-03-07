<?php
require_once "./helpers/assetHelper.php"; ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Site Name</title>
    <?php cssHelper("common.styles.bundle.css"); ?>
</head>

<body class="antialiased">
    <div class="min-h-screen flex items-center justify-center relative flex-col text-6xl text-blue-200 bg-blue-900 font-thin tracking-widest">
        Static boilerplate
    </div>
    <!-- SCRIPTS -->
    <?php javascriptHelper("common.init.bundle.js"); ?>
    <?php javascriptHelper("pages.index.bundle.js"); ?>
</body>

</html>