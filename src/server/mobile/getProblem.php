<?php
  header('Access-Control-Allow-Origin: *');
  include_once("../db/dbconnection.php");

  // check HTTP variables received from the client
  $id = $_POST["id"];

  // data to send to the client
  $jsonData = array();
  $replyData = array();

  // get the replies from the city officials
  $query = "SELECT * FROM problem_replies WHERE problem_id='$id'";
  if($result = mysqli_query($link, $query)) {
    $i = 0;
    while($row = mysqli_fetch_array($result)) {
      // increase the JSON reply data array
      $replyData[$i] = $row["reply_description"];
      $i++;
    }
  }

  // get the problem from a specific city
  $query = "SELECT * FROM problems WHERE id='$id'";
  if($result = mysqli_query($link, $query)) {
    if($row = mysqli_fetch_array($result)) {
      $jsonData = array(
        "problemTitle" => $row["problem_title"],
        "briefExplanation" => $row["brief_explanation"],
        "otherInformation" => $row["other_information"],
        "city" => $row["city"],
        "pictures" => $row["picture_data"],
        "location" => $row["location"],
        "replies" => $replyData
      );
    }
  }

  // encode the jsonData and send it back to the client
  $jsonData = json_encode($jsonData, true);
  echo($jsonData);
?>
