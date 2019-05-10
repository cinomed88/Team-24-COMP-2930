$(document).ready(function() {
    var outerDiv = document.createElement('div');
    outerDiv.className += 'schedule1';
    
    var sport = document.createElement('div');
    sport.className += 'sport';
    
    var scheduleData = document.createElement('div');
    scheduleData.className += 'scheduleData';
    
    
    outerDiv.appendChild(sport);
    outerDiv.appendChild(scheduleData);
    
    $('.button').before(outerDiv);
})