<?php
    //处理输入的数据
    include '../../public/include.php';

    Flag0();

    function Flag0()
    {
        $sql = new DBMysql("mysql:host=localhost;dbname=fbzr","root","123456");

        $time = date("YmdHis");

        $id = $_POST["id"];

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

        $rs = $sql -> update("student_name,student_sex,student_date,
              student_tel,student_email,student_place,student_nation,
              student_joindate,student_school,student_profess,student_classname,student_duty,
              student_score1,student_mc1,student_score2,student_mc2,
              student_score3,student_mc3,student_score4,student_mc4,
              student_prize,student_crtiz,student_message","class_s","where id = ?",
              "",array($name,$sex,$date,$tel,$email,$place,$nation,$join_sch,
                $school,$profess,$sclass,$duty,$score_1,$mc_1,$score_2,$mc_2,
                $score_3,$mc_3,$score_4,$mc_4,$prize,$crtiz,$message,$id));

        if($rs){
            echo 1;
        }else{
            echo 0;
        }
    }
?>