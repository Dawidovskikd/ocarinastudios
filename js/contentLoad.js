function fadeInLoading(callback ) {
    $('#loading-screen').css({display: 'block'}).toggleClass('fadeIn transparent').on(animationEnd , function () {
        $('#loading-screen').off(animationEnd).toggleClass('fadeIn');
        if (typeof callback !== 'function') {
            callback = false;
        }
        if (callback) {
            callback();
        }
    });
}

function fadeOutLoading(callback){
    $('#loading-screen').toggleClass('fadeOut').on(animationEnd , function () {
        $('#loading-screen').off(animationEnd).css({display:'none'}).toggleClass('transparent fadeOut');
        if (typeof callback !== 'function') {
            callback = false;
        }
        if (callback) {
            callback();
        }
    });
}

function showSection($anchor , callback){
    $anchor.addClass('section-active');
    $anchor.stop().animate({opacity: 1} , 500 , callback);
}
function hideSection($anchor) {
    $anchor.stop().animate({opacity: 0} , 500 , function () {
        $anchor.removeClass('section-active');
    });
}

var isMenuCollapsed = true;
function toggleMenu() {
    if( isMenuCollapsed){
        $('#menu-collapsed')
            .stop()
            .animate({
                top: '0'
            }, 500);
        isMenuCollapsed = false;
    } else {
        $('#menu-collapsed')
            .stop()
            .animate({
                top: '-100%'
            }, 500 , function () {
                $('#menu-collapsed').removeAttr('style');
                isMenuCollapsed = true;
            });
    }
}
var areIconsHidden = false;
function toggleStartSection() {
    $('.icon, #home-content, .side-scroll-menu').toggleClass('transparent');
    areIconsHidden = !areIconsHidden;
}
