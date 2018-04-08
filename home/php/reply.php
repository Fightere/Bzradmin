<?php

  include '../../public/include.php';

  $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

  $uid = $_GET['dataid'];

  $reply = $_GET['areply'];

  $time = time();

  session_start();

  $rs = $sql -> insert("uid,name,content,addtime","reply","",array($uid,$_SESSION['idnum'] ,$reply,$time));

  if($rs){
    echo 1;
  }