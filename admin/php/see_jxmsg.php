<?php
    include '../../public/include.php';

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    //删除未精选留言中三天前的留言
    $sql -> delete1("msg","where islock = 1 and addtime < ". strtotime("-3 day"),"" );

    $total = $sql -> count("msg"," where islock = 0 ","");

    $num = 5;

    $arr[] = $num;

    $arr[] = ceil($total['total'] / $num);

    $start = $_GET['p']*$num;

    $stmt = $sql -> select1("id,name,title,email,content,islock,addtime","msg"," where islock = 0 "," order by id desc limit {$start},{$num} ");

    $stmt -> execute();

    while($data = $stmt -> fetch(PDO::FETCH_ASSOC)){
      $arr[] = array(
        'id' => $data['id'],
        'name' => $data['name'],
        'title' => $data['title'],
        'email' => $data['email'],
        'content' => $data['content'],
        'islock' => $data['islock'],
        'addtime' => date("Y-m-d H:i",$data['addtime'])
      );
    }

    echo json_encode($arr);