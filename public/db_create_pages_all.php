<?php
$dir_url = file_get_contents('php://input');
$server_reply = "";
if(is_dir($dir_url)) {
    if($dir = opendir($dir_url)) {
        // $server_reply .= "Статус curl: ".(function_exists('curl_version') ? 'Enabled' : 'Disabled')."<br>";
        while (($file = readdir($dir)) !== false) {
            if ($file != "." && $file != "..") {
                $url = "$dir_url/$file";
                // $server_reply .= "Передан урл: $url<br>";
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "http://dbeditor/build/db_create_pages.php");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $url);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=utf-8'));
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