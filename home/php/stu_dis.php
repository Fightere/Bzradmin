<?php
  include '../../public/include.php';

  function ListData()
  {

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $total = $sql -> count("class_s","","");

    $num = 10;

    $arr[] = $num;

    $arr[] = ceil($total['total'] / $num);

    $start = $_GET['p']*$num;

    $stmt = $sql -> select1("id,student_name,student_classname,student_xh,student_duty","class_s",""," limit {$start},{$num}");

    $stmt -> execute();

    while($data = $stmt -> fetch(PDO::FETCH_ASSOC)){
      $arr[] = array(
        'id' => $data['id'],
        'student_name' => $data['student_name'],
        'student_classname' => $data['student_classname'],
        'student_xh' => $data['student_xh'],
        'student_duty' => $data['student_duty']
      );
    }

    echo json_encode($arr);
  }

  function SerData()
  {
    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $name = $_GET['name'];

    $xh = $_GET['xh'];

    $whr = array();

    if(!empty($name)){
      $whr[] = "student_name like '%{$name}%'";
    }

    if(!empty($xh)){
      $whr[] = "student_xh like '%{$xh}%'";
    }

    if(!empty($whr)){
      $where = " where ".implode(" and ",$whr);
    }else{
      $where = "";
    }

    $total = $sql -> count("class_s"," {$where} ","");

    $num = 10;

    $arr[] = $num;

    $arr[] = ceil($total['total'] / $num);

    $start = $_GET['p']*$num;

    $stmt = $sql -> select1("id,student_name,student_classname,student_xh,student_duty","class_s"," {$where} "," limit {$start},{$num}");

    $stmt -> execute();

    while($data = $stmt -> fetch(PDO::FETCH_ASSOC)){
      $arr[] = array(
        'id' => $data['id'],
        'student_name' => $data['student_name'],
        'student_classname' => $data['student_classname'],
        'student_xh' => $data['student_xh'],
        'student_duty' => $data['student_duty']
      );
    }

    echo json_encode($arr);
  }

  function RecordData()
  {
    $id = $_GET['dataid'];

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $data = $sql -> select("id,student_name,student_sex,student_date,
        student_tel,student_email,student_place,student_pic,student_nation,
        student_joindate,student_school,student_profess,student_classname,
        student_xh,student_duty,
        student_score1,student_score2,student_score3,student_score4,
        student_prize,student_crtiz,student_message","class_s","where id = ? ","",array($id) );

    echo json_encode($data);
  }

  $action = $_GET['action'];

  if($action == 'list'){
    ListData();
  }elseif($action == 'ser'){
    SerData();
  }elseif($action == 'record'){
    RecordData();
  }