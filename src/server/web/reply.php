<?php
  header('Access-Control-Allow-Origin: *');
  include_once("../db/dbconnection.php");

  // variables received from the client
  $problemID = $_POST["problemID"];
  $cityName = $_COOKIE["cityName"];
  $reply = $_POST["reply"];

  // insert the reply into the problem_replies table
  $query = "INSERT INTO problem_replies (problem_id, city_name, reply_description) VALUES('$problemID', '$cityName', '$reply')";
  mysqli_query($link, $query);
