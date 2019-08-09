<?php
  header('Access-Control-Allow-Origin: *');
  include_once("../db/dbconnection.php");

  // check HTTP variables received from the client
  if ($_POST["city"]) {
      $city = $_POST["city"];
  } else {
      $city = "Arlington";
  }

  $jsonData = array();

  // get the most recent problems from a specific city
  $query = "SELECT * FROM problems WHERE city LIKE '%".$city."%' ORDER BY id DESC";
  if ($result = mysqli_query($link, $query)) {
      $i = 0;
      while ($row = mysqli_fetch_array($result)) {
          // increase the JSON data array
          $jsonData[$i] = array(
        "id" => $row["id"],
        "title" => $row["problem_title"],
        "city" => $row["city"],
        "image" => "http://" . $_SERVER['HTTP_HOST'] . $row["picture_data"] . "/image1.jpg"
      );
          $i++;
      }
  }

  // encode the jsonData and send it back to the client
  $jsonData = json_encode($jsonData, true);
  echo($jsonData);
