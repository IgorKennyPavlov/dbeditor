<?php
$decoded_db = file_get_contents('php://input');
if ($decoded_db) {
    preg_match("/file_name=\(([^)]*)\)/", $decoded_db, $title_array);
    $decoded_db = str_replace($title_array[0], "", $decoded_db);
    // Перевести в PHP-массив
    $decoded_db = str_replace(":", " => ", $decoded_db);
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
        preg_match("/(?<!\\\\)\)/", $str, $end_of_array);
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
    mkdir($DB_subfolder);
    $DB_postfix = "-db.php";
    if ($title_array[1]) {
        $category = $title_array[1];
    } else {
        $category = "default_name";
    }
    $DB_name .= $category.$DB_postfix;
    $saved_db = fopen($DB_subfolder . "/" . $DB_name, "w");
    fwrite($saved_db, "<?php\r\n");
    fwrite($saved_db, '$db = array('."\r\n");
    fwrite($saved_db, $indented_db);
    fwrite($saved_db, ");\r\n");
    fwrite($saved_db, '?>');
    fclose($saved_db);
    echo "БД построена.";
    echo "<br>";

    // Сборка страниц по шаблону, подключение БД
    function create_path_array($subcat = null, $prod = null) {
        $path_components = '"category" => "'.$GLOBALS['category'].'"';
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

    function create_category_page($path) {
        $content =
        '<!DOCTYPE html>
        <html lang="ru">
            <head>
            <?php
            include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/main-content.php";
                $content = new MainContent('.$path.');
                $content->create_meta_tags();
                include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/head-content.php";
                ?>
            </head>
            <body id="body-category">
            <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/formExpress.php" ?>
            <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/modal_success.php" ?>
            <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/header.php" ?>
            <div class="background-wrapper">
                <div id="section-product" class="container">
                    <?php $content->render(); ?>
                    <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/our-partners.php" ?>
    
                    <div class="category-description category-hr">
                    </div>
                    
                    <div class="product-slider">
                        <h2 class="center slider-title">Популярные товары</h2>
                        <?php
                            include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/carousel.php";
                            include_once $_SERVER[\'DOCUMENT_ROOT\']."/popular_products/pp-work_stations.php";
                            $carousel = new Carousel($carouselProds);
                            $carousel->render();
                        ?>
                        </div>
                </div>
            </div>
            <?php include_once  $_SERVER[\'DOCUMENT_ROOT\']."/php-components/pre-footer.php" ?>
            <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/footer.php" ?>
            <script>
                $("input.express_submit").on("click", (e) => postData(e, "/formExpressScript.php"));
                </script>
            </body>
            </html>';
        
            return $content;
    }

    function create_prod_card($path) {
        $content =
            '<!DOCTYPE html>
            <html lang="ru">
            <head>
                <?php
                    include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/main-content.php";
                    $content = new MainContent('.$path.');
                    $content->create_meta_tags();
                    ?>
                <link href="https://fonts.googleapis.com/css?family=Cuprum:400,700&amp;subset=cyrillic" rel="stylesheet">
                <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/head-content.php" ?>
            </head>
            <body>
            <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/form.php" ?>
            <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/formExpress.php" ?>
            <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/modal_success.php" ?>
            <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/header.php" ?>
                <div id="section-product" class="container">
                <?php $content->render(); ?>
                <div class="category-description">
                    <h2 class="center slider-title">Популярные товары</h2>
                    </div>
                <div class="category-products">
                <?php
                    include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/carousel.php";
                    include_once $_SERVER[\'DOCUMENT_ROOT\']."/popular_products/pp-work_stations.php";
                    $carousel = new Carousel($carouselProds);
                    $carousel->render();
                ?>
                </div>
                </div>
                <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/pre-footer.php" ?>
                <?php include_once $_SERVER[\'DOCUMENT_ROOT\']."/php-components/footer.php" ?>
                <script>
                    $("input.express_submit").on("click", (e) => postData(e, "/formExpressScript.php"));
                    $("input.full-form_submit").on("click", (e) => postData(e, "/formFullOrderScript.php"));
                    $("input.oneclick-form_submit").on("click", (e) => {if($(\'#oneclick_tel\').val()) {postData(e, "/formOneClickScript.php")}});
                    </script>
            </body>
            </html>';
            
        return $content;
    }

    include_once $DB_subfolder . "/" . $DB_name;
    if(isset($db)) {
        preg_match('/[^\/]+$/', $db['link'], $new_category_file_name);
        $new_category_text = create_category_page(create_path_array());
        $new_category_folder_name = "category-".$category;
        $path = $DB_subfolder."/".$new_category_folder_name;
        mkdir($path);
        $new_category_file = fopen($path."/".$new_category_file_name[0], "w");
        fwrite($new_category_file, $new_category_text);
        fclose($new_category_file);
        if(isset($db["subcats"])) {
            foreach($db["subcats"] as $subcat_key => $subcat) {
                $new_subcat_text = create_category_page(create_path_array($subcat_key));
                $new_subcat_folder_name = "subcat-".$subcat_key;
                $path = $DB_subfolder."/".$new_category_folder_name."/".$new_subcat_folder_name;
                mkdir($path);
                preg_match('/[^\/]+$/', $subcat['link'], $new_subcat_file_name);
                $new_subcat_file = fopen($path."/".$new_subcat_file_name[0], "w");
                fwrite($new_subcat_file, $new_subcat_text);
                fclose($new_subcat_file);
                if(isset($subcat["prods"])) {
                    foreach($subcat["prods"] as $prod_key => $prod) {
                        $new_card_text = create_prod_card(create_path_array($subcat_key, $prod_key));
                        preg_match('/[^\/]+$/', $prod['link'], $new_card_file_name);
                        $new_card_file = fopen($DB_subfolder."/".$new_category_folder_name."/".$new_subcat_folder_name."/".$new_card_file_name[0], "w");
                        fwrite($new_card_file, $new_card_text);
                        fclose($new_card_file);
                    }
                }
            }
        } else {
            foreach($db["prods"] as $prod_key => $prod) {
                $new_card_text = create_prod_card(create_path_array(null, $prod_key));
                preg_match('/[^\/]+$/', $prod['link'], $new_card_file_name);
                $new_card_file = fopen($DB_subfolder."/".$new_category_folder_name."/".$new_card_file_name[0], "w");
                fwrite($new_card_file, $new_card_text);
                fclose($new_card_file);
            }
        }
    }
    echo "Файлы страниц созданы.";
    echo "<br>";
}
?>