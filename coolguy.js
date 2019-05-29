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

    infoString = ''
    infoString = infoString.concat(JSON.stringify(info));

    if(infoString.includes("Misc")){
      status.textContent = "**LIVE** ";
      livePresent = true
    }
    else if(Array.isArray(info) && !(livePresent)){
      info.forEach(function(e){
        if (e.genre === "various"){
          marquee.textContent = intro.concat(e.title);
          marquee.setAttribute('width', '200px');
          status.appendChild(marquee);
        }
      });
    }

    else{
      try{
        marquee.textContent = intro.concat(info.title);
        marquee.setAttribute('width', '200px');
        status.appendChild(marquee);
      }
      catch(e){
        marquee.textContent = "Server Status: Big Problem!";
        marquee.setAttribute('width', '200px');
        status.appendChild(marquee);
      }
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
