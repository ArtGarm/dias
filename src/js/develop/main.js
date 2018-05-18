function initMap() {
    var map = new google.maps.Map( document.getElementById('map'), {
      zoom: 14,
      //styles: style,
      center: place
    });

    var marker = new google.maps.Marker({
      position: place,
      map: map,
      icon: pointer
    });

}

function countUp( curr ){

    var num = curr.find('.con').attr('data-count') * 1;
    var count = 30;
    var start = 0;
    var current = 0;

    var increment =  Math.floor( ( num - start ) / count );

    var timer = setInterval(function() {

        current += increment;        

        if (current >= num ) {
            curr.find('.con').html( num  ) ;
            clearInterval(timer);
        } else {
            curr.find('.con').html( current ) ;
        }

    }, 100);

}

$(document).ready(function(){

    if ( $('#fullpage').length ){

        $('#fullpage').fullpage({
            css3: true,
            scrollingSpeed: 700,
            allowPageScroll: true,
            fitToSection: false,
            scrollOverflow: true,
            pageDots: false,
            autoScrolling: true,
            fitToSection: true,
            onLeave: function(index, nextIndex, direction){
                if( direction =='down' ){
                    $('#scrolldown').addClass('todown');
                    setTimeout(function(){
                        $('#scrolldown').removeClass('todown');
                    }, 500);
                }

                if( direction =='up' ){
                    $('#scrolldown').addClass('toup');
                    setTimeout(function(){
                        $('#scrolldown').removeClass('toup');
                    }, 500);
                }
            }
        });

    } else {
      //  jQuery.scrollSpeed(200, 800, 'easeOutCubic');
    }

    /* first on main */
        if ( $('#carousel').length ){
            var frict;
            
            var $carousel = $('#carousel');
            $carousel.flickity({
                wrapAround: false,
                percentPosition: false,
                pageDots: false,
                selectedAttraction: 0.03,
                friction: 0.3,
                on: {
                    ready: function( ) {
                        $('.infopart .convert-item').eq(0).addClass('active').addClass('indexer');
                    }
                }
            });
            
            if ( $(window).width() >= 992 ){

                var flkty = $carousel.data('flickity');
                /* images */
                    var $imgs = $carousel.find('.carousel-cell .imager');
                    var docStyle = document.documentElement.style;
                    var transformProp = typeof docStyle.transform == 'string' ?
                        'transform' : 'WebkitTransform';
                    
                    $carousel.on( 'scroll.flickity', function() {
                        flkty.slides.forEach( function( slide, i ) {
                            var img = $imgs[i];
                            var x = ( slide.target + flkty.x ) * -1/2;
                            img.style[ transformProp ] = 'translateX(' + x  + 'px)';
                        });
                    }); 
                /* images */

                $carousel.on( 'change.flickity', function( event, index ) {
                    
                    $('.infopart .convert-item.active').removeClass('active').removeClass('indexer');
                    $('.infopart .convert-item').eq( index ).addClass('active').addClass('indexer');

                });
            }
            
            
        }
    /* first on main */

    /* scroller */

        $('#scrolldown .to-upper .arrow').on('click', function(e){
            e.preventDefault();
            $.fn.fullpage.moveSectionUp();
        });

        $('#scrolldown .to-bottomer .arrow').on('click', function(e){
            e.preventDefault();
            $.fn.fullpage.moveSectionDown();
        });

    /* scroller */

    /* hidden-menu */

        if ( $('#hidden-menu').length ){

            var counter = 0;
            $('#hidden-menu nav>ul>li').each( function(){
                
                if ( $(this).find('ul').length == 1 ){
                    var clone = $(this).find('ul').html();
                    var style = $(this).find('ul').css('background-image');
                    $(this).find('ul').remove();
                    $(this).append('<div class="plus" data-counter=layer'+ counter +'><span></span></div>');                    
                    $('#hidden-menu').find('nav').append('<div class="layer2" data-visible=layer'+ counter +' style= background-image:'+ style +'><ul>'+ clone + '<ul></div>');                    
                    counter++;
                }
            });

            $('#hidden-menu nav').on('click', function(){
                if ( !$('#hidden-menu nav>ul').is(event.target) && $('#hidden-menu nav>ul').has(event.target).length === 0 && !$('.layer2').is(event.target) && $('.layer2').has(event.target).length === 0 ){
                    $('#hidden-menu').removeClass('activateMenu');
                    $('#hidden-menu').fadeOut(300);
                }
            })

            $('nav>ul>li').on('click', '.plus', function(){
                var blocker = $(this).attr('data-counter');

                if ( $(this).hasClass('active') ){

                    $(this).removeClass('active');                    
                    $('.layer2').removeClass('activate');
                    
                } else {

                    $('nav>ul>li .plus').removeClass('active');
                    $(this).addClass('active');                    
                    $('.layer2.activate').removeClass('activate');

                    $('.layer2').each(function(){
                        if ( $(this).attr('data-visible') == blocker ){
                            $(this).addClass('activate');
                        }
                    });
                }
            });

        }

        $('.butter-wrapper .butter').on('click', function(){

            $('#hidden-menu').fadeIn(300, function(){
                $(this).addClass('activateMenu');
            });

        });

        $('#hidden-menu .closer').on('click', function(){
            $('#hidden-menu').removeClass('activateMenu');
            $('#hidden-menu').fadeOut(300);
            
        });

    /* hidden-menu */

    /* main-fourth-wrap */

        if ( $('.main-fourth-wrap').length ){

            $('.main-fourth-wrap .navigate ul li a').on('click', function(e){
                e.preventDefault();
                if ( !$(this).hasClass('active') ){

                    $('.main-fourth-wrap .navigate ul li a.active').removeClass('active');
                    $(this).addClass('active')
                    var curr = $(this).closest('li').index();
                    $('.main-fourth-wrap .content-part>ul>li.active').removeClass('active');
                    $('.main-fourth-wrap .content-part>ul>li').eq( curr ).addClass('active');

                }
            })

        }

    /* main-fourth-wrap */
    
    /* list-items */

        if ( $('.main-catalog-wrap').length ) {

            $('.main-catalog-wrap .list-items').slick({
                infinite: true,
                dots: false,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1820,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 1420,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1140,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

        }

    /* list-items */

    /* specialist items */

        if ( $('.about-specialist-wrpap').length ) {

            $('.about-specialist-wrpap .list-items').slick({
                infinite: true,
                dots: false,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [
                    {
                      breakpoint: 1440,
                      settings: {
                        slidesToShow: 4
                      }
                    },
                    {
                        breakpoint: 1260,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

        }

    /* specialist items */

    /* map */

        if ( $('#map').length ){
            initMap();
        }

    /* map */

    /* about-slider-infos */
        
        if ( $('.about-slider-infos ').length ){

            var $carousel2 = $('.about-slider-infos .after-slider');
            $carousel2.flickity({
                imagesLoaded: true,
                percentPosition: false,
                selectedAttraction: 0.03,
                friction: 0.4,
                on: {
                    /*
                    ready: function( ) {
                        $('.infopart .convert-item').eq(0).addClass('active').addClass('indexer');
                    }
                    */
                }
            });

            var flkty2 = $carousel2.data('flickity');
            var $imgs = $('.about-slider-infos .after-slider img');

            $carousel2.on( 'scroll.flickity', function( event, progress ) {
                flkty2.slides.forEach( function( slide, i ) {
                    var img = $imgs[i];
                    var x = ( slide.target + flkty2.x ) * -1/3;
                    img.style.transform = 'translateX( ' + x  + 'px)';
                });
            });

        }
    
    /* about-slider-infos */

    /* school-rew-wrap */

        if ( $('.school-rew-wrap').length ){

            $('.school-rew-wrap .conteiner-slider .list-items').slick({
                infinite: true,
                slidesToShow: 1,
                dots: false,
                slidesToScroll: 1
            });
        }

    /* school-rew-wrap */

    /* form-filters */

        if ( $('.form-filters').length ){
            $('.catalog-wrap .menus-part a').on('click', function(e){
                if ( $(this).closest('li').find('ul').length ){

                    e.preventDefault();
                    if( !$(this).find('.pluser').hasClass('active') ){
                        $(this).find('.pluser').addClass('active');
                        $(this).closest('li').find('ul:first').slideDown(300);
                    } else {
                        $(this).find('.pluser').removeClass('active');
                        $(this).closest('li').find('ul:first').slideUp(300);
                    }
                }

                
            })
        }

        // NO UI slider

        if ( $('#roller').length ){

                var sliderPrice = document.getElementById('roller');

                var SminP = $('#price-from' ).attr('data-edge') * 1;
                var SmaxP = $('#price-to' ).attr('data-edge') * 1;

                var CurrentminP = $('#price-from' ).val() * 1;
                var CurrentmaxP = $('#price-to' ).val() * 1;

                noUiSlider.create(sliderPrice, {
                    start: [ CurrentminP , CurrentmaxP ],
                    connect: true,
                    range: {
                        'min': SminP,
                        'max': SmaxP
                    }
                });

                sliderPrice.noUiSlider.on('update', function( values, handle ) {

                    var valueP = values[handle];
                
                    if ( handle ) {
                        $('#price-to' ).val( Math.round(valueP) );
                    } else {
                        $('#price-from').val( Math.round(valueP) );
                    }
                });
                
                $('#price-from').on('change', function(){
                    sliderPrice.noUiSlider.set( [this.valueP, null]);
                });
                
                $('#price-to' ).on('change', function(){
                    sliderPrice.noUiSlider.set([null , this.valueP ]);
                });


        }

    /* form-filters */

    /* cubi */

        if( $('.row-follow').length ){

            $('.row-follow .facebook , .row-follow .instagram ').on('click', function(e){
                e.preventDefault();

                var curr = $(this).attr('href');
                $('.row-follow').addClass('traslater');
                $('.row-follow .list-frame .frame').each(function(){
                    if( $(this).attr('data-frame') == curr ){
                        if ( !$(this).hasClass('active') ){
                            $('.row-follow .list-frame .frame.active').removeClass('active');
                            $(this).addClass('active');
                        } else {
                            $('.row-follow .list-frame .frame.active').removeClass('active');
                            $('.row-follow').removeClass('traslater');
                        }
                    }
                });

            })

        }

    /* cubi */

    /* single */
    
        if ( $('.single-page-wrap').length ){

            $('.single-page-wrap .slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav'
            });
            $('.single-page-wrap .slider-nav').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                variableWidth: true,
                centerMode: true,
                focusOnSelect: true
            });

        }

    /* single */

    /* conteiner-tabs */

        if ( $('.conteiner-tabs').length ){

            $('.conteiner-tabs .navigate a').on('click', function(e){
                e.preventDefault();

                if( !$(this).hasClass('active') ) {
                    var curr = $(this).closest('li').index();

                    $('.conteiner-tabs .navigate a.active').removeClass('active');
                    $(this).addClass('active');

                    $('.conteiner-tabs>.content>ul>li.active').slideUp(300, function(){
                        $(this).removeClass('active');
                    })

                    $('.conteiner-tabs>.content>ul>li').eq(curr).slideDown(300, function(){
                        $(this).addClass('active');
                    })

                }

            });

        }

    /* conteiner-tabs */

    /* search */

        if ( $('.contein-search').length ){

            $('.closer-search').on('click', function(e){
                e.preventDefault();
                $('#hidden-search').fadeOut(300);
            });

            $('.contein-search').on('click', function(){
                $('#hidden-search').fadeIn(300);
            })

        }

    /* search */

    /* hidden-button-filter */

        if( $('.catalog-wrap').length ){

            $('.hidden-button-filter').on('click', function(){

                if ( !$(this).hasClass('active') ){
                    $(this).addClass('active');
                    $('.form-filters').addClass('active');
                    $('body').addClass('transparenter');
                } else {
                    $(this).removeClass('active');
                    $('.form-filters').removeClass('active');
                    $('body').removeClass('transparenter');
                }

            });

        }

    /* hidden-button-filter */

    /* count-up */

        if ( $('.school-fackt-wrap').length ){

            $(window).on('scroll', function(){
                $('.school-fackt-wrap .list-counters .item').each( function(){

                    if( $(this).offset().top - $(window).scrollTop() < 2*$(window).height()/3 ){                        
                        if ( !$(this).hasClass('count') ){
                            countUp( $(this) );
                            $(this).addClass('count');
                        }
                    }

                })

            })

        }

    /* count-up */

    $("select").select2();

});

$(window).on('load', function(){

});

$( window ).scroll(function() {

    /* has-sticky */

        if( $('.has-sticky').length ){

            $('.has-sticky').each(function(){

                if ( $( window ).scrollTop() + $(window).height() >= $(this).offset().top ){
                    var dis = $( window ).scrollTop() -  $(this).offset().top + $(window).height() - ($(this).find('.imagepart .uppered-contein').height() + $('.uppered-contein').css('padding-top').replace("px", "")*2 ) ;

                    $(this).find('.imagepart .uppered-contein').css('top', dis );

                    if ( $( window ).scrollTop() + $(window).height()  >= $(this).offset().top +  $(this).height()  ){

                        var discleimad = $(this).height()  - ($(this).find('.imagepart .uppered-contein').height() + $('.uppered-contein').css('padding-top').replace("px", "")*2 ) ;

                        $(this).find('.imagepart .uppered-contein').css('top', discleimad );
                    }

                } else {
                    $(this).find('.imagepart .uppered-contein').css('top', 0 );
                }

            });

        }

    /* has-sticky */



});

$(window).resize(function(){

});