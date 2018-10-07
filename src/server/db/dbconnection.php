<?php
  $host = ""; // host that we're using (can be an ip-address)
  $sqluser = ""; // sql user whenever logging-in
  $sqlpassword = ""; // sql password whenever logging-in
  $dbusername = ""; // the database name

  $link = mysqli_connect($host, $sqluser, $sqlpassword, $dbusername);

  // if we do have an error connecting to the database, then stop the server
  if(mysqli_connect_error()) {
    die("There was an error connecting to the database...");
  }
?>
