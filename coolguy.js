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
  loadJSON('http://stream.coolguyradio.com/status-json.xsl', function(response){
    var data    = JSON.parse(response);
    var status  = document.getElementById('coolguy_status')

    status.innerHTML = '';
    var marquee = document.createElement("marquee");
    var intro = "Previous recording:  ";

    var info = data.icestats.source
    var livePresent

    if(info){
      if (Array.isArray(info)){
        info.forEach(function(e){
          if (e.genre === "Misc"){
            status.textContent = "**LIVE** ";
            livePresent = true
            }
          });
        }
        else if (Array.isArray(info) && !(livePresent)){
          info.forEach(function(e){
            if (e.genre === "various"){
              marquee.textContent = intro.concat(e.title);
              marquee.setAttribute('width', '200px');
              status.appendChild(marquee);
            }
          });
        }
        else if(info.genre && info.genre === "Misc"){
          status.textContent = "**LIVE** ";
        }
        else if(info.genre && info.genre === "various"){
          marquee.textContent = intro.concat(info.title);
          marquee.setAttribute('width', '200px');
          status.appendChild(marquee);
        }
      }
      else{
        status.textContent = "Server Error: BIG PROBLEM!"
      }
    }
  );
}

document.addEventListener('DOMContentLoaded', function (e){
  index();

  // refresh
  setInterval(function() {
    index();
  }, 20 * 1000);
});
