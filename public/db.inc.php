<?php
  include "config.inc.php";

  try {
    $pdo = new PDO(DSN, DBUSER, DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  }catch(PDOException $e) {
    echo "ERROR: ".$e->getMessage();
  }