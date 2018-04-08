<?php
    //处理登录
    include '../../public/include.php';

    $idnum = $_POST["idnum"];

    $password = $_POST["password"];

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    /*$idnum = '201509010106';
    $password = '201509010106';*/

    $data = $sql -> select('id,idnum,username,password','user',' where idnum = ? and password = ?','',array($idnum,md5($password)));

    $res2 = $sql -> select('student_name','class_s',' where student_xh = ?','',array($idnum));

    //开启session
    session_start();

    $_SESSION = $data;

    $_SESSION["name"] = $res2["student_name"];

    $_SESSION["isLogin"] = 1;

    if(!empty($data)){
      echo 1;
    }
?>