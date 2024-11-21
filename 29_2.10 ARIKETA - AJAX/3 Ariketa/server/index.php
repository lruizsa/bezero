<?php

$fichero = 'peliculas.xml';

//$fichero =  $_GET["fichero"];

if (file_exists($fichero)) {
	$output = file_get_contents($fichero);
	header('Content-Type: application/xml');
	print ($output);
}
else {
	print("No existe el fichero");
}
?>

