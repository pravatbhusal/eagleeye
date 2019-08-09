<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
  <link rel="shortcut icon" href="ee_favicon.png">

  <title>EagleEye - Response</title>

</head>

<body>
  <div class="container text text-center">
    <?php
      include_once("db/dbconnection.php");

      // grab the most recent response for this problem
      $cityName = $_COOKIE["cityName"];
      $id = $_GET["id"];
      $query = "SELECT * FROM problems WHERE id='$id'";

      if ($result = mysqli_query($link, $query)) {
          while ($row = mysqli_fetch_array($result)) {
              $problemTitle = $row["problem_title"];
              $briefExplanation = $row["brief_explanation"];
              $otherInformation = $row["other_information"];
              $pictureData = $row["picture_data"];

              // carousel of images
              echo '
      <h1 class="text-center">'.$problemTitle.'</h1>
      <div class="container">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100 max" src="'.$pictureData.'/image1.jpg" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 max" src="'.$pictureData.'/image2.jpg" alt="Second slide">
            </div>
            <div class="carousel-item max">
              <img class="d-block w-100" src="'.$pictureData.'/image3.jpg" alt="Third slide">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" height="400px">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" height="400px">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <h5 align="left">Explanation:</h5>
        <p>'.$briefExplanation.'</p>
        <h5 align="left">Other Comments:</h5>
        <p>'.$otherInformation.'</p>
      </div>
      ';
          }
      }
      ?>
  </div>

  <div class="container">
    <div>
      <div class="form-group">
        <textarea required class="form-control" id="replyText" rows="3" placeholder="Enter your reply here"></textarea>
        <button class="btn btn-primary" onclick="sendReply()">Reply</button>
      </div>
    </div>
  </div>

  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
  <script>
    function sendReply() {
      // client variables
      var replyText = document.getElementById("replyText").value;
      var urlParams = new URLSearchParams(window.location.search);
      var problemID = urlParams.get("id");

      // open the HTTP Request
      var http = new XMLHttpRequest();
      var replyURL = '../web/reply.php';
      var params = 'reply=' + replyText + "&problemID=" + problemID;
      http.open('POST', replyURL, true);

      // set-up the HTTP Request
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
          alert("Reply was successfully sent to the citizens!");
        }
      }

      // send the HTTP Request
      http.send(params);
    }
  </script>
</body>

</html>
