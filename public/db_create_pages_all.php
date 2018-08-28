<?php
$input_data = json_decode(file_get_contents('php://input'), true);
$db_dir_url = $input_data['db_url'];
$server_reply = "";
if(is_dir($db_dir_url)) {
    if($dir = opendir($db_dir_url)) {
        // $server_reply .= "Статус curl: ".(function_exists('curl_version') ? 'Enabled' : 'Disabled')."<br>";
        while (($file = readdir($dir)) !== false) {
            if ($file != "." && $file != "..") {
                $db_url = "$db_dir_url/$file";
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "http://dbeditor/build/db_create_pages.php");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array("db_url" => $db_url, "no_subfolders" => $input_data['no_subfolders'])));
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8'));
                $server_reply .= curl_exec($ch);
                $server_reply .= "<br>";
                $server_reply .= curl_error($ch);
                $server_reply .= "<br>";
                curl_close($ch);
            }
        }
        $server_reply .= "Файлы страниц созданы";
        closedir($dir);
    } else {
        $server_reply .= "Директория не читается.";
    }
} else {
    $server_reply .= "Ссылка указывает не на директорию.";
}
echo $server_reply;
?>