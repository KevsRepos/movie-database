<?php
session_start();
require_once __DIR__.'/ini/lib/mainFunctions.php';

if(isLoggedIn()) {
  endScript(false, 'Hierfür musst du eingeloggt sein.');
}

validateJson('category');

$getMovie = "SELECT category, categoryId FROM categories WHERE category=? LIMIT 1";

if(query($getMovie, [$json['name']], "Fehler")) {
  endScript()
}

$insertMovie = "INSERT INTO movies (category) VALUES (?)";

query($insertMovie, [$json['name'], $json['releaseDate'], $json['length'], $json['category'], $json['description']], "Leider ist ein Fehler beim hinzufügen des Films aufgetreten.");
    
endScript(true, "Film wurde hinzugefügt.");
?>