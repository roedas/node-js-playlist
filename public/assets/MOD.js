$(document).ready(function () {
    'use strict';
	
    // Set up the connection
    var socket, times, timesS, timesQ;
    var ref = window.location.href;
    
	
	socket = io.connect(ref.substr(0, ref.indexOf('todo')));
    
   
    
    socket.on('switchTime', function (data) {
		
		times = data.times;
		$("#switchButton").text(":) "+times);
	});
    
    socket.on('switchToSAD', function (data) {
		timesS = data.timesS;
		$("#switchSadButton").text(":( "+timesS);
	});
	
    socket.on('switchToQ', function (data) {
		timesQ = data.timesQ;
		$("#switchQButton").text("? " + timesQ);
	});
	
	socket.on('RELOAD', function (data) {
		location.reload();
	});
	
    
    $('#switchButton').on('click', function () {
        socket.emit('switchDayNight');
		
    });
    
	$('#switchSadButton').on('click', function () {
        socket.emit('switchSAD');
		
    });
	$('#switchQButton').on('click', function () {
        socket.emit('switchQ');
		
    });
});