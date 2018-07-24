<?php
    $decoded_db = file_get_contents('php://input');
    preg_match("/(\"(title)\":)\"(.[^\"]*)\"(,?)/", $decoded_db, $title_array);
    if($decoded_db) {
        // Перевести в PHP-массив
        $decoded_db = str_replace(":"," => ",$decoded_db);
        $decoded_db = preg_replace("/^\{/","",$decoded_db);
        $decoded_db = preg_replace("/\}$/","",$decoded_db);
        $decoded_db = preg_replace("/(,|\{|\[|\},|\],)/","$1\r\n",$decoded_db);
        $decoded_db = preg_replace("/\"(\}|\])/","\"\r\n$1",$decoded_db);
        $decoded_db = preg_replace("/(\}|\])(?!,)/","$1\r\n",$decoded_db);
        $decoded_db = preg_replace("/\{|\[/","array(",$decoded_db);
        $decoded_db = preg_replace("/\}|\]/",")",$decoded_db);
        // Индентировать
        $indent_lvl = 1;
        $indent_size = 4;
        $indent_char = " ";
        $split_db = preg_split("/\\r\\n/", $decoded_db);
        $indented_db = "";
        for($i = 0; $i < count($split_db)-1; $i++) {
            $str = $split_db[$i];
            if(strpos($str, 'array(') !== false) {
                $indentation = str_repeat($indent_char, $indent_size*$indent_lvl);
                $str = $indentation.$str."\r\n";
                $indent_lvl++;
            } else if(strpos($str, ')') !== false) {
                $indent_lvl--;
                $indentation = str_repeat($indent_char, $indent_size*$indent_lvl);
                $str = $indentation.$str."\r\n";
            } else {
                $indentation = str_repeat($indent_char, $indent_size*$indent_lvl);
                $str = $indentation.$str."\r\n";
            }
            $indented_db .= $str;
        }
        // Сохранить в файл
        if($title_array[3]) {
            $filename = $title_array[3]."-db.php";
            $saved_db = fopen($filename, "w");
        } else {
            $saved_db = fopen("testfile.php", "w");
        }
        fwrite($saved_db, "<?php"."\r\n");
        fwrite($saved_db, '$db = array('."\r\n");
        fwrite($saved_db, $indented_db);
        fwrite($saved_db, ');'."\r\n");
        fwrite($saved_db, "?>");
        fclose($saved_db);
        echo("БД построена.");
    }
?>