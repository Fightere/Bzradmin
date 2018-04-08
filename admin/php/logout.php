<?php
  include '../../public/include.php';

  //开启session
  session_start();
  //  清空数组
  $_SESSION = array();

  //删除cookie中的session_id
  if(isset($_COOKIE[session_name()])){
    setcookie(session_name(),'',time()-3600,'/');
  }

  //销毁所有session资源
  session_destroy();

  header('Location:../html/login.html');
?>