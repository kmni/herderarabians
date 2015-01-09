<?php

$dir = scandir('./');

foreach ($dir as $file) {
	if (!is_dir($file) && $file != '.' && $file != '..' && $file{0} != '_' && substr($file, -4) != '.zip' && substr($file, -4) != '.ico') {
		echo '<a href="' . $file . '">' . $file . '</a><br />';
	}
}