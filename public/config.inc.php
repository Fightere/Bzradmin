<?php
  //整个项目的配置文件

  //设置utf-8的字符集
  header("Content-Type:text/html;charset=utf-8");

  //显示所有报告但不报告注意
  error_reporting("E_ALL & ~E_NOTICE");

  //设置时区
  date_default_timezone_set("PRC");

  $waterimg = "php.png";  //作为水印图片

  const DSN = "mysql:host=localhost;dbname=fbzr";
  const DBUSER = "root";
  const DBPASS = "123456";