﻿document.addEventListener('deviceready', deviceready, false);

var buttomDom;
var statusDom;
var fileSystem;

function deviceready() {
    console.log('dv ready');

    //step one is to request a file system	
    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0,
		function (fs) {
		    fileSystem = fs;

		    buttonDom = document.querySelector('#startDl');
		    buttonDom.addEventListener('touchend', startDl, false);
		    buttonDom.removeAttribute("disabled");

		    statusDom = document.querySelector('#status');
		}, function (e) {
		    alert('failed to get fs');
		    alert(JSON.stringify(e));
		});
}

function startDl() {
    buttonDom.setAttribute("disabled", "disabled");

    var ft = new FileTransfer();
    var uri = encodeURI("http://media.downloadming.se/Bhaag Milkha Bhaag (2013)/Bhaag Milkha Bhaag (2013)/04 - Maston Ka Jhund - DownloadMing.SE.mp3");

    var downloadPath = fileSystem.root.fullPath + "/download.mp3";

    ft.onprogress = function (progressEvent) {
        if (progressEvent.lengthComputable) {
            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 50);
            statusDom.innerHTML = perc + "% loaded...";
        } else {
            if (statusDom.innerHTML == "") {
                statusDom.innerHTML = "Loading";
            } else {
                statusDom.innerHTML += ".";
            }
        }
    };

    ft.download(uri, downloadPath,
	function (entry) {
	    statusDom.innerHTML = "";
	    var media = new Media(entry.fullPath, null, function (e) { alert(JSON.stringify(e)); });
	    media.play();

	},
	function (error) {
	    alert('Crap something went wrong...');
	});


}
