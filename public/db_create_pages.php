<?php
$url = file_get_contents('php://input');
// Составляется маршрут к расположению данных в БД
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

// Создаётся страница категории/подкатегории
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

// Создаётся страница карточки товара
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

if ($url) {
    $counter_categories = 0;
    $counter_subcats = 0;
    $counter_cards = 0;
    // Подключается БД
    include_once $url;
    // Если подключилась, то формируются страницы
    if(isset($db)) {
        preg_match('/^(.*)\/([^.]*).(.*)$/', $url, $DB_subfolder);
        $DB_folder = "new_categories/".$DB_subfolder[2];
        $new_category_text = create_category_page(create_path_array());
        preg_match('/^(.*)\/(.*)$/', $db['link'], $new_category_link);
        $new_category_folder = $new_category_link[1];
        $new_category_name = $new_category_link[2];
        $path = $DB_folder.$new_category_folder;
        if(!is_dir($path)) {
            if (!mkdir($path, 0777, true)) {
                die("Не удалось создать папки для категории");
            }
        }
        $new_category_file = fopen($path."/".$new_category_name, "w");
        fwrite($new_category_file, $new_category_text);
        fclose($new_category_file);
        $counter_categories++;
        if(isset($db["subcats"])) {
            foreach($db["subcats"] as $subcat_key => $subcat) {
                $new_subcat_text = create_category_page(create_path_array($subcat_key));
                preg_match('/^(.*)\/(.*)$/', $subcat['link'], $new_subcat_link);
                $new_subcat_folder = $new_subcat_link[1];
                $new_subcat_name = $new_subcat_link[2];
                $path = $DB_folder.$new_subcat_folder;
                if(!is_dir($path)) {
                    if (!mkdir($path, 0777, true)) {
                        die("Не удалось создать папки для подкатегории $subcat_key");
                    }
                }
                $new_subcat_file = fopen($path."/".$new_subcat_name, "w");
                fwrite($new_subcat_file, $new_subcat_text);
                fclose($new_subcat_file);
                $counter_subcats++;
                if(isset($subcat["prods"])) {
                    foreach($subcat["prods"] as $prod_key => $prod) {
                        $new_card_text = create_prod_card(create_path_array($subcat_key, $prod_key));
                        preg_match('/^(.*)\/(.*)$/', $prod['link'], $new_prod_link);
                        $new_prod_folder = $new_prod_link[1];
                        $new_prod_name = $new_prod_link[2];
                        $path = $DB_folder.$new_prod_folder;
                        if(!is_dir($path)) {
                            if (!mkdir($path, 0777, true)) {
                                die("Не удалось создать папки для товара $prod_key");
                            }
                        }
                        $new_card_file = fopen($path."/".$new_prod_name, "w");
                        fwrite($new_card_file, $new_card_text);
                        fclose($new_card_file);
                        $counter_cards++;
                    }
                }
            }
        } else {
            foreach($db["prods"] as $prod_key => $prod) {
                $new_card_text = create_prod_card(create_path_array(null, $prod_key));
                preg_match('/^(.*)\/(.*)$/', $prod['link'], $new_prod_link);
                $new_prod_folder = $new_prod_link[1];
                $new_prod_name = $new_prod_link[2];
                $path = $DB_folder.$new_prod_folder;
                if(!is_dir($path)) {
                    if (!mkdir($path, 0777, true)) {
                        die("Не удалось создать папки для товара $prod_key");
                    }
                }
                $new_card_file = fopen($path."/".$new_prod_name, "w");
                fwrite($new_card_file, $new_card_text);
                fclose($new_card_file);
                $counter_cards++;
            }
        }
        echo "<br>";
        echo "Страницы созданы.";
        echo "<br>";
        echo "Категорий: $counter_categories, подкатегорий: $counter_subcats, карточек: $counter_cards";
        echo "<br>";
    }
    // Иначе сообщаем об ошибке подключения БД
    else {
        echo "<br>";
        echo "Ошибка подключения БД. Проверьте путь к файлу БД.";
        echo "<br>";
    }
} else {
    echo "<br>";
    echo "Введите корректный путь к файлу БД.";
    echo "<br>";
}
?>