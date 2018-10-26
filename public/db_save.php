<?php
$received_db = file_get_contents('php://input');
if ($received_db) {
    preg_match("/file_name=\((([^.]*)\.php)\)/", $received_db, $title_array);
    if ($title_array) {
        $received_db = str_replace($title_array[0], "", $received_db);
        $decoded_db = json_decode($received_db, true);
        $DB_subfolder = $title_array[2];
        $DB_folder = "new_categories/" . $DB_subfolder . "/db/";
        if (!is_dir($DB_folder)) {
            if (!mkdir($DB_folder, 0777, true)) {
                die("Не удалось создать папку для готовых файлов: $DB_folder");
            }
        }
        if ($title_array[1]) {
            $DB_name = $title_array[1];
        } else {
            $DB_name = "default_name-db.php";
        }
        $saved_db = fopen($DB_folder . $DB_name, "w");
        fwrite($saved_db, "<?php\r\n");
        fwrite($saved_db, '$db = ' . var_export($decoded_db, true));
        fwrite($saved_db, '?>');
        fclose($saved_db);
        echo 'Файл БД сохранён по адресу:';
        echo '<br>';
        echo $DB_folder . $DB_name;
    }
}
?>