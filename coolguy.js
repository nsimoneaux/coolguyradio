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
  loadJSON('http://stream.coolguyradio.com/status-json.xsl', function(response)) {
    var data    = JSON.parse(response);
    var status  = document.getElementById('coolguy_status')

    status.innerHTML = '';
    var marquee = document.createElement("marquee");
    var intro = "Previous recording:  ";

    var info = data.icestats.source


    if (Array.isArray(info) && "live" === info[0].server_name) {
     status.textContent = "**LIVE** ";
    }
    else if (!Array.isArray(info)) {
      marquee.textContent = intro.concat(info.title);
      marquee.setAttribute('width', '200px');
      status.appendChild(marquee);
    }
     else{
     marquee.textContent = intro.concat(info[1].title);
     marquee.setAttribute('width', '200px');
     status.appendChild(marquee);
  };
}

document.addEventListener('DOMContentLoaded', function (e)) {
  index();

  // refresh
  setInterval(function() {
    index();
  }, 20 * 1000);
});
