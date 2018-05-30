function realodCorzine(){

    var steak = 0;

    if ( $('.list-cart>ul>li').length > 1 ){
        $('.list-cart>ul>li').each( function(){

            if ( !$(this).hasClass('empty') ){            
                var price = $(this).find('.price span').html() * 1;
                var counter = $(this).find('.count-num span').html() * 1;

                steak += price * counter;
            }

        });   

    } else {
        steak = 0;

        $(".list-cart ul").getNiceScroll().resize();

        $('.list-cart li.empty').slideDown(300);
        $('.links .button').slideUp(300);
    }

    $('.last-sum .summ-count span').html( steak );

    if ( $('body').hasClass('page-cart') ){
        $('.convert-parter .full-sum span').html( steak );
    }

}

$(document).ready(function(){

    if ( $(".list-cart").length ){

        if ( $(window).width() > 767 ){
            $(".list-cart ul").niceScroll({
                cursorcolor:"#E71938",
                cursorborder:'#E5E5E5',
                cursorwidth:"6px"
            });
        }
    }

    $('.towar-row .pricer .minuso').on('click', function(){
        var curr = $(this).closest('.counter').find('strong').html() * 1;
        if ( curr > 1 ) {
            $(this).closest('.counter').find('strong').html( curr - 1 );
        } else {
            $(this).closest('.counter').find('strong').html( '1' );
        }
    });

    $('.towar-row .pricer .pluso').on('click', function(){

        var curr = $(this).closest('.counter').find('strong').html() * 1;
        $(this).closest('.counter').find('strong').html( curr + 1 );

    });

    $('.towar-row .add-to-corzine').on('click', function(e){
        e.preventDefault();

        var idCart = $(this).closest('.pricer').find('strong').attr('data-id');
        var count = $(this).closest('.pricer').find('strong').html();

        $.ajax({
            url : '/wp-admin/admin-ajax.php',
            data: {
                action : 'addToCart',
                id : idCart,
                count : count
            },
            method:'POST',
            success : function(data){
                        
            }
        });

    })


    $('.cart-visible').on('click', function(e){
        e.preventDefault();
        
        if ( $(this).hasClass('active') ){
            $(this).removeClass('active');
            $('.cart-hidden').removeClass('active');
            $('body').removeClass('transparenter');
        } else {
            $(this).addClass('active');
            $('.cart-hidden').addClass('active');
            $('body').addClass('transparenter');
        }
    });


    $('.close-cart').on('click', function(e){
        e.preventDefault();
        
        if ( $('.cart-visible').hasClass('active') ){
            $('.cart-visible').removeClass('active');
            $('.cart-hidden').removeClass('active');
            $('body').removeClass('transparenter');
        } else {
            $('.cart-visible').addClass('active');
            $('.cart-hidden').addClass('active');
            $('body').addClass('transparenter');
        }

    });

    $('.deleter').on('click', function(e){
        e.preventDefault();

        var idCart = $(this).closest('li').attr('data-id');

        $.ajax({
            url : '/wp-admin/admin-ajax.php',
            data: {
                action : 'removeFromCart',
                id : idCart
            },
            method:'POST',
            success : function(data){ }
        });

        $(this).closest('li').slideUp(300, function(){

            $(this).remove();
            realodCorzine();
            
        });

        
    })

    $('.list-cart .counter .count-minuso').on('click', function(){

        var idCart = $(this).closest('li').attr('data-id');
        var count  = $(this).closest('.counter').find('.count-num span').html() * 1 - 1;

        if ( count > 0 ){

            $(this).closest('.counter').find('.count-num span').html( count ) ;
            
            $.ajax({
                url : '/wp-admin/admin-ajax.php',
                data: {
                    action : 'addToCart',
                    id : idCart,
                    count : count
                },
                method:'POST',
                success : function(data){
                            
                }
            });


        } else {
            $(this).closest('.counter').find('.count-num span').html( 1 );
        }

        realodCorzine();
    });

    $('.list-cart .counter .counter-pluso').on('click', function(){

        var idCart = $(this).closest('li').attr('data-id');
        var count  = $(this).closest('.counter').find('.count-num span').html() * 1 + 1;

        $(this).closest('.counter').find('.count-num span').html( count ) ;
        
        $.ajax({
            url : '/wp-admin/admin-ajax.php',
            data: {
                action : 'addToCart',
                id : idCart,
                count : count
            },
            method:'POST',
            success : function(data){
                        
            }
        });

        realodCorzine();

    });


    $('.catalog-part .item .butt3').on('click', function(e){

        e.preventDefault();
        var idCart = $(this).closest('.item').attr('data-id');

        $.ajax({
            url : '/wp-admin/admin-ajax.php',
            data: {
                action : 'addToCart',
                id : idCart
            },
            method:'POST',
            success : function(data){ }
        });

    });

    /* search */

    // http://easyautocomplete.com/examples
        var options = {
            /* for production
            url: function(phrase) {
                return "/search.json";
            },
        
            getValue: function(element) {
                return element.name;
            },
            

           url: function(phrase) { 
                if (phrase !== "") {
                    return "http://api.duckduckgo.com/?q=" + phrase + "&format=json";    
                } else {
                    //duckduckgo doesn't support empty strings
                    return "http://api.duckduckgo.com/?q=empty&format=json";
                }
            },
        
            getValue: "Text",

            ajaxSettings: {
                dataType: "json",
                method: "POST",
                data: {
                    dataType: "json"
                }
            },
        
            preparePostData: function(data) {
                data.phrase = $("#ajax-post").val();
                return data;
            },        
            requestDelay: 400

            */


           /* for build */

            url: function(phrase) { 
                if (phrase !== "") {
                    return "http://api.duckduckgo.com/?q=" + phrase + "&format=json";    
                } else {
                    //duckduckgo doesn't support empty strings
                    return "http://api.duckduckgo.com/?q=empty&format=json";
                }
            },
        
            getValue: "Text",
        
            ajaxSettings: {
                dataType: "jsonp"
            },
        
            listLocation: "RelatedTopics",
        
            requestDelay: 300,
        
            theme: "round"
        };
            
        $("#ajax-post").easyAutocomplete(options);

      /* search */


      $.scrollify({
        section : ".has-sticky",
        updateHash: false,
        before:function(index, sections) {
            console.log( sections[index]  );
            $('.has-sticky').removeClass('active');
            sections[index].addClass('active');
        },
        afterRender:function( ) {
            $('.has-sticky').removeClass('active');
            $.scrollify.current().addClass('active');
        }
        
      });
});