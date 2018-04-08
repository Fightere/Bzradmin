<?php
    /**
    *  数据库类，负责对于数据的增删改查，继承了PDO类
    */
    class DBMysql extends PDO{

      private $pdo;                           //用于创建pdo对象
      private $table = '';                    //表名
      private $dataname = '';                 //查找的数据名
      private $where = '';                    //where数据
      private $other = '';                    //用于处理其他的数据库语言
      private $ycl = array();                 //用于传递值代替?中的东西

/**
      *数据库中的find只查找输出的数据是否成功
      *@param String $database 数据名
      *@param String $table    表名
      *@param String $where    where参数
      *@param Array  $ycl      预处理元素
      */
      public function find($dataname,$table,$where,$ycl){

        $pdo = new PDO("mysql:host=localhost;dbname=fbzr","root","123456");

        $data = explode(",", $dataname);        //将输入的$dataname字符串转换成数组
        $num = count($data);                    //获取数组长度

        //echo "select {$dataname} from {$table} where {$where} {$other}";

        $stmt = $pdo -> prepare("select {$dataname} from {$table} {$where} ");
        $stmt -> execute($ycl);

        $data = $stmt -> fetch(PDO::FETCH_NUM);

        if(!empty($data)){
          return true;
        }else{
          return false;
        }
      }

      /**
      *数据库中的查
      *@param String $database 数据名
      *@param String $table    表名
      *@param String $where    where参数
      *@param String $other    其他的处理元素
      *@param Array  $ycl      预处理元素
      */
      public function select($dataname,$table,$where,$other,$ycl){

        $pdo = new PDO("mysql:host=localhost;dbname=fbzr","root","123456");

        $data = explode(",", $dataname);        //将输入的$dataname字符串转换成数组
        $num = count($data);                    //获取数组长度

        //echo "select {$dataname} from {$table} where {$where} {$other}";

        $stmt = $pdo -> prepare("select {$dataname} from {$table} {$where} {$other} ");
        $stmt -> execute($ycl);

        $data = $stmt -> fetch(PDO::FETCH_ASSOC);

        return $data;

      }


      /**
      *数据库中的查1  负责循环输出
      *@param String $database 数据名
      *@param String $table    表名
      *@param String $where    where参数
      *@param String $other    其他的处理元素
      *@param Array  $ycl      预处理元素
      */
      public function select1($dataname,$table,$where,$other){

        $pdo = new PDO("mysql:host=localhost;dbname=fbzr","root","123456");

        $data = explode(",", $dataname);        //将输入的$dataname字符串转换成数组
        $num = count($data);                    //获取数组长度

        //echo "select {$dataname} from {$table} where {$where} {$other}";

        $stmt = $pdo -> prepare("select {$dataname} from {$table} {$where} {$other} ");
        /*$stmt -> execute($ycl);

        $data = $stmt -> fetch(PDO::FETCH_ASSOC);*/

        return $stmt;

      }


      /**
      *数据库中的增
      *@param String $database 数据名
      *@param String $table    表名
      *@param String $other    其他的处理元素
      *@param Array  $ycl      预处理元素
      */
      public function insert($dataname,$table,$other,$ycl){

        $pdo = new PDO("mysql:host=localhost;dbname=fbzr","root","123456");

        $data = explode(",", $dataname);          //将输入的$dataname字符串转换成数组
        $num = count($data);                      //获取数组长度

        $get_wh = '';                           //获取预处理的问号

        for($i = 1;$i <= $num;$i++){
          $get_wh .= '?,';
        }

        $len = strlen($get_wh);

        $get_wh = substr($get_wh, 0,$len-1);

        $stmt = $pdo -> prepare("insert into {$table} ({$dataname}) values ({$get_wh})  {$other};");

        $stmt -> execute($ycl);

        return  $stmt -> rowCount();

      }

      /**
      *数据库中的删
      *@param String $table    表名
      *@param String $where    where参数
      *@param String $other    其他的处理元素
      *@param Array  $ycl      预处理元素
      */
      public function delete($table,$where,$other,$ycl){

        $pdo = new PDO("mysql:host=localhost;dbname=fbzr","root","123456");

        $stmt = $pdo -> prepare("delete from {$table} {$where} {$other} ");

        //echo  "delete from {$table} where {$where} {$other} ";

        $stmt -> execute($ycl);

        return  $stmt -> rowCount();

      }


      /**
      *数据库中的删1
      *@param String $table    表名
      *@param String $where    where参数
      *@param String $other    其他的处理元素
      *@param Array  $ycl      预处理元素
      */
      public function delete1($table,$where,$other){

        $pdo = new PDO("mysql:host=localhost;dbname=fbzr","root","123456");

        $stmt = $pdo -> prepare("delete from {$table} {$where} {$other} ");

        //echo  "delete from {$table} where {$where} {$other} ";

        $stmt -> execute();

        return  $stmt -> rowCount();

      }


      /**
      *数据库中的改
      *@param String $database 数据名
      *@param String $table    表名
      *@param String $where    where数据
      *@param String $other    其他的处理元素
      *@param Array  $ycl      预处理元素
      */
      public function update($dataname,$table,$where,$other,$ycl){

        $pdo = new PDO("mysql:host=localhost;dbname=fbzr","root","123456");

        $data = explode(",", $dataname);          //将输入的$dataname字符串转换成数组
        $num = count($data);                      //获取数组长度

        $get_wh = '';                           //获取预处理的问号

        for($i = 0;$i < $num;$i++){
          $get_wh .= $data[$i].' = ?,';
        }

        $len = strlen($get_wh);

        $get_wh = substr($get_wh, 0,$len-1);

        $stmt = $pdo -> prepare("update {$table} set {$get_wh} {$where} {$other};");

        $stmt -> execute($ycl);

        return  $stmt -> rowCount();

      }

      /**
      *数据库中的改1
      *@param String $database 数据名
      *@param String $table    表名
      *@param String $where    where数据
      *@param String $other    其他的处理元素
      *@param Array  $ycl      预处理元素
      */
      public function update1($dataname,$table,$where,$other,$ycl){

        $pdo = new PDO("mysql:host=localhost;dbname=fbzr","root","123456");

        $stmt = $pdo -> prepare("update {$table} set {$dataname} {$where} {$other};");

        $stmt -> execute($ycl);

        return  $stmt -> rowCount();

      }

      /**
      *数据库中的获取总数
      *@param String $table    表名
      *@param String $where    where数据
      *@param String $other    其他的处理元素
      */
      public function count($table,$where,$other){

        $pdo = new PDO("mysql:host=localhost;dbname=fbzr","root","123456");

        $stmt = $pdo -> prepare("select count(*) as total from {$table} {$where} {$other}");

        $stmt -> execute();

        $data = $stmt -> fetch(PDO::FETCH_ASSOC);

        return $data;
      }

 }