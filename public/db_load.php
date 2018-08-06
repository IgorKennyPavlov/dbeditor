<?php
$url = file_get_contents('php://input');
if ($url) {
    include_once($url);
    if(isset($db)) {
        $db = json_encode($db);
        echo $db;
    }
}
?>