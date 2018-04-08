<?php
  include '../../public/include.php';

  function ListData()
  {
    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $total = $sql -> count("notice","","");

    $num = 6;

    $arr[] = $num;

    $arr[] = ceil($total['total'] / $num);

    $start = $_GET['p']*$num;

    $stmt = $sql -> select1("id,username,no_name,no_pic,no_time,no_con","notice","order by id desc"," limit {$start},{$num} ");

    $stmt -> execute();

    while($data = $stmt -> fetch(PDO::FETCH_ASSOC)){
      $arr[] = array(
        'id' => $data['id'],
        'username' => $data['username'],
        'no_name' => $data['no_name'],
        'no_pic' => $data['no_pic'],
        'no_time' => date("Y-m-d H:i",$data['no_time']),
        'no_con' => $data['no_con']
      );
    }

    echo json_encode($arr);
  }

  function DispData()
  {
    $id = $_GET['dataid'];

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $data = $sql -> select("id,username,no_name,no_pic,no_time,no_con","notice","where id = ? ","",array($id) );

    echo json_encode($data);
  }

  $action = $_GET['action'];

  if($action == 'list'){
    ListData();
  }elseif ($action == 'disp') {
    DispData();
  }