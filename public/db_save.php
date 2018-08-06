<?php
$received_db = file_get_contents('php://input');
// var_dump($received_db);
// echo "<br>";
if ($received_db) {
    preg_match("/file_name=\(([^)]*)\)/", $received_db, $title_array);
    $received_db = str_replace($title_array[0], "", $received_db);
    // Перевести в PHP-массив
    // $decoded_db = json_decode($received_db, true);
    $decoded_db = preg_replace("/\"\s*:\s*(\"|\{|\[)/", "\" => $1", $received_db);
    $decoded_db = preg_replace("/^\{/", "", $decoded_db);
    $decoded_db = preg_replace("/\}$/", "", $decoded_db);
    $decoded_db = preg_replace("/((?<=\"),|\{|\[|\},|\],)/", "$1\r\n", $decoded_db);
    $decoded_db = preg_replace("/\"(\}|\])/", "\"\r\n$1", $decoded_db);
    $decoded_db = preg_replace("/(\}|\])(?!,)/", "$1\r\n", $decoded_db);
    $decoded_db = preg_replace("/\{|\[/", "array(", $decoded_db);
    $decoded_db = preg_replace("/\}|\]/", ")", $decoded_db);
    // Индентировать
    $indent_lvl = 1;
    $indent_size = 4;
    $indent_char = " ";
    $split_db = preg_split("/\\r\\n/", $decoded_db);
    $indented_db = "";
    for ($i = 0; $i < count($split_db) - 1; $i++) {
        $str = $split_db[$i];
        preg_match("/(?<=^)\)/", $str, $end_of_array);
        if (strpos($str, 'array(') !== false) {
            $indentation = str_repeat($indent_char, $indent_size * $indent_lvl);
            $str = $indentation . $str . "\r\n";
            $indent_lvl++;
        } else if ($end_of_array[0]) {
            $indent_lvl--;
            $indentation = str_repeat($indent_char, $indent_size * $indent_lvl);
            $str = $indentation . $str . "\r\n";
        } else {
            $indentation = str_repeat($indent_char, $indent_size * $indent_lvl);
            $str = $indentation . $str . "\r\n";
        }
        $indented_db .= $str;
    }

    // Сохранить БД в файл
    $DB_subfolder = "new_categories";
    if(!is_dir($DB_subfolder)) {
        if (!mkdir($DB_subfolder, 0777, true)) {
            die("Не удалось создать папку для готовых файлов: $DB_subfolder");
        }
    }
    if ($title_array[1]) {
        $DB_name = $title_array[1];
    } else {
        $DB_name = "default_name-db.php";
    }
    $saved_db = fopen($DB_subfolder . "/" . $DB_name, "w");
    fwrite($saved_db, "<?php\r\n");
    fwrite($saved_db, '$db = array('."\r\n");
    fwrite($saved_db, $indented_db);
    fwrite($saved_db, ");\r\n");
    fwrite($saved_db, '?>');
    fclose($saved_db);
    echo $DB_subfolder . "/" . $DB_name;
}
?>