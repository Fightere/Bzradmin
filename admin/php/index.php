<?php
    //处理登录
    include '../../public/include.php';
    //开启session
    session_start();

    echo json_encode($_SESSION);