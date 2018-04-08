<?php

  header("Content-Type:text/html;charset=utf-8");

  //显示所有报告但不报告注意
  error_reporting("E_ALL & ~E_NOTICE");

  //设置时区
  date_default_timezone_set("PRC");

  $waterimg = "php.png";  //作为水印图片

  const DSN = "mysql:host=localhost;dbname=imooc";
  const DBUSER = "root";
  const DBPASS = "123456";

  try {
    $pdo = new PDO(DSN, DBUSER, DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  }catch(PDOException $e) {
    echo "ERROR: ".$e->getMessage();
  }

  $stmt = $pdo -> prepare("select * from user");
  $stmt -> execute();

  $data = $stmt -> fetch(PDO::FETCH_ASSOC);

  echo json_encode($data);