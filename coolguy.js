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

    //if the source is an array, we need to access indexes.
    var arrayBoolean = Array.isArray(info)
    var liveBoolean

    //if the genre:"misc" is present, the live stream is available.
    //otherwise, print the name of the file from the pre-recorded stream.

    //if the arrayBoolean is true, for each item in the array, check if "Misc" is a value.
    if (arrayBoolean){
      info.forEach(function(e){
        if (e.genre === "Misc"){
          liveBoolean = true
          alert(liveBoolean)
        }
      });
    }
    else if (arrayBoolean) {
      marquee.textContent = intro.concat(info.title);
      marquee.setAttribute('width', '200px');
      status.appendChild(marquee);
    }
     else{
     marquee.textContent = intro.concat(info[1].title);
     marquee.setAttribute('width', '200px');
     status.appendChild(marquee);
  }
});
}

document.addEventListener('DOMContentLoaded', function (e){
  index();

  // refresh
  setInterval(function() {
    index();
  }, 20 * 1000);
});
