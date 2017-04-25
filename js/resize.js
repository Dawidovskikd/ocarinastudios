function canvasResize($canvas){
    $canvas.attr('width', $canvas.parent().width() ); //max width
    $canvas.attr('height', $canvas.parent().height() ); //max height
}


function aboutUsContentResize($anchor) {
    console.log($anchor.parent().height());
    // var height = $anchor.parent().height() -  $anchor.parent().find('h2').height()*2 - $('#who-we-are').height() - $('#our-process').height() - $('.about-us-footer').height();
    var height = $anchor.parent().height() - $('.about-us-headings').height() -  $('.about-us-footer').height();
    console.log(height);
    $anchor.css({
        height: height +'px'
    });
}
