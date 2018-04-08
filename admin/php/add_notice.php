<?php
    //处理输入的留言
    include '../../public/include.php';

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    session_start();

    $username = $_SESSION['username'];

    $upFilePath = "../upload/notice/";

    $time = date("YmdHis");

    $hzs = basename($_FILES['img']['name']);

    $hz = strstr($hzs,"." );

     $newname = 'fbzr_'.$time.'.jpg';

    rename($_FILES['img']['name'],$newname);

    $ok = move_uploaded_file($_FILES['img']['tmp_name'], $upFilePath.$newname);

    $arr = explode('.', $newname);

    $name = $_POST["name"];

    $intro = $_POST["intro"];

    $mess = $_POST["mess"];

    $imgname = $arr[0];
    $imghz = strrchr($newname, '.');

    $data = $sql -> insert(
    'username,no_name,no_pic,no_time,no_con','notice'
    ,'',array($username,$name,$imgname.'.jpg',time(),$intro));

    if($data){
        echo 1;
    }
?>