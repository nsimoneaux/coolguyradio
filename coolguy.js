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

    alert(String(data.icestats.source.server_name));

    if (/^Pre-Recorded.*/.test(data.icestats.source.server_name)) {
      var marquee = document.createElement("marquee")

      marquee.textContent = data.icestats.source.title
      marquee.setAttribute('width', '200px');
      status.appendChild(marquee);
    } else {
      status.textContent = "**LIVE** ";
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
