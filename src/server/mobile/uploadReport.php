<?php
  header('Access-Control-Allow-Origin: *');
  include_once("../db/dbconnection.php");

  // HTTP variables received from the client
  $location = $_POST["location"];
  $fullName = $_POST["fullName"];
  $city = $_POST["city"];
  $phoneNumber = $_POST["phoneNumber"];
  $problemTitle = $_POST["problemTitle"];
  $briefExplanation = $_POST["briefExplanation"];
  $otherInformation = $_POST["otherInformation"];
  $pictureData = $_POST["pictureData"];

  // get a unique folder name to store the pictures
  $uniqueId = md5(uniqid($problemTitle, true));
  $uploadPicturesPath = "media/problems/" . $uniqueId;

  // if media folder doesn't exist, then create one
  if (!file_exists("media/")) {
      mkdir("media/", 0777, true);
  }

  // if media/problems folder doesn't exist, then create one
  if (!file_exists("media/problems/")) {
      mkdir("media/problems/", 0777, true);
  }

  // if problem's pictures folder doesn't exist, then create one
  if (!file_exists($uploadPicturesPath)) {
      mkdir($uploadPicturesPath, 0777, true);
  }

  // insert the data into the database
  $dbPicturesPath = "/mobile/media/problems/" . $uniqueId;
  $query = "INSERT INTO problems (problem_title, full_name, city,
    phone_number, picture_data, brief_explanation, other_information, location)
    VALUES('$problemTitle', '$fullName', '$city', '$phoneNumber',
    '$dbPicturesPath', '$briefExplanation', '$otherInformation', '$location')";

  // add the image into the correct directory if the query is a success
  if (mysqli_query($link, $query)) {
      // decode the pictureData JSON to get individual pictures
      $pictureData = json_decode($pictureData);
      $picture1 = $pictureData->picture1;
      $picture2 = $pictureData->picture2;
      $picture3 = $pictureData->picture3;

      // upload the pictures as files
      file_put_contents($uploadPicturesPath . "/image1.jpg", base64_decode($picture1));
      file_put_contents($uploadPicturesPath . "/image2.jpg", base64_decode($picture2));
      file_put_contents($uploadPicturesPath . "/image3.jpg", base64_decode($picture3));
  }
