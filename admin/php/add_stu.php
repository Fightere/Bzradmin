<?php
    //处理输入的数据
    include '../../public/include.php';

    $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

    $upFilePath = "../upload/student/";

    $time = date("YmdHis");

    $hzs = basename($_FILES['img']['name']);

    $hz = strstr($hzs,"." );

    $newname = 'fbzr_'.$time.'.jpg';

    rename($_FILES['img']['name'],$newname);

    $ok = move_uploaded_file($_FILES['img']['tmp_name'], $upFilePath.$newname);

    $arr = explode('.', $newname);

    $name = $_POST["name"];

    $sex = $_POST["sex"];

    $date = $_POST["date"];

    $tel = $_POST["tel"];

    $email = $_POST["email"];

    $place = $_POST["place"];

    $nation = $_POST["nation"];

    $join_sch = $_POST["join_sch"];

    $school = $_POST["school"];

    $profess = $_POST["profess"];

    $sclass = $_POST["sclass"];

    $xh = $_POST["xh"];

    $rs = $sql -> find("student_xh","class_s"," where student_xh = ?",array($xh));

    if($rs){
        echo 2;
        exit();
    }

    $duty = $_POST["duty"];

    $score_1 = $_POST["score_1"];

    $mc_1 = $_POST["mc_1"];

    $score_2 = $_POST["score_2"];

    $mc_2 = $_POST["mc_2"];

    $score_3 = $_POST["score_3"];

    $mc_3 = $_POST["mc_3"];

    $score_4 = $_POST["score_4"];

    $mc_4 = $_POST["mc_4"];

    $prize = $_POST["prize"];

    $crtiz = $_POST["crtiz"];

    $message = $_POST["message"];

    $mess = $_POST["mess"];

    $imgname = $arr[0];
    $imghz = strrchr($newname, '.');

    $data = $sql -> insert(
        'student_name,student_sex,student_date,
          student_tel,student_email,student_place,student_pic,student_nation,
          student_joindate,student_school,student_profess,student_classname,student_xh,student_duty,
          student_score1,student_mc1,student_score2,student_mc2,
          student_score3,student_mc3,student_score4,student_mc4,
          student_prize,student_crtiz,student_message','class_s'
          ,'',array(
            $name,$sex,$date,$tel,$email,$place,$imgname.'.jpg',$nation,$join_sch,
            $school,$profess,$sclass,$xh,$duty,$score_1,$mc_1,$score_2,$mc_2,
            $score_3,$mc_3,$score_4,$mc_4,$prize,$crtiz,$message
            ));

    if(!empty($data)){
      echo 1;
    }else{
      echo 0;
    }
?>