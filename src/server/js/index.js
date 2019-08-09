function login() {
  // client variables
  var cityEmail = document.getElementById("cityEmail").value;
  var cityPassword = document.getElementById("cityPassword").value;

  // open the HTTP Request
  var http = new XMLHttpRequest();
  var loginURL = '../web/login.php';
  var params = 'cityEmail=' + cityEmail + '&cityPassword=' + cityPassword;
  http.open('POST', loginURL, true);

  // set-up the HTTP Request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      if (http.responseText == "Email or Password was incorrect, failed to login.") {
        alert(http.responseText);
      } else {
        // parse the JSON data from the HTTP Request
        var response = JSON.parse(http.responseText);

        // set the login details as browser cookies
        setCookie("id", response.id);
        setCookie("cityEmail", response.cityEmail);
        setCookie("cityName", response.cityName);
        setCookie("state", response.state)

        // load the dashboard.html
        window.location = "dashboard.php";
      }
    }
  }

  // send the HTTP Request
  http.send(params);
}

// set a cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
