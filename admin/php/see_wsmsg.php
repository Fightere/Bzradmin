<?php
  include '../../public/include.php';

  function ListData()
  {
    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $total = $sql -> count("msg"," where islock = 1 ","");

    $num = 5;

    $arr[] = $num;

    $arr[] = ceil($total['total'] / $num);

    $start = $_GET['p']*$num;

    $stmt = $sql -> select1("id,name,title,email,content,islock,addtime","msg"," where islock = 1 "," order by id desc limit {$start},{$num} ");

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
  }

  function ChangeData()
  {
    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $id = $_GET['id'];

    $arrid = explode(',', $id);

    $rs = 0;

    for($i = 0;$i < count($arrid);$i++){
      $rs = $sql -> update1( "islock = 0","msg","where id = ? ","",array($arrid[$i]));
    }

    if($rs){
      echo 1;
    }
  }

  $action = $_GET['action'];

  if($action == 'list'){
    ListData();
  }elseif ($action == 'change') {
    ChangeData();
  }