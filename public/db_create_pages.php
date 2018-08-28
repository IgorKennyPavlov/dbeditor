<?php
$input_data = json_decode(file_get_contents('php://input'), true);
$db_url = $input_data['db_url'];
$no_subfolders = $input_data['no_subfolders'];
$server_reply = '';
$server_reply .= "Получена ссылка: $db_url<br>";
// Составляется маршрут к расположению данных в БД
function create_path_array($subcat = null, $prod = null) {
    $path_components = '"category" => "'.$GLOBALS['DB_filename'].'"';
    if($subcat && $prod) {
        $path_components .= ',"subcat" => "'.$subcat.'","card" => "'.$prod.'"';
    } else {
        if($prod) {
            $path_components .= ',"card" => "'.$prod.'"';
        } elseif ($subcat) {
            $path_components .= ',"subcat" => "'.$subcat.'"';
        }
    }
    return 'array('.$path_components.')';
}

// Создаётся страница
function create_page($path) {
$content =
'<!DOCTYPE html>
<html lang="ru">
<head>
    <?php
        include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/main-content.php";
        $content = new MainContent('.$path.');
        $content->render_head_content();
    ?>
</head>
<body>
    <?php
        include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/header.php";
        $content->render_main_content();
        $content->render_carousel();
        include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/footer.php";
    ?>
</body>
</html>';
return $content;
}

if ($db_url) {
    $counter_categories = 0;
    $counter_subcats = 0;
    $counter_cards = 0;
    // Подключается БД
    include_once $db_url;
    // Если подключилась, то формируются страницы
    if(isset($db)) {
        $DB_folder = 'new_categories/';
        preg_match('/^(.*)\/([^.]*).(.*)$/', $db_url, $DB_subfolder);
        if($no_subfolders) {
            $DB_folder .= 'root';
        } else {
            $DB_folder .= $DB_subfolder[2];
        }
        preg_match('/^[^-]*/', $DB_subfolder[2], $get_DB_filename);
        $DB_filename = $get_DB_filename[0];
        $new_category_text = create_page(create_path_array());
        preg_match('/^(.*)\/(.*)$/', $db['link'], $new_category_link);
        $new_category_folder = $new_category_link[1];
        $new_category_name = $new_category_link[2];
        $path = $DB_folder.$new_category_folder;
        if(!is_dir($path)) {
            if (!mkdir($path, 0777, true)) {
                die('Не удалось создать папки для категории');
            }
        }
        $new_category_file = fopen($path.'/'.$new_category_name, 'w');
        fwrite($new_category_file, $new_category_text);
        fclose($new_category_file);
        $counter_categories++;
        if(isset($db['subcats'])) {
            foreach($db['subcats'] as $subcat_key => $subcat) {
                $new_subcat_text = create_page(create_path_array($subcat_key));
                preg_match('/^(.*)\/(.*)$/', $subcat['link'], $new_subcat_link);
                $new_subcat_folder = $new_subcat_link[1];
                $new_subcat_name = $new_subcat_link[2];
                $path = $DB_folder.$new_subcat_folder;
                if(!is_dir($path)) {
                    if (!mkdir($path, 0777, true)) {
                        die('Не удалось создать папки для подкатегории $subcat_key');
                    }
                }
                $new_subcat_file = fopen($path.'/'.$new_subcat_name, 'w');
                fwrite($new_subcat_file, $new_subcat_text);
                fclose($new_subcat_file);
                $counter_subcats++;
                if(isset($subcat['prods']) && count($subcat['prods']) > 0) {
                    foreach($subcat['prods'] as $prod_key => $prod) {
                        $new_card_text = create_page(create_path_array($subcat_key, $prod_key));
                        preg_match('/^(.*)\/(.*)$/', $prod['link'], $new_prod_link);
                        $new_prod_folder = $new_prod_link[1];
                        $new_prod_name = $new_prod_link[2];
                        $path = $DB_folder.$new_prod_folder;
                        if(!is_dir($path)) {
                            if (!mkdir($path, 0777, true)) {
                                die("Не удалось создать папки для товара $prod_key");
                            }
                        }
                        $new_card_file = fopen($path.'/'.$new_prod_name, 'w');
                        fwrite($new_card_file, $new_card_text);
                        fclose($new_card_file);
                        $counter_cards++;
                    }
                } else {
                    $server_reply .= '<br>';
                    $server_reply .= "Обратите внимание: в подкатегории <b>$subcat_key</b> отсутствуют товары.";
                    $server_reply .= '<br>';
                }
            }
        } else {
            if(isset($db['prods']) && count($db['prods']) > 0) {
                foreach($db['prods'] as $prod_key => $prod) {
                    $new_card_text = create_page(create_path_array(null, $prod_key));
                    preg_match('/^(.*)\/(.*)$/', $prod['link'], $new_prod_link);
                    $new_prod_folder = $new_prod_link[1];
                    $new_prod_name = $new_prod_link[2];
                    $path = $DB_folder.$new_prod_folder;
                    if(!is_dir($path)) {
                        if (!mkdir($path, 0777, true)) {
                            die("Не удалось создать папки для товара $prod_key");
                        }
                    }
                    $new_card_file = fopen($path.'/'.$new_prod_name, 'w');
                    fwrite($new_card_file, $new_card_text);
                    fclose($new_card_file);
                    $counter_cards++;
                }
            } else {
                $server_reply .= '<br>';
                $server_reply .= 'Обратите внимание: категория пуста.';
                $server_reply .= '<br>';
            }
        }
        $server_reply .= '<br>';
        $server_reply .= 'Страницы созданы.';
        $server_reply .= '<br>';
        $server_reply .= "Категорий: $counter_categories, подкатегорий: $counter_subcats, карточек: $counter_cards";
        $server_reply .= '<br>';
    }
    // Иначе сообщаем об ошибке подключения БД
    else {
        $server_reply .= '<br>';
        $server_reply .= 'Ошибка подключения БД. Проверьте путь к файлу БД.';
        $server_reply .= '<br>';
    }
} else {
    $server_reply .= '<br>';
    $server_reply .= 'Введите корректный путь к файлу БД.';
    $server_reply .= '<br>';
}

echo $server_reply;
?>