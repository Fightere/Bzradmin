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

  function DelData()
  {
    $id = $_GET['dataid'];

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $arr = $sql -> select( "student_pic","class_s","where id = ?","",array($id) );

    $pic = $arr['student_pic'];

    unlink("../upload/student/{$pic}");

    $rs = $sql -> delete("class_s"," where id = ?",";",array($id));

    if($rs){
      echo 1;
    }
  }

  function ModData()
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

function DelMore()
  {
    $id = $_GET['id'];

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $arrid = explode(',', $id);

    $arrpic = array();

    for($i = 0;$i < count($arrid);$i++){
      $data = $sql -> select( "student_pic","class_s","where id = ? ","",array($arrid[$i]));

      $arrpic[$i] = $data['student_pic'];
    }

    for($j = 0;$j < count($arrpic);$j++){
      unlink("../upload/student/{$arrpic[$j]}");
    }

    $rs = $sql -> delete1("class_s","where id in ({$id}) ","");

    if($rs){
      echo 1;
    }
  }

  $action = $_GET['action'];

  if($action == 'list'){
    ListData();
  }elseif($action == 'del'){
    DelData();
  }elseif($action == 'mod'){
    ModData();
  }elseif($action == 'delmore'){
    DelMore();
  }