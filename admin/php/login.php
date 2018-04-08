<?php
  //处理登录
    include '../../public/include.php';

    $username = $_POST["username"];

    $password = $_POST["password"];

    //echo $password;

    /*$username = "admin";

    $password = "admin555";*/

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $data = $sql -> select('username','admin',' where username = ? and password = ?','',array($username,md5($password)) );

    //var_dump($data);

    //开启session
    session_start();

    $_SESSION = $data;

    $_SESSION["isLogin"] =1;

    //var_dump($_SESSION);

    //echo empty($data);

    if(!empty($data)){
      echo 1;
    }else{
      echo 0;
    }
?>