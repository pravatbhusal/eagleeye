<?php
  header('Access-Control-Allow-Origin: *');
  include_once("../db/dbconnection.php");

  $cityEmail = $_POST["cityEmail"];
  $cityPassword = $_POST["cityPassword"];

  // query through the city_officials mysql_list_tables
  $query = "SELECT * FROM city_officials WHERE city_email='$cityEmail' AND city_password='$cityPassword'";

  // check whether query is successful
  if($result = mysqli_query($link, $query)) {
    if(mysqli_num_rows($result)) {
      $row = mysqli_fetch_array($result);
      $id = $row["id"];
      $cityEmail = $row["city_email"];
      $cityName = $row["city_name"];
      $state = $row["state"];

      // set a cookie in the server-side, using the data from the database
      setcookie("cityName", $cityName, 2147483647);

      //exit the data
    	exit('{
        "id": "'.$id.'",
    		"cityEmail": "'.$cityEmail.'",
        "cityName": "'.$cityName.'",
        "state": "'.$state.'"
      }');
    }
  }

  exit('Email or Password was incorrect, failed to login.');
?>
