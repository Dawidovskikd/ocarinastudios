function Section(anchor) {
    return{
        anchor : anchor,
        children : anchor.children().children()
    }
}
var animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
    mouseWheel = 'mousewheel DOMMouseScroll',
    sections = [],
    sectionManager = {
        currentSectionID : 0,
        sectionCount: sections.length,
        updateSection : function(option){
            switch (option){
                case 'next':{
                    this.currentSectionID = (++this.currentSectionID) % this.sectionCount;
                    break;
                }
                case 'prev':{

                    this.currentSectionID = (--this.currentSectionID + this.sectionCount) % this.sectionCount;
                    break;
                }
                default:{
                    break;
                }
            }
        },
        nextSection: function(){return (this.currentSectionID + 1) % this.sectionCount;},
        prevSection: function(){return (this.currentSectionID -1 + this.sectionCount) % this.sectionCount}
    },
    animationInProgress = false;

function initSectionArray($anchor) {
    $anchor.each(function (index) {
        sections.push(new Section($(this)));
        sectionManager.sectionCount = sections.length;
    });
}

function initNavigate($anchor) {
    initSectionArray($anchor);
    for( var i = 1 ; i < sections.length ; i++){
        for( var j = 0; j < sections[i].children.length ; j++){
            $(sections[i].children[j]).toggleClass('transparent');
        }
    }
}
function swapContent(fadeOut , fadeIn, scrollingDown){
    var animationOut = (scrollingDown) ? 'fadeOutUp' : 'fadeOutDown',
        animationIn = (scrollingDown) ? 'fadeInUp' : 'fadeInDown';

    for( var i = 0 ; i < fadeOut.children.length ; i++){
        var elementIndex = (scrollingDown) ? i : fadeOut.children.length - 1 - i,
            lastElementScrolled;
        if ( $(fadeOut.children[elementIndex]).css('display') != 'none' ){
            lastElementScrolled = elementIndex;
            (function (i, j) {
                if(!isMobile()){
                    setTimeout(
                        function(){
                            $(fadeOut.children[j]).toggleClass( animationOut );
                        },
                        i * ( (fadeOut.anchor == sections[0].anchor) ? 50 : 150 )
                    );
                } else {
                    $(fadeOut.children[j]).toggleClass( animationOut );
                }

            })(i,elementIndex);
        }
    }
    $(fadeOut.children[(scrollingDown) ? lastElementScrolled : 0]).on(animationEnd , function () {
        fadeOut.anchor.toggleClass('section-active');
        $(fadeOut.children).toggleClass('transparent ' + animationOut);
        fadeIn.anchor.toggleClass('section-active');
        for( var i = 0 ; i < fadeIn.children.length ; i++){
            var elementIndex = (scrollingDown) ? i : fadeIn.children.length - 1 - i;

            if( $(fadeIn.children[elementIndex]).css('display') != 'none') {
                lastElementScrolled = elementIndex;
                    (function (i, j) {
                    if (!isMobile()) {
                        setTimeout(
                            function () {
                                $(fadeIn.children[j]).toggleClass(animationIn);
                            },
                            i * ( (fadeIn.anchor == sections[0].anchor) ? 50 : 150 )
                        );
                    } else {
                        $(fadeIn.children[j]).toggleClass(animationIn);
                    }

                })(i, elementIndex);
            }
        }
        $(this).off(animationEnd);
        $(fadeIn.children[(scrollingDown) ? lastElementScrolled : 0 ]).on(animationEnd , function () {
            $(fadeIn.children).toggleClass('transparent ' + animationIn);
            animationInProgress = false;
            contentSwapProceeding = false;
            $(this).off(animationEnd);
        })
    });
}
function navigateSite( isScrollingDown ) {
    if ( !animationInProgress ){
        animationInProgress = true;
        var fadeOut = sections[sectionManager.currentSectionID],
            fadeInNext = sections[sectionManager.nextSection()],
            fadeInPrev = sections[sectionManager.prevSection()];

        if ( !isScrollingDown && sectionManager.currentSectionID > 0 ){ //scroling up
            swapContent(fadeOut , fadeInPrev, isScrollingDown);
            controlValuesBackgroundOpacity(sectionManager.currentSectionID - 1);
            sectionManager.updateSection('prev');
            updateSideMenu();
        } else if ( isScrollingDown && sectionManager.currentSectionID < sectionManager.sectionCount - 1){// scroling down
            swapContent(fadeOut , fadeInNext, isScrollingDown);
            controlValuesBackgroundOpacity(sectionManager.currentSectionID + 1);
            sectionManager.updateSection('next');
            updateSideMenu();
        } else{
            animationInProgress = false;
        }
    }
}
function navigateTo(index) {
    if ( !animationInProgress ){
        animationInProgress = true;
        var fadeOut = sections[sectionManager.currentSectionID],
            fadeInNext = sections[index],
            isScrollingDown = ( index > sectionManager.currentSectionID );

        swapContent(fadeOut, fadeInNext, isScrollingDown);
        controlValuesBackgroundOpacity( index );
        sectionManager.currentSectionID = index;
        updateSideMenu();
    }
}

function controlValuesBackgroundOpacity(targetSection) {
    var transitionSpeed = 1000,
        $valuesGradient = $('.values-gradient'),
        $valuesScrollButton = $('.values-scroll-button');

    if ( targetSection === 0 || targetSection === sectionManager.sectionCount -1  ){
        $valuesGradient.animate({opacity: 0}, transitionSpeed);
        $valuesScrollButton.animate({opacity: 0}, transitionSpeed);
    } else {
        $valuesGradient.animate({opacity: 1} , transitionSpeed);
        $valuesScrollButton.animate({opacity: 1}, transitionSpeed);
    }
}

function updateSideMenu() {
    var $sideScrollMenuButton = $('.side-scroll-menu__button');
    $sideScrollMenuButton.removeClass('active');
    $($sideScrollMenuButton[sectionManager.currentSectionID]).addClass('active');
}

function isMobile() {
    // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
    return window.innerWidth < 768;
}