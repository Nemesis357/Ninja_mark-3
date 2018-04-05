$(document).ready(function(){
  $('.bar').each(function(i, elem){
    drawBar(elem);
  });
  
  $('.measure').each(function(i, elem){
    drawMeasure(elem);
  });
  
  $('a.redraw').click(function(e){
    e.preventDefault();
    $('.bar').each(function(i, elem){
      randomiseBar(elem);
    });
    $('.measure').each(function(i, elem){
      randomiseMeasure(elem);
    });
  
  });
  
  function drawBar(bar) {
    var percentage = $(bar).data('percentage');
    if(percentage > 100){
      percentage = 100;
    }
    $(bar).animate({'width': percentage + '%'}, 2500);
  }
  
  function drawMeasure(measure) {
    var percentage = $(measure).data('percentage');
    if(percentage > 100){
      percentage = 100;
    }
    $(measure).animate({'width': percentage + '%'}, 5000);
  }
  
});