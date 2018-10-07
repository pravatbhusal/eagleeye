<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <link rel="stylesheet" href="ee_style.css">
    <link rel="shortcut icon" href="ee_favicon.png">

    <title>EagleEye - Search</title>

    <nav class="navbar navbar-light bg-light" >
      <a class="navbar-brand" href="dashboard.php">
        <img src="ee_logo.png" width="90px" height="60px">
      </a>
        <a class="navbar-brand mb-0 h1"><h2>EagleEye</h2></a>
        <form class="form-inline" action="search.php" method="GET">
          <input class="form-control mr-sm-2" required  type="text" name="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-dark" type="submit" value="query">Search</button>
        </form>
      </nav>
  </head>

  <body>
    <div class="display">
      <?php
        include_once("db/dbconnection.php");

        // grab the most recent problem from the city using the search
        $search = $_GET["search"];
        $cityName = $_COOKIE["cityName"];
        $query = "SELECT * FROM problems WHERE problem_title LIKE '%".$search."%' AND city='$cityName' ORDER BY id DESC";

        // query through the problems column
        if($result = mysqli_query($link, $query)) {
        	while($row = mysqli_fetch_array($result)) {
            $id = $row["id"];
        		$problemTitle = $row["problem_title"];
            $briefExplanation = $row["brief_explanation"];
            $location = json_decode($row["location"]);
            $latitude = $location->latitude;
            $longitude = $location->longitude;

            // problem jumbotron object
            echo '
              <div class="jumbotron">
                <p>Ticket #'.$id.'<p>
                <h1 class="display-4">'.$problemTitle.'</h1>
                <p class="lead">'.$briefExplanation.'</p>
                <hr class="my-4">
                <p>Latitude: '.$latitude.', Longitude: '.$longitude.'</p>
                <a class="btn btn-primary btn-lg" href="response.php/?id='.$id.'" role="button">Respond</a>
              </div>
            ';
        	}
        }
      ?>
  </div>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
</body>
</html>
