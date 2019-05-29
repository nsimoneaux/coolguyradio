function loadJSON(file, callback) {
  var xobj = new XMLHttpRequest();

  xobj.open('GET', file, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function index() {
  loadJSON('http://stream.coolguyradio.com/status-json.xsl', function(response) {
    var data    = JSON.parse(response);
    var status  = document.getElementById('coolguy_status')

    status.innerHTML = '';

    if ("live" === data.icestats.source[0].server_name) {
     status.textContent = "**LIVE** ";

    } else {
      var marquee = document.createElement("marquee");
      str intro = "Playing previously recorded show ";
	marquee.textContent = intro.append(data.icestats.source[1].title);
      marquee.setAttribute('width', '200px');
      status.appendChild(marquee);
    }
  });
}

document.addEventListener('DOMContentLoaded', function (e) {
  index();

  // refresh
  setInterval(function() {
    index();
  }, 20 * 1000);
});
