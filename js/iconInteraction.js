var mouseover = 'mouseover',
    mouseleave = 'mouseleave';

function iconOriginalLocation(positionLeft , positionTop) {
    var that = {};

    that.x = positionLeft;
    that.y = positionTop;

    return that;
}

var iconsOriginalLocationArray = [],
    iconsLocationArray = [];

$(document).ready(function () {
    if (!isMobile()) {
        var $icons = $('div>.icon'),
            $homeContent = $('#home-content'),
            target,
            targetIndex;

        $icons.each(function (index) {
            iconsOriginalLocationArray.push(iconOriginalLocation(this.offsetLeft, this.offsetTop));
            iconsLocationArray.push(iconOriginalLocation(this.offsetLeft, this.offsetTop));

        });
        function stopAnimations() {
            $icons.stop();
            $homeContent.stop();
        }

        function isChild(parent, child) {
            return $.contains(parent, child);
        }

        $icons.on(mouseover, function (event) {
            target = event.originalEvent.target;
            var $self = $(this);

            $self.addClass('shake');
            $self.on(animationEnd, function () {
                $self
                    .removeClass('shake')
                    .off(animationEnd)
                    .children()
                    .first()
                    .addClass('blur');
                $icons.each(function (index) {
                    if (this == target || (isChild(this, target))) {
                        targetIndex = index;
                    }
                });
                $icons.each(function (index) {
                    iconsLocationArray[index].x = this.offsetLeft;
                    iconsLocationArray[index].y = this.offsetTop;
                });
                stopAnimations();
                $homeContent.animate({
                    opacity: '0.4'
                }, 500);
                $icons.each(function (index) {
                    if (targetIndex != index && ( Math.random() > 0.5 )) {
                        $(this).animate({
                            left: ( ( iconsLocationArray[targetIndex].x + iconsOriginalLocationArray[index].x ) / 2 + iconsOriginalLocationArray[index].x ) / 2,
                            top: ( ( iconsLocationArray[targetIndex].y + iconsOriginalLocationArray[index].y ) / 2 + iconsOriginalLocationArray[index].y ) / 2
                        }, 5000, 'linear')
                    }
                })
            })
        });
        $icons.on(mouseleave, function (event) {
            var $self = $(this);
            target = event.originalEvent.target;

            $self
                .off(animationEnd)
                .on(animationEnd, function () {
                    $self.removeClass('shake')
                })
                .children()
                .first()
                .removeClass('blur');
            stopAnimations();
            $homeContent.animate({
                opacity: '1'
            }, 500, function () {
                $homeContent.removeAttr('style');
            });
            $icons.each(function (index) {
                var $icon = $(this);
                $icon.animate({
                    left: iconsOriginalLocationArray[index].x,
                    top: iconsOriginalLocationArray[index].y
                }, 250, 'linear', function () {
                    $icon.removeAttr('style');
                })

            })
        });
        $(window).on('resize', function () {
            $icons.removeAttr('style');
            $icons.each(function (index) {
                iconsOriginalLocationArray[index].x = this.offsetLeft;
                iconsOriginalLocationArray[index].y = this.offsetTop;
            });
        })
    }
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
    }
});