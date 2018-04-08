<?php
    //处理输入的留言
    include '../../public/include.php';

    $name = $_POST["name"];

    $title = $_POST["title"];

    $email = $_POST["email"];

    $message = $_POST["message"];

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    session_start();

    $idnum = $_SESSION['idnum'];

    $data = $sql -> insert('name,idnum,title,email,content,addtime','msg','',array($name,$idnum,$title,$email,$message,time()));

    if($data){
      echo 1;
    }
?>