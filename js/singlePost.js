$(document).ready(function () {

    var $galleryIcons = $('.gallery-icon'),
        $galleryViewImage = $('.featured-image');

    $galleryIcons.on('click' , function (e) {
        var newImage = new Image();

        newImage.src = e.originalEvent.target.src;
        $galleryViewImage.empty();
        $galleryViewImage.append(newImage);
    });
});