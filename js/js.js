$(document).ready(function () {

    var animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
        mouseWheel = 'mousewheel DOMMouseScroll',
        $canvasAnimatedBackground = $('#background-animation'),
        $subpages = $('.subpage'),
        $aboutUsContent = $('.about-us-content'),
        $sideScrollMenuButtons = $('.side-scroll-menu__button'),
        $singleRecord = $('#single-record');

    var backgroundAnimationCanvas = document.getElementById("background-animation");
    var context;
    if (backgroundAnimationCanvas){
        context = backgroundAnimationCanvas.getContext('2d');
    }
    var hexagons = [],
        columns = (isMobile()) ? 10 : 12,
        rows = (isMobile()) ? 5 : 7 ,
        hexagonRadius = (isMobile()) ? 5 : 10;

    for ( var i = 0 ; i < columns ; i++){
        for( var j = 0 ; j < rows; j++){
            hexagons.push(new Hexagon(context, Math.floor(Math.pow(Math.random() , 4)*hexagonRadius+1) , '#D3D3D3', Math.random()  , ( Math.random() + i )* ( window.innerWidth / columns ), ( Math.random() + j ) * ( window.innerHeight / rows ) ) );
        }
    }

    //Initial calls
    if(!isMobile()){
        initNavigate($('.animated-content'));
    }
    showSection($subpages);
    canvasResize($canvasAnimatedBackground);
    // subpagesResize($subpages);
    // aboutUsContentResize($aboutUsContent);
    hexagons.forEach(function (element) {
        element.render();
    });
    if(!isMobile()){
        $('#record-wrap, #who-we-are-content, #our-process-content').mCustomScrollbar();
    }
    hideSection($subpages);

    // Mousewheel handling
    $(window).on(mouseWheel, function (event) {
        if(!isMobile()){
            event.preventDefault();
            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : event.originalEvent.deltaY * (-120),
                isScrollingDown = (delta < 0 );
            if ( delta !== 0){
                scrollSite(isScrollingDown);
            }
        }
    });

    //Sweep handling
    function scrollSite(scrollingDown) {
        navigateSite(scrollingDown);
        if (animationInProgress && !contentSwapProceeding) {
            backgroundAnimation(hexagons, scrollingDown);
        }
    }
    function sweepHandler(event) {
        if( !isMobile() ){
            event.preventDefault();
            var startingPointY = event.originalEvent.changedTouches[0].pageY;
            $(window).off('touchstart').on('touchmove', function (event) {
                event.preventDefault();
                var delta = startingPointY - event.originalEvent.changedTouches[0].pageY;
                $(window).off('touchmove');
                if (delta > 0) {
                    scrollSite(true);
                } else if (delta < 0) {
                    scrollSite(false);
                }
                $(window).on('touchstart', sweepHandler );
            });
        }
    }
    // $('html, body').on('touchmove', function(e){
    //     //prevent native touch activity like scrolling
    //     e.preventDefault();
    // });
    $(window).on('touchstart' , sweepHandler);

    //Resize --------------------------------------------
    $(window).on('resize' , function () {
        canvasResize($canvasAnimatedBackground);
        hexagons.forEach(function (element) {
            element.onResize();
        });
        // subPageResize($subpages);
        // aboutUsContentResize($aboutUsContent);
    });

    //Menu handling -------------------------------------
    // Home - 0
    // About us - 1
    // Track record - 2
    var activePage = 0;
    $('.home-link, .logo').on('click touchstart' , function (event) {
        if( !isMenuCollapsed ) {
            toggleMenu();
        }
        if( activePage === 0){
            $(window).scrollTop(0);
        } else {
            if( activePage === 1){
                hideSection($('#about-us'));
            } else {
                hideSection($('#track-records'));
            }
            activePage = 0;
            if(!isMobile()){
                toggleStartSection();
            } else {
                showSection($('#start-section'));
                $(window).scrollTop(0);
            }
            $(window)
                .on(mouseWheel , function (event) {
                    var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : event.originalEvent.detail * (-120),
                        scrollingDown = (delta < 0 );
                    if ( delta !== 0){
                        navigateSite( scrollingDown);
                        if( animationInProgress && !contentSwapProceeding){
                            backgroundAnimation(hexagons , scrollingDown);
                        }
                    }
                })
                .on('touchstart' , sweepHandler);
            $sideScrollMenuButtons.on('click touchstart' , sideScrollMenuClickHandler );
        }
    });
    $('.about-link').on('click touchstart' , function(event){
        if( !isMenuCollapsed) {
            toggleMenu();
        }
        if( activePage === 1){
            event.preventDefault()
        } else {
            if (activePage === 0){
                if(!isMobile()){
                    toggleStartSection();
                }else {
                    hideSection($('#start-section'));
                }
                $(window).off(mouseWheel + ' touchstart touchmove');
                $sideScrollMenuButtons.off('click touchstart');

            } else {
                hideSection($('#track-records'));
            }
            activePage = 1;
            showSection($('#about-us'));
            $(window).scrollTop(0);
            // aboutUsContentResize($aboutUsContent);
        }
    });
    $('.record-link').on('click touchstart' , function(event){
        if( !isMenuCollapsed) {
            toggleMenu();
        }
        if( activePage === 2){
            event.preventDefault()
        } else {
            if (activePage === 0){
                if(!isMobile()){
                    toggleStartSection();
                } else {
                    hideSection($('#start-section'));
                }
                $(window).off(mouseWheel + ' touchstart touchmove');
                $sideScrollMenuButtons.off('click touchstart');
            } else {
                hideSection($('#about-us'));
            }
            activePage = 2;
            showSection($('#track-records'));
            $(window).scrollTop(0);
            // aboutUsContentResize($aboutUsContent);
        }
    });
    $('.contact-link , #contact-us-button').on('click touchstart' , function () {
        var $contactForm = $('#contact-form');
        if(!isMenuCollapsed){
            toggleMenu();
        }
        showSection($contactForm , activateContactCloseButton );
        $contactForm.scrollTop(0);
        $(window).off(mouseWheel + ' touchstart touchmove');
        $sideScrollMenuButtons.off('click touchstart');
        $contactForm.on(mouseWheel + ' touchmove', function (e) {
            e.stopPropagation();
            console.log(1);
        });
        $(window).on('scroll', function (e) {
            e.preventDefault();
            console.log(2);
        });
    });
    function activateContactCloseButton() {
        $('#contact-form-close-button').on('click touchstart' , function (e) {
            enableScroll();
            hideSection($('#contact-form'));
            $(window)
                .on(mouseWheel , function (event) {
                    var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : event.originalEvent.detail * (-120),
                        scrollingDown = (delta < 0 );
                    if ( delta !== 0){
                        navigateSite( scrollingDown);
                        if( animationInProgress && !contentSwapProceeding){
                            backgroundAnimation(hexagons , scrollingDown);
                        }
                    }
                })
                .on('touchstart' , sweepHandler);
            $sideScrollMenuButtons.on('click touchstart' , sideScrollMenuClickHandler );
            $(this).off('click touchstart');
        });
    }
    $('#menu-burger').on('touchstart' , toggleMenu );

    // Side menu -----------------------------------
    function sideScrollMenuClickHandler(event) {
        var targetIndex = -1,
            target = event.originalEvent.target;
        $sideScrollMenuButtons.each(function (index) {
            if( $sideScrollMenuButtons[index] === target ){
                targetIndex = index;
            }
        });
        if( targetIndex != sectionManager.currentSectionID){
            var isSiteScrollingDown = targetIndex > sectionManager.currentSectionID;
            navigateTo(targetIndex);
            if( animationInProgress && !contentSwapProceeding){
                backgroundAnimation(hexagons , isSiteScrollingDown );
            }
        }
    }
    $sideScrollMenuButtons.on('click touchstart' , sideScrollMenuClickHandler );
    $sideScrollMenuButtons.on(mouseover , function (e) {
        if ( !isMobile() ){
            var $target = $(e.originalEvent.target),
                $label = $(e.originalEvent.target).next();

            $label.animate({width: '200px'} , 500);
            $target.on(mouseleave , function () {
                $label.stop().animate({
                    width: '0'
                }, 500);
                $target.off(mouseleave);
            })
        }
    });


    //About us content swap -----------------------------------
    $('#who-we-are').on('click touchstart' , function(){
        $(this).addClass('active').removeClass('inactive');
        $('#our-precess').addClass('inactive').removeClass('active');
        $('#who-we-are-content').addClass('active');
        $('#our-process-content').removeClass('active');
    });
    $('#our-precess').on('click touchstart' , function(){
        $(this).addClass('active').removeClass('inactive');
        $('#who-we-are').addClass('inactive').removeClass('active');
        $('#who-we-are-content').removeClass('active');
        $('#our-process-content').addClass('active');
    });

    //Ajax single page ------------------------------------
    $('.record-content>a').on('click touchstart' , function () {
        var tmp = {
                id: this.id
            },
            newText,
            request,
            $content = $('#single-record');

        request = $.ajax({
            url: (window.location.protocol + '//' + window.location.host + '/wp-content/themes/ocarinastudios/single.php'),
            type: 'post',
            data: tmp
        });
        request
            .done(function (response, textStatus, jqXHR){
                newText = response;
                $content.html(newText);
                showSection($singleRecord);
                $('#single-record-close-button').on('click' , function () {
                    hideSection($('#single-record'));
                });
            })
            .fail(function (jqXHR, textStatus, errorThrown){
                console.error(
                    "The following error occurred: "+
                    textStatus, errorThrown
                );
            })
    });

    //On site load calls ------------------------------------------

    $(window).on("load", function(){

        if(isMobile()){
            var firstScreen = $('.content__container')
                .children()
                .children()
                .filter('.animated')
                .filter(function (index ,el) {
                    return ( $(el).css('display') != 'none' && !$(el).hasClass('img-circles'));
                }),
                elementsToAnimateInWhileScrolling = [];

            //Mobile site initial animations =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- lel
            firstScreen.css( {'opacity' : '0'});
            $('#loading-screen')
                .on(animationEnd , function () {
                    firstScreen
                        .each(function (idx , el) {
                            setTimeout(function () {
                                $(el)
                                    .removeAttr('style')
                                    .addClass('fadeInUp');
                            } , idx * 100 , function () {
                                $(el).removeClass('fadeInUp')
                            })
                        })

                });

            // register values and resources children to animate in when they are visible
            $('.values, #resources')
                .children()
                .children()
                .each(function (index, el) {
                    $(el).css({opacity : '0'});
                    elementsToAnimateInWhileScrolling.push( {
                        anchor : $(el),
                        windowOffsetToAnimate: ( $(el).offset().top - window.innerHeight +50  )
                    });
                });
            $(window).on('scroll touchmove scrollstart' , function () {
                var windowYOffset = window.scrollY,
                    indexesOfElementsToRemove = [];

                $.each(elementsToAnimateInWhileScrolling , function (index, el) {
                    if( windowYOffset >= el.windowOffsetToAnimate ){
                        el.anchor.removeAttr('style').addClass('fadeInUp');
                        indexesOfElementsToRemove.push(index );
                    }
                });

                var indexToBeRemoved;
                while ( !isNaN(indexesOfElementsToRemove.pop()) ){
                    elementsToAnimateInWhileScrolling.splice( indexToBeRemoved , 1 )
                }
                if(!elementsToAnimateInWhileScrolling[0]){
                    $(window).off('scroll touchmove scrollstart')
                }
            })
        }

        // Back to the top button
        var toTopButtonActive = false;
        function toTopButtonListener() {
            var windowYOffset = window.scrollY,
                breakPointOffset = $('.values').offset().top,
                $button = $('.to-top');

            if ( !toTopButtonActive && ( windowYOffset >= breakPointOffset ) ){
                $button.addClass('active');
                toTopButtonActive = true;
            } else if ( toTopButtonActive && (windowYOffset <= breakPointOffset ) ) {
                $button.removeClass('active');
                toTopButtonActive = false;
            }
        }
        $(window).on('scroll touchmove scrollstart' ,toTopButtonListener );
        $('.to-top').click(function () {
            $(window).scrollTop(0);
            $('.to-top').removeClass('active');
            toTopButtonActive = false;
        });

        //Fading out loading screen ---------------------------------
        setTimeout(function () {
            fadeOutLoading();
            loadingInProgress = false;
        } , 1000);

    });
    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll mousewheel', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        }
});