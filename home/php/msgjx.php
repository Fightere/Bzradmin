<?php
    include '../../public/include.php';

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    session_start();

    $idnum = $_SESSION['idnum'];

    $total = $sql -> count("msg"," where islock = 0 and idnum = ".$idnum ,"");

    $num = 5;

    $arr[] = $num;

    $arr[] = ceil($total['total'] / $num);

    $start = $_GET['p']*$num;

    $stmt = $sql -> select1("id,idnum,name,title,email,content,islock,addtime","msg"," where islock = 0 and idnum = ".$idnum." and addtime > ". strtotime("-10 day")," order by id desc limit {$start},{$num} ");

    $stmt -> execute();

    while($data = $stmt -> fetch(PDO::FETCH_ASSOC)){
      $arr[] = array(
        'id' => $data['id'],
        'idnum' => $data['idnum'],
        'name' => $data['name'],
        'title' => $data['title'],
        'email' => $data['email'],
        'content' => $data['content'],
        'islock' => $data['islock'],
        'addtime' => date("Y-m-d H:i",$data['addtime'])
      );
    }

    $arr[] = '|';

    $stmt2 = $sql -> select1("id,uid,name,content,addtime","reply","","");

    $stmt2 -> execute();

    while($data2 = $stmt2 -> fetch(PDO::FETCH_ASSOC)){
        $arr[] = array(
            'rid' => $data2['id'],
            'ruid' => $data2['uid'],
            'rname' => $data2['name'],
            'rcontent' => $data2['content'],
            'raddtime' => date("Y-m-d H:i",$data2['addtime'])
        );
    }

    echo json_encode($arr);