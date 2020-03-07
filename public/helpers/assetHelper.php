<?php

function getAsset($name)
{
    $manifestPath = dirname(__DIR__) . "/dist/manifest.json";
    if (!file_exists($manifestPath)) {
        return false;
    }

    $manifest = file_get_contents($manifestPath);
    if (!$manifest) {
        return false;
    }

    $manifest = json_decode($manifest, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        return false;
    }

    if (!isset($manifest[$name]) || empty($manifest[$name])) {
        return false;
    }

    return $manifest[$name];
}

function javascriptHelper($name)
{
    $src = getAsset($name);

    if (!$src) {
        return;
    }

    print "<script type=\"text/javascript\" src=\"$src\"></script>";
    return;
}

function cssHelper($name)
{
    $src = getAsset($name);

    if (!$src) {
        return;
    }

    print "<link rel=\"stylesheet\" href=\"$src\" />";
    return;
}
